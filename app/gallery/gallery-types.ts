export type GalleryCategory =
  | "kitchens"
  | "wardrobes"
  | "bathrooms"
  | "workplaces";

export type GalleryVariant = "standard" | "wide" | "tall" | "feature";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  projectLabel: string;
  image: string;
  alt: string;
  variant: GalleryVariant;
};

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  kitchens: "Kuchnie",
  wardrobes: "Szafy i garderoby",
  bathrooms: "Łazienki",
  workplaces: "Miejsca pracy",
};
