#!/usr/bin/env node
/**
 * Renames images under --root to {prefix}-{n}.jpg per directory.
 *
 * Default layout (_stock): only immediate subfolders of root are processed (no nested walk).
 * --recursive: every nested directory that contains images is processed separately (e.g. assets/images/gallery).
 * If root has image files and there are no subfolders, root is processed (e.g. assets/images/salon).
 * Use --include-root to also process files sitting directly in root when subfolders exist.
 *
 * Folders matching /^\d+-name/ → {name}-sample (hyphens removed). HEIC on macOS: `sips`. Optional TinyPNG after JPEG export.
 *
 * Usage: node scripts/rename-stock.mjs [--apply] [--dry-run] [--root <dir>] [--recursive] [--include-root] ...
 */

import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process/promises";

/** @type {Record<string, string>} folder basename -> filename prefix (no extension) */
const FOLDER_PREFIX_OVERRIDES = {
  _kitchens: "kitchen-sample",
  "1-light": "light-kitchen",
  _bath: "bath-sample",
  _wardrobes: "wardrobes-sample",
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);

/** Folders like `2-capri`, `10-nota` → `capri-sample`, `nota-sample` (digits + hyphen + name). */
function prefixForNumericNamedFolder(folderName) {
  const m = folderName.match(/^(\d+)-(.+)$/);
  if (!m) return null;
  const slug = m[2].toLowerCase().replace(/-/g, "");
  return `${slug}-sample`;
}

function defaultPrefix(folderName) {
  let s = folderName;
  if (s.startsWith("_")) s = s.slice(1);
  s = s.toLowerCase().replace(/-/g, "");
  return `${s}-sample`;
}

function prefixForFolder(folderName) {
  if (Object.prototype.hasOwnProperty.call(FOLDER_PREFIX_OVERRIDES, folderName)) {
    return FOLDER_PREFIX_OVERRIDES[folderName];
  }
  const numeric = prefixForNumericNamedFolder(folderName);
  if (numeric) return numeric;
  return defaultPrefix(folderName);
}

function parseArgs(argv) {
  let apply = false;
  let dryRun = true;
  let root = path.join(process.cwd(), "_stock");
  let jpegQuality = 90;
  let keepPng = false;
  let recursive = false;
  let includeRoot = false;

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--apply") {
      apply = true;
      dryRun = false;
    } else if (a === "--dry-run") {
      dryRun = true;
      apply = false;
    } else if (a === "--root" && argv[i + 1]) {
      root = path.resolve(argv[++i]);
    } else if (a === "--jpeg-quality" && argv[i + 1]) {
      jpegQuality = Math.min(100, Math.max(1, Number(argv[++i])));
      if (Number.isNaN(jpegQuality)) jpegQuality = 90;
    } else if (a === "--keep-png") {
      keepPng = true;
    } else if (a === "--recursive" || a === "-r") {
      recursive = true;
    } else if (a === "--include-root") {
      includeRoot = true;
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/rename-stock.mjs [options]
  --dry-run          Print planned actions only (default)
  --apply            Perform renames and conversions
  --root <path>      Root directory (default: <cwd>/_stock)
  --recursive, -r    Process every nested folder that contains images (gallery-style trees)
  --include-root     Also rename files directly under --root when subfolders exist
  --jpeg-quality <n> JPEG quality 1-100 (default: 90)
  --keep-png         Keep PNG extension instead of converting to JPEG`);
      process.exit(0);
    }
  }

  return { apply, dryRun, root, jpegQuality, keepPng, recursive, includeRoot };
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {string} dir
 * @returns {Promise<boolean>}
 */
async function directoryHasProcessableImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.some(
    (e) =>
      e.isFile() &&
      !e.name.startsWith(".") &&
      IMAGE_EXT.has(path.extname(e.name).toLowerCase()),
  );
}

/**
 * Depth-first list of every directory under rootDir that contains at least one processable image.
 * @param {string} rootDir
 * @returns {Promise<string[]>}
 */
async function listDirsWithImagesRecursive(rootDir) {
  /** @type {string[]} */
  const out = [];

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let hasImage = false;
    /** @type {string[]} */
    const childDirs = [];
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      const full = path.join(dir, e.name);
      if (e.isFile()) {
        if (IMAGE_EXT.has(path.extname(e.name).toLowerCase())) hasImage = true;
      } else if (e.isDirectory()) {
        childDirs.push(full);
      }
    }
    if (hasImage) out.push(dir);
    for (const c of childDirs.sort((a, b) => path.basename(a).localeCompare(path.basename(b)))) {
      await walk(c);
    }
  }

  await walk(rootDir);
  return out;
}

/**
 * @param {string} dir absolute path
 * @param {{ apply: boolean, dryRun: boolean, jpegQuality: number, keepPng: boolean, root: string }} opts
 */
async function processDirectory(dir, opts) {
  const folderName = path.basename(dir);
  if (folderName.startsWith(".")) return;

  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && !e.name.startsWith("."))
    .map((e) => e.name)
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  if (files.length === 0) return;

  const prefix = prefixForFolder(folderName);
  const { apply, dryRun, jpegQuality, keepPng, root } = opts;
  const logKey = path.relative(root, dir) || ".";

  /** @type {{ from: string, tmpPath: string, to: string, action: string }[]} */
  const plan = [];

  const tmpTag = `.___stock_rename_tmp___`;
  const phase1 = files.map((name, i) => {
    const from = path.join(dir, name);
    const ext = path.extname(name).toLowerCase();
    const tmpBase = `${tmpTag}${String(i).padStart(5, "0")}${ext}`;
    const tmpPath = path.join(dir, tmpBase);
    return { from, tmpPath, ext, index: i };
  });

  phase1.forEach(({ from, tmpPath }, i) => {
    const n = i + 1;
    const ext = path.extname(from).toLowerCase();
    let finalName;
    let action;
    if (keepPng && ext === ".png") {
      finalName = `${prefix}-${n}.png`;
      action = "rename_png";
    } else if (ext === ".jpg" || ext === ".jpeg") {
      finalName = `${prefix}-${n}.jpg`;
      action = "rename_jpeg";
    } else if (ext === ".png" || ext === ".webp") {
      finalName = `${prefix}-${n}.jpg`;
      action = ext === ".webp" ? "webp_to_jpg" : "png_to_jpg";
    } else if (ext === ".heic") {
      finalName = `${prefix}-${n}.jpg`;
      action = "heic_to_jpg";
    } else {
      return;
    }
    const to = path.join(dir, finalName);
    plan.push({ from, tmpPath, to, action });
  });

  for (const step of plan) {
    if (dryRun) {
      console.log(
        `[dry-run] ${logKey}: ${path.basename(step.from)} -> ${path.basename(step.to)} (${step.action})`,
      );
      continue;
    }

    await fs.rename(step.from, step.tmpPath);
  }

  if (dryRun) return;

  const needsSharp = plan.some(
    (s) =>
      s.action === "png_to_jpg" ||
      s.action === "webp_to_jpg" ||
      (s.action === "heic_to_jpg" && process.platform !== "darwin"),
  );

  /** @type {typeof import("sharp").default | null} */
  let sharp = null;
  if (needsSharp) {
    try {
      sharp = (await import("sharp")).default;
    } catch {
      throw new Error("Missing dependency: run `npm install` (sharp is required for PNG/WebP/HEIC).");
    }
  }

  for (const step of plan) {
    if (step.action === "rename_jpeg") {
      await fs.rename(step.tmpPath, step.to);
    } else if (step.action === "rename_png") {
      await fs.rename(step.tmpPath, step.to);
    } else if (step.action === "png_to_jpg" || step.action === "webp_to_jpg") {
      if (!sharp) {
        throw new Error("internal: sharp required for PNG/WebP conversion");
      }
      await sharp(step.tmpPath).jpeg({ quality: jpegQuality, mozjpeg: true }).toFile(step.to);
      await fs.unlink(step.tmpPath);
    } else if (step.action === "heic_to_jpg") {
      if (process.platform === "darwin") {
        await execFile("sips", ["-s", "format", "jpeg", step.tmpPath, "--out", step.to]);
      } else {
        if (!sharp) {
          throw new Error("internal: sharp required for HEIC conversion on non-macOS");
        }
        await sharp(step.tmpPath)
          .rotate()
          .jpeg({ quality: jpegQuality, mozjpeg: true })
          .toFile(step.to);
      }
      await fs.unlink(step.tmpPath);
    }
  }
}

async function main() {
  const opts = parseArgs(process.argv);
  const { root, dryRun, apply, recursive, includeRoot } = opts;

  console.log(`Mode: ${dryRun ? "dry-run" : "apply"}`);
  console.log(`Root: ${root}`);
  console.log(`Recursive: ${recursive}`);

  if (!(await pathExists(root))) {
    console.error(`Folder not found: ${root}`);
    process.exit(1);
  }

  /** @type {string[]} */
  let dirsToProcess = [];

  if (recursive) {
    dirsToProcess = await listDirsWithImagesRecursive(root);
    dirsToProcess.sort((a, b) => a.localeCompare(b));
  } else {
    const entries = await fs.readdir(root, { withFileTypes: true });
    const subdirs = entries
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => path.join(root, e.name))
      .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

    const rootHasImages = await directoryHasProcessableImages(root);

    if (includeRoot && rootHasImages) {
      dirsToProcess.push(root);
    }
    for (const sub of subdirs) {
      dirsToProcess.push(sub);
    }
    if (!includeRoot && rootHasImages && subdirs.length === 0) {
      dirsToProcess.unshift(root);
    }
  }

  if (dirsToProcess.length === 0) {
    console.log("No directories with images to process.");
    return;
  }

  for (const dir of dirsToProcess) {
    await processDirectory(dir, opts);
  }

  if (dryRun && !apply) {
    console.log("\nRe-run with --apply to perform these changes.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
