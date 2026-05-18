import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const appDir = join(rootDir, "app");
const registryPath = join(rootDir, "lib", "seo", "routes.ts");
const ignoredRoutes = new Set(["/design-system"]);

function getRouteFromPageFile(filePath) {
  const relativePath = relative(appDir, dirname(filePath));

  if (!relativePath) {
    return "/";
  }

  const segments = relativePath
    .split(sep)
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("_"))
    .filter((segment) => !segment.startsWith("@"))
    .filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")));

  return segments.length > 0 ? `/${segments.join("/")}` : "/";
}

function collectPageRoutes(dir) {
  const routes = [];

  for (const entry of readdirSync(dir)) {
    const entryPath = join(dir, entry);
    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      routes.push(...collectPageRoutes(entryPath));
      continue;
    }

    if (/^page\.(t|j)sx?$/.test(entry)) {
      routes.push(getRouteFromPageFile(entryPath));
    }
  }

  return routes;
}

function readRegistryRoutes() {
  const source = readFileSync(registryPath, "utf8");
  const registryMatch = source.match(
    /export const seoRoutes[\s\S]*?= \[([\s\S]*?)\];/,
  );

  if (!registryMatch) {
    throw new Error(
      `Could not find seoRoutes array in ${relative(rootDir, registryPath)}.`,
    );
  }

  const registrySource = registryMatch[1];
  const routes = new Set();
  const routePattern = /path:\s*["'`]([^"'`]+)["'`]/g;

  for (const match of registrySource.matchAll(routePattern)) {
    routes.add(match[1]);
  }

  if (routes.size === 0) {
    throw new Error(`No SEO routes found in ${relative(rootDir, registryPath)}.`);
  }

  return routes;
}

const pageRoutes = new Set(collectPageRoutes(appDir));
const registryRoutes = readRegistryRoutes();

const missingRoutes = [...pageRoutes]
  .filter((route) => !ignoredRoutes.has(route))
  .filter((route) => !registryRoutes.has(route))
  .sort();

const staleRoutes = [...registryRoutes]
  .filter((route) => !pageRoutes.has(route))
  .sort();

if (missingRoutes.length > 0 || staleRoutes.length > 0) {
  if (missingRoutes.length > 0) {
    console.error(
      `Missing SEO registry entries for routes: ${missingRoutes.join(", ")}`,
    );
    console.error(
      "Add them to lib/seo/routes.ts or add internal routes to ignoredRoutes in scripts/check-seo-routes.mjs.",
    );
  }

  if (staleRoutes.length > 0) {
    console.error(
      `SEO registry has routes without matching app pages: ${staleRoutes.join(", ")}`,
    );
  }

  process.exit(1);
}

console.log(
  `SEO route check passed for ${registryRoutes.size} registered public routes.`,
);
