/**
 * Local ad scrapbook — run from repo root: npm --prefix _ads start
 * Or: cd _ads && npm i && npm start → http://127.0.0.1:3847
 */
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3847;
const DATA_DIR = path.join(__dirname, "data");
const IMAGES_DIR = path.join(DATA_DIR, "images");
const MANIFEST_PATH = path.join(DATA_DIR, "manifest.json");

async function ensureDataDirs() {
  await fs.mkdir(IMAGES_DIR, { recursive: true });
  try {
    await fs.access(MANIFEST_PATH);
  } catch {
    await fs.writeFile(MANIFEST_PATH, "[]\n", "utf8");
  }
}

async function readManifest() {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeManifest(ads) {
  const tmp = `${MANIFEST_PATH}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(tmp, `${JSON.stringify(ads, null, 2)}\n`, "utf8");
  await fs.rename(tmp, MANIFEST_PATH);
}

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, IMAGES_DIR);
  },
  filename(req, file, cb) {
    req._imgIndex = (req._imgIndex || 0) + 1;
    const ext = path.extname(file.originalname).toLowerCase();
    const safe =
      ext && ext.length <= 8 && /^\.[a-z0-9.]+$/i.test(ext) ? ext : ".png";
    cb(null, `${req.adId}-${req._imgIndex}${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024, files: 30 },
});

const app = express();
app.use(express.json({ limit: "1mb" }));

app.use("/files", express.static(DATA_DIR, { fallthrough: false }));

app.get("/api/ads", async (_req, res) => {
  try {
    const ads = await readManifest();
    res.json(ads);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "read_failed" });
  }
});

app.post("/api/ads", (req, res, next) => {
  req.adId = crypto.randomUUID();
  req._imgIndex = 0;
  next();
}, upload.array("images", 30), async (req, res) => {
  try {
    const text = typeof req.body?.text === "string" ? req.body.text : "";
    const files = req.files ?? [];
    const images = files.map((f) =>
      path.posix.join("images", path.basename(f.filename)),
    );
    const entry = {
      id: req.adId,
      createdAt: new Date().toISOString(),
      text,
      images,
      picked: false,
    };
    const ads = await readManifest();
    ads.unshift(entry);
    await writeManifest(ads);
    res.status(201).json(entry);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "save_failed" });
  }
});

app.patch("/api/ads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const picked = req.body?.picked;
    if (typeof picked !== "boolean") {
      res.status(400).json({ error: "picked_boolean_required" });
      return;
    }
    const ads = await readManifest();
    const idx = ads.findIndex((a) => a.id === id);
    if (idx === -1) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    ads[idx] = { ...ads[idx], picked };
    await writeManifest(ads);
    res.json(ads[idx]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "update_failed" });
  }
});

app.delete("/api/ads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ads = await readManifest();
    const idx = ads.findIndex((a) => a.id === id);
    if (idx === -1) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    const [removed] = ads.splice(idx, 1);
    for (const rel of removed.images ?? []) {
      const parts = String(rel).split("/").filter(Boolean);
      if (parts[0] !== "images" || parts.length !== 2) continue;
      const root = path.resolve(IMAGES_DIR) + path.sep;
      const abs = path.resolve(IMAGES_DIR, path.basename(parts[1]));
      if (!abs.startsWith(root)) continue;
      try {
        await fs.unlink(abs);
      } catch {
        /* ignore missing */
      }
    }
    await writeManifest(ads);
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "delete_failed" });
  }
});

app.use(express.static(path.join(__dirname, "public")));

await ensureDataDirs();
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Ads local UI: http://127.0.0.1:${PORT}`);
});
