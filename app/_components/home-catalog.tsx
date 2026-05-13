import Link from "next/link";
import {
  KitchenCarousel,
  type KitchenCarouselCollection,
} from "@/app/_components/kitchen-carousel";
import floresDetailsOne from "@/assets/images/kitchens/flores/flores-details-1.jpg";
import floresDetailsTwo from "@/assets/images/kitchens/flores/flores-details-2.jpg";
import floresMain from "@/assets/images/kitchens/flores/flores-main.desktop.jpg";
import lightDetailsOne from "@/assets/images/kitchens/light/light-details-1.jpg";
import lightDetailsTwo from "@/assets/images/kitchens/light/light-details-2.jpg";
import lightMain from "@/assets/images/kitchens/light/light-main.desktop.jpg";
import notaDetailsOne from "@/assets/images/kitchens/nota/nota-details-1.jpg";
import notaDetailsTwo from "@/assets/images/kitchens/nota/nota-details-2.jpg";
import notaMain from "@/assets/images/kitchens/nota/nota-main.desktop.jpg";

const kitchenCollections: KitchenCarouselCollection[] = [
  {
    title: "Light",
    subtitle:
      "Jasna baza do nowoczesnych mieszkań i spokojnych, funkcjonalnych wnętrz.",
    bestFor:
      "mieszkania, apartamenty, projekty z kontrolowanym budżetem, jasne wnętrza",
    image: lightMain,
    alt: "Jasna kuchnia z białymi frontami, drewnianym akcentem i prostą linią zabudowy",
    details: [
      {
        image: lightDetailsOne,
        alt: "Zbliżenie na biały front kuchenny z czarnym uchwytem",
        caption:
          "Gładkie fronty i prosta geometria pomagają utrzymać lekki, uporządkowany charakter kuchni.",
      },
      {
        image: lightDetailsTwo,
        alt: "Zbliżenie na drewniany blat i zielone płytki nad kuchenką",
        caption:
          "Blat, uchwyty i panel roboczy można dobrać tak, aby kuchnia była bardziej minimalistyczna albo cieplejsza wizualnie.",
      },
    ],
  },
  {
    title: "Flores",
    subtitle:
      "Ciepły fornir, ciemniejszy blat i zabudowa, która łączy kuchnię ze strefą dzienną.",
    bestFor:
      "ciepły minimalizm, kuchnia + salon, projekty z wyspą, wnętrza premium bez nadmiaru dekoracji",
    image: floresMain,
    alt: "Nowoczesna kuchnia z ciepłymi drewnianymi frontami, ciemnym blatem i wyspą",
    details: [
      {
        image: floresDetailsOne,
        alt: "Zbliżenie na fornirowane drewniane fronty kuchenne",
        caption:
          "Fornir lub drewniany rysunek frontów ociepla wnętrze i dobrze łączy się z matowymi, spokojnymi powierzchniami.",
      },
      {
        image: floresDetailsTwo,
        alt: "Zbliżenie na jasny blat kuchenny i płytę grzewczą",
        caption:
          "Ciemny blat i panel roboczy budują mocniejszy kontrast oraz bardziej architektoniczny charakter kuchni.",
      },
    ],
  },
  {
    title: "Nota",
    subtitle:
      "Klasyczna inspiracja w bardziej eleganckim, dopracowanym wydaniu.",
    bestFor:
      "klasyczne apartamenty, domy, eleganckie wnętrza, kuchnie z mocniejszą osobowością",
    image: notaMain,
    alt: "Elegancka kuchnia z ciemnymi frontami, jasnym blatem i dekoracyjnymi uchwytami",
    details: [
      {
        image: notaDetailsOne,
        alt: "Zbliżenie na granatowe fronty kuchenne ze złotymi uchwytami",
        caption:
          "Frezowane lub bardziej dekoracyjne fronty nadają kuchni ponadczasowy charakter bez rezygnacji z funkcjonalnego układu.",
      },
      {
        image: notaDetailsTwo,
        alt: "Zbliżenie na blat, kuchenkę i granatową zabudowę kuchenną",
        caption:
          "Uchwyty, blat i proporcje zabudowy powinny być dobrane razem, aby klasyka nie stała się przypadkowa.",
      },
    ],
  },
];

export function HomeCatalog() {
  return (
    <section
      id="katalog-kuchni"
      aria-labelledby="home-catalog-title"
      className="border-b border-border bg-kolss-surface"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="max-w-[820px]">
          <h2 id="home-catalog-title" className="section-title max-w-[780px]">
            Kuchnie ze szlachetnych materiałów
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.6] text-muted sm:text-base">
            Poniżej pokazujemy kierunki estetyczne, które mogą stać się punktem
            wyjścia do indywidualnej kuchni. Każdy projekt dopasowujemy do
            wymiarów, układu wnętrza i wybranej konfiguracji materiałów.
          </p>
          <Link
            href="/kitchen-collections"
            className="kolss-button kolss-button-secondary mt-7 w-full sm:w-fit"
          >
            Zobacz wszystkie kolekcje
          </Link>
        </div>

        <KitchenCarousel collections={kitchenCollections} />
      </div>
    </section>
  );
}
