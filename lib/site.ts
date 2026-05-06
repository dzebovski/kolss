export const siteConfig = {
  name: "Kolss Polska",
  description: "Oficjalna strona Kolss Polska.",
  locale: "pl_PL",
  language: "pl-PL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kolss.pl",
};

export const mainNavigation = [
  { label: "Start", href: "#start" },
  { label: "Oferta", href: "#oferta" },
  { label: "O firmie", href: "#o-firmie" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "Wiedza", href: "#wiedza" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
