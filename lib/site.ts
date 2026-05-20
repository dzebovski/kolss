export const siteConfig = {
  name: "KOLSS Polska",
  title: "Kuchnie i zabudowy na wymiar Warszawa | KOLSS Polska",
  description:
    "Kuchnie i zabudowy na wymiar dla Warszawy i okolic. Salon KOLSS Polska w Legionowie, wycena, produkcja, dostawa i montaż.",
  locale: "pl_PL",
  language: "pl-PL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kolss.eu",
};

export const mainNavigation = [
  { label: "Start", href: "#start" },
  { label: "Oferta", href: "#oferta" },
  { label: "Materiały", href: "#materialy" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "Proces", href: "#proces" },
  { label: "Salon", href: "#salon" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "O nas", href: "/about" },
] as const;

export const headerNavigation = [
  { label: "Kolekcje", href: "/kitchen-collections" },
  { label: "Galeria", href: "/gallery" },
  { label: "Wyprzedaż", href: "/sale" },
  { label: "Salon", href: "/salon-warszawa" },
  { label: "O nas", href: "/about" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
