export type SeoChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SeoRoute = {
  path: `/${string}`;
  title: string;
  description: string;
  changeFrequency: SeoChangeFrequency;
  priority: number;
  llmsNote: string;
  updatedAt?: string;
};

export const seoRoutes: readonly SeoRoute[] = [
  {
    path: "/",
    title: "Kuchnie i zabudowy na wymiar Warszawa | KOLSS Polska",
    description:
      "Kuchnie i zabudowy na wymiar dla Warszawy i okolic. Salon KOLSS Polska w Legionowie, wycena, produkcja, dostawa i montaż.",
    changeFrequency: "weekly",
    priority: 1,
    llmsNote:
      "Główna strona z ofertą kuchni i zabudów na wymiar, procesem współpracy, FAQ oraz kontaktem.",
  },
  {
    path: "/kitchen-collections",
    title: "Kolekcje kuchni na wymiar",
    description:
      "Poznaj kolekcje kuchni KOLSS: Light, Capri, Lade, Alegranza, Koko, Madeyra, Loft, Grand, Flores, Nota, Merenge, Rondo i MDF.",
    changeFrequency: "weekly",
    priority: 0.8,
    llmsNote:
      "Przegląd kolekcji kuchni KOLSS, stylów frontów i kierunków projektowych.",
  },
  {
    path: "/salon-warszawa",
    title: "KOLSS Salon Warszawa | Oficjalny salon KOLSS Polska",
    description:
      "Odwiedź salon KOLSS Polska dla Warszawy i okolic. Konsultacje, próbki materiałów, ekspozycje kuchni i omówienie projektu na wymiar.",
    changeFrequency: "weekly",
    priority: 0.8,
    llmsNote:
      "Informacje o salonie KOLSS obsługującym Warszawę i okolice, przygotowaniu do wizyty oraz kontakcie.",
  },
  {
    path: "/about",
    title: "O nas",
    description:
      "Poznaj KOLSS Polska: salon w Legionowie, zaplecze produkcyjne, zespół i historię marki KOLSS, która od 1995 roku tworzy meble na wymiar.",
    changeFrequency: "monthly",
    priority: 0.7,
    llmsNote:
      "Informacje o firmie KOLSS Polska, historii marki, produkcji, zespole i sposobie pracy.",
  },
];
