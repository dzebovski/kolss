#!/usr/bin/env node
/**
 * Renames images under _stock/<subfolder>/ to {prefix}-{n}.jpg.
 * Folders matching /^\d+-name/ (e.g. 3-lade, 10-nota) → {name}-sample (hyphens in name removed, lowercased).
 * Default: dry-run. Use --apply to write. Optional TinyPNG-style tools can compress outputs afterward.
 *
 * Usage: node scripts/rename-stock.mjs [--apply] [--dry-run] [--root <dir>] [--jpeg-quality <1-100>] [--keep-png]
 */

import fs from "node:fs/promises";
import path from "node:path";

/** @type {Record<string, string>} folder basename -> filename prefix (no extension) */
const FOLDER_PREFIX_OVERRIDES = {
  _kitchens: "kitchen-sample",
  "1-light": "light-kitchen",
  _bath: "bath-sample",
  _wardrobes: "wardrobes-sample",
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

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
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/rename-stock.mjs [options]
  --dry-run          Print planned actions only (default)
  --apply            Perform renames and conversions
  --root <path>      Stock root (default: <cwd>/_stock)
  --jpeg-quality <n> JPEG quality 1-100 (default: 90)
  --keep-png         Keep PNG extension/name instead of converting to JPEG`);
      process.exit(0);
    }
  }

  return { apply, dryRun, root, jpegQuality, keepPng };
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
 * @param {string} subDir absolute path to _stock/<folder>/
 * @param {{ apply: boolean, dryRun: boolean, jpegQuality: number, keepPng: boolean }} opts
 */
async function processSubfolder(subDir, opts) {
  const folderName = path.basename(subDir);
  if (folderName.startsWith(".")) return;

  const entries = await fs.readdir(subDir, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && !e.name.startsWith("."))
    .map((e) => e.name)
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  if (files.length === 0) return;

  const prefix = prefixForFolder(folderName);
  const { apply, dryRun, jpegQuality, keepPng } = opts;

  /** @type {{ from: string, tmpPath: string, to: string, action: string }[]} */
  const plan = [];

  const tmpTag = `.___stock_rename_tmp___`;
  const phase1 = files.map((name, i) => {
    const from = path.join(subDir, name);
    const ext = path.extname(name).toLowerCase();
    const tmpBase = `${tmpTag}${String(i).padStart(5, "0")}${ext}`;
    const tmpPath = path.join(subDir, tmpBase);
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
    } else {
      return;
    }
    const to = path.join(subDir, finalName);
    plan.push({ from, tmpPath, to, action });
  });

  for (const step of plan) {
    if (dryRun) {
      console.log(`[dry-run] ${folderName}: ${path.basename(step.from)} -> ${path.basename(step.to)} (${step.action})`);
      continue;
    }

    await fs.rename(step.from, step.tmpPath);
  }

  if (dryRun) return;

  const needsSharp = plan.some(
    (s) => s.action === "png_to_jpg" || s.action === "webp_to_jpg",
  );

  /** @type {typeof import("sharp").default | null} */
  let sharp = null;
  if (needsSharp) {
    try {
      sharp = (await import("sharp")).default;
    } catch {
      throw new Error("Missing dependency: run `npm install` (sharp is required for PNG/WebP).");
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
    }
  }
}

async function main() {
  const opts = parseArgs(process.argv);
  const { root, dryRun, apply } = opts;

  console.log(`Mode: ${dryRun ? "dry-run" : "apply"}`);
  console.log(`Root: ${root}`);

  if (!(await pathExists(root))) {
    console.error(`Stock folder not found: ${root}`);
    process.exit(1);
  }

  const entries = await fs.readdir(root, { withFileTypes: true });
  const subdirs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => path.join(root, e.name));

  if (subdirs.length === 0) {
    console.log("No subfolders under stock root.");
    return;
  }

  for (const sub of subdirs.sort((a, b) => path.basename(a).localeCompare(path.basename(b)))) {
    await processSubfolder(sub, opts);
  }

  if (dryRun && !apply) {
    console.log("\nRe-run with --apply to perform these changes.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
