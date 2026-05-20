import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

import type {
  GalleryCategory,
  GalleryItem,
  GalleryVariant,
} from "@/app/gallery/gallery-types";

const galleryRoot = join(process.cwd(), "public", "gallery");
const categoryOrder: GalleryCategory[] = [
  "kitchens",
  "wardrobes",
  "bathrooms",
  "workplaces",
];
const categoryRank = new Map<GalleryCategory, number>(
  categoryOrder.map((category, index) => [category, index]),
);
const collator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

type JpegSize = {
  width: number;
  height: number;
};

function collectJpgFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectJpgFiles(entryPath));
      continue;
    }

    if (entry.isFile() && /\.jpe?g$/i.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

function readJpegSize(filePath: string): JpegSize | null {
  const buffer = readFileSync(filePath);

  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;

    if (marker === 0xda || marker === 0xd9) {
      break;
    }

    if (marker >= 0xd0 && marker <= 0xd7) {
      continue;
    }

    if (offset + 2 > buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset);

    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      break;
    }

    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isStartOfFrame && segmentLength >= 7) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += segmentLength;
  }

  return null;
}

function getCategory(pathSegments: string[]): GalleryCategory | null {
  const category = pathSegments[0];

  if (
    category === "kitchens" ||
    category === "wardrobes" ||
    category === "bathrooms" ||
    category === "workplaces"
  ) {
    return category;
  }

  return null;
}

function getProjectLabel(category: GalleryCategory, pathSegments: string[]) {
  const projectFolder = pathSegments[1] ?? "";
  const projectNumber = projectFolder.match(/(\d+)/)?.[1];

  if (category === "kitchens") {
    return projectNumber ? `Kuchnia ${projectNumber}` : "Kuchnia";
  }

  if (category === "wardrobes") {
    if (projectFolder === "storage") {
      return "Przechowywanie";
    }

    return projectNumber ? `Szafa ${projectNumber}` : "Szafa";
  }

  if (category === "bathrooms") {
    return "Łazienka";
  }

  return "Miejsce pracy";
}

function getSubject(category: GalleryCategory) {
  if (category === "kitchens") {
    return "Realizacja kuchni na wymiar";
  }

  if (category === "wardrobes") {
    return "Realizacja szafy i garderoby";
  }

  if (category === "bathrooms") {
    return "Realizacja mebli łazienkowych";
  }

  return "Realizacja miejsca pracy i zabudowy biurowej";
}

function getShotNumber(fileName: string, fallback: number) {
  const shot = fileName.match(/sample-(\d+)/)?.[1];
  return shot ? Number(shot) : fallback;
}

function getVariant(
  size: JpegSize | null,
  indexInProject: number,
): GalleryVariant {
  if (indexInProject === 0) {
    return "feature";
  }

  if (!size) {
    return "standard";
  }

  const ratio = size.width / size.height;

  if (ratio >= 1.25) {
    return "wide";
  }

  if (ratio <= 0.82) {
    return "tall";
  }

  return "standard";
}

function createId(relativePath: string) {
  return relativePath
    .replace(/\.jpe?g$/i, "")
    .replaceAll(sep, "-")
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function toPublicPath(relativePath: string) {
  return `/gallery/${relativePath.split(sep).join("/")}`;
}

export function getGalleryItems(): GalleryItem[] {
  const files = collectJpgFiles(galleryRoot);

  const groupedFiles = files.reduce<Map<string, string[]>>(
    (groups, filePath) => {
      const pathSegments = relative(galleryRoot, filePath).split(sep);
      const category = getCategory(pathSegments);

      if (!category) {
        return groups;
      }

      const projectKey = `${category}/${pathSegments[1] ?? "main"}`;
      const projectFiles = groups.get(projectKey) ?? [];
      projectFiles.push(filePath);
      groups.set(projectKey, projectFiles);

      return groups;
    },
    new Map(),
  );

  for (const projectFiles of groupedFiles.values()) {
    projectFiles.sort((first, second) =>
      collator.compare(
        relative(galleryRoot, first),
        relative(galleryRoot, second),
      ),
    );
  }

  return files
    .sort((first, second) => {
      const firstSegments = relative(galleryRoot, first).split(sep);
      const secondSegments = relative(galleryRoot, second).split(sep);
      const firstCategory = getCategory(firstSegments);
      const secondCategory = getCategory(secondSegments);
      const firstRank = firstCategory
        ? (categoryRank.get(firstCategory) ?? 99)
        : 99;
      const secondRank = secondCategory
        ? (categoryRank.get(secondCategory) ?? 99)
        : 99;

      if (firstRank !== secondRank) {
        return firstRank - secondRank;
      }

      return collator.compare(
        relative(galleryRoot, first),
        relative(galleryRoot, second),
      );
    })
    .flatMap((filePath): GalleryItem[] => {
      const relativePath = relative(galleryRoot, filePath);
      const pathSegments = relativePath.split(sep);
      const category = getCategory(pathSegments);

      if (!category) {
        return [];
      }

      const fileName = pathSegments[pathSegments.length - 1];
      const projectLabel = getProjectLabel(category, pathSegments);
      const projectKey = `${category}/${pathSegments[1] ?? "main"}`;
      const projectFiles = groupedFiles.get(projectKey) ?? [];
      const indexInProject = Math.max(projectFiles.indexOf(filePath), 0);
      const shot = getShotNumber(fileName, indexInProject + 1);
      const subject = getSubject(category);

      return [
        {
          id: createId(relativePath),
          category,
          projectLabel,
          image: toPublicPath(relativePath),
          alt: `${subject} KOLSS, ${projectLabel}, ujęcie ${shot}.`,
          variant: getVariant(readJpegSize(filePath), indexInProject),
        },
      ];
    });
}
