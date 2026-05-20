import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBuildingStore,
  IconLayoutGrid,
  IconPhoto,
} from "@tabler/icons-react";

import { GalleryBrowser } from "@/app/gallery/_components/gallery-browser";
import { getGalleryItems } from "@/app/gallery/gallery-data";
import {
  galleryCategoryLabels,
  type GalleryCategory,
} from "@/app/gallery/gallery-types";
import { ContactSection } from "@/app/_components/home/ContactSection";
import { SiteFooter } from "@/app/_components/home/SiteFooter";
import { SiteHeader } from "@/app/_components/site-header";
import { headerNavigation } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeria realizacji",
  description:
    "Zobacz galerię realizacji KOLSS: kuchnie, szafy i garderoby, łazienki oraz miejsca pracy wykonane na wymiar.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Galeria realizacji | KOLSS Polska",
    description:
      "Zdjęcia realizacji KOLSS w jednym miejscu: kuchnie, zabudowy, szafy, garderoby, łazienki i miejsca pracy.",
    url: "/gallery",
    type: "website",
  },
};

const categoryOrder: GalleryCategory[] = [
  "kitchens",
  "wardrobes",
  "bathrooms",
  "workplaces",
];

const categoryDescriptions: Record<GalleryCategory, string> = {
  kitchens: "kuchnie z wyspą, zabudową wysoką i detalami materiałowymi",
  wardrobes: "szafy, garderoby i zabudowy do przechowywania",
  bathrooms: "meble łazienkowe dopasowane do układu pomieszczenia",
  workplaces: "biurka, regały i domowe strefy pracy w zabudowie",
};

export default function GalleryPage() {
  const galleryItems = getGalleryItems();
  const heroImage =
    galleryItems.find((item) => item.category === "kitchens")?.image ??
    galleryItems[0]?.image;
  const categoryCounts = categoryOrder.map((category) => ({
    category,
    label: galleryCategoryLabels[category],
    count: galleryItems.filter((item) => item.category === category).length,
    description: categoryDescriptions[category],
  }));
  const heroStats = [
    { value: galleryItems.length.toString(), label: "zdjęć realizacji" },
    { value: categoryOrder.length.toString(), label: "typy zabudowy" },
    { value: "1", label: "miejsce do porównania inspiracji" },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm font-semibold focus:text-background"
      >
        Przejdź do treści
      </Link>

      <SiteHeader
        navigation={headerNavigation}
        quoteHref="#kontakt"
        salonHref="/salon-warszawa#kontakt"
      />

      <main id="main-content">
        <section
          id="start"
          aria-labelledby="gallery-hero-title"
          className="dark-section relative isolate overflow-hidden border-b border-kolss-warm-white/14 bg-kolss-charcoal"
        >
          {heroImage ? (
            <Image
              src={heroImage}
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover object-[58%_center]"
            />
          ) : null}
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,36,33,0.92)_0%,rgba(30,36,33,0.7)_34%,rgba(30,36,33,0.28)_68%,rgba(30,36,33,0.1)_100%),linear-gradient(180deg,rgba(30,36,33,0.34)_0%,rgba(30,36,33,0.08)_42%,rgba(30,36,33,0.48)_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid min-h-[680px] w-full max-w-[1440px] gap-8 px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-[0.64fr_0.36fr] lg:items-end lg:px-20 lg:pt-32">
            <div className="max-w-[780px] self-center lg:self-end">
              <p className="mb-5 text-[13px] font-semibold uppercase leading-[1.3] text-kolss-warm-white/78 sm:text-sm">
                Galeria KOLSS
              </p>
              <h1
                id="gallery-hero-title"
                className="hero-title text-[38px] font-semibold leading-[1.02] text-kolss-warm-white min-[420px]:text-[44px] sm:text-[58px] lg:text-[74px]"
              >
                Galeria realizacji KOLSS
              </h1>
              <p className="mt-6 max-w-[660px] text-[15px] leading-[1.65] text-kolss-warm-white/80 sm:text-base">
                Kompaktowy przegląd wykonanych wnętrz: kuchnie, szafy,
                garderoby, łazienki i miejsca pracy. Zdjęcia pomagają szybko
                porównać proporcje, materiały, kolory i sposób prowadzenia
                zabudowy.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#galeria" className="hero-cta hero-cta-primary">
                  Przejdź do galerii
                  <IconArrowRight aria-hidden="true" size={18} stroke={1.8} />
                </Link>
                <Link href="#kontakt" className="hero-cta hero-cta-secondary">
                  Omów podobny projekt
                </Link>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-3 border-t border-kolss-warm-white/20 pt-5 lg:mb-3 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="border-r border-kolss-warm-white/14 pr-3 last:border-r-0 lg:border-b lg:border-r-0 lg:pb-5 lg:pr-0 lg:last:border-b-0"
                >
                  <dt className="text-[11px] font-semibold uppercase leading-[1.35] text-kolss-warm-white/56">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-[30px] font-semibold leading-none text-kolss-lime sm:text-[38px]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          aria-label="Zakres galerii"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-4 px-5 py-8 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
            {categoryCounts.map((item) => (
              <article
                key={item.category}
                className="grid gap-3 border-b border-border pb-4 last:border-b-0 md:border-b-0 md:border-r md:pb-0 md:pr-4 md:last:border-r-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold uppercase leading-none text-foreground">
                    {item.label}
                  </h2>
                  <span className="rounded-lg bg-kolss-lime px-2.5 py-1.5 text-xs font-semibold leading-none text-kolss-charcoal">
                    {item.count}
                  </span>
                </div>
                <p className="text-sm leading-[1.5] text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="galeria"
          aria-labelledby="gallery-browser-title"
          className="border-b border-border bg-background"
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
              <div>
                <p className="section-kicker">Realizacje</p>
                <h2 id="gallery-browser-title" className="section-title">
                  Zdjęcia pogrupowane tak, żeby szybko znaleźć właściwy typ
                  zabudowy
                </h2>
              </div>
              <div className="grid gap-4 lg:pt-12">
                <p className="text-[15px] leading-[1.65] text-muted sm:text-base">
                  Galeria działa jak robocza tablica inspiracji: można zostać w
                  jednej kategorii, przejść przez wszystkie zdjęcia albo
                  otworzyć pojedynczy kadr w większym podglądzie.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="kolss-panel flex items-center gap-3 p-4">
                    <span className="kolss-icon-tile shrink-0">
                      <IconLayoutGrid
                        aria-hidden="true"
                        size={22}
                        stroke={1.7}
                      />
                    </span>
                    <p className="text-sm font-semibold leading-[1.35] text-foreground">
                      Zwarta siatka do szybkiego porównania form i proporcji.
                    </p>
                  </div>
                  <div className="kolss-panel flex items-center gap-3 p-4">
                    <span className="kolss-icon-tile shrink-0">
                      <IconPhoto aria-hidden="true" size={22} stroke={1.7} />
                    </span>
                    <p className="text-sm font-semibold leading-[1.35] text-foreground">
                      Lightbox pokazuje pełny kadr bez zmiany strony.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <GalleryBrowser items={galleryItems} />
          </div>
        </section>

        <section
          aria-labelledby="gallery-next-step-title"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.42fr_0.58fr] lg:px-10 lg:py-20">
            <div>
              <p className="section-kicker">Po inspiracji</p>
              <h2 id="gallery-next-step-title" className="section-title">
                Zdjęcie jest punktem wyjścia. Projekt powstaje pod konkretne
                wnętrze.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="kolss-card p-5">
                <span className="kolss-icon-tile">
                  <IconBuildingStore
                    aria-hidden="true"
                    size={22}
                    stroke={1.7}
                  />
                </span>
                <h3 className="mt-5 text-[20px] font-semibold leading-tight text-foreground">
                  Porównanie w salonie
                </h3>
                <p className="mt-3 text-sm leading-[1.6] text-muted">
                  Wybrane zdjęcia można przełożyć na fronty, blaty, okucia,
                  próbki materiałów i realny układ pomieszczenia.
                </p>
              </article>
              <article className="kolss-card p-5">
                <span className="kolss-icon-tile">
                  <IconLayoutGrid aria-hidden="true" size={22} stroke={1.7} />
                </span>
                <h3 className="mt-5 text-[20px] font-semibold leading-tight text-foreground">
                  Kierunek projektu
                </h3>
                <p className="mt-3 text-sm leading-[1.6] text-muted">
                  Na rozmowie zawężamy styl, przechowywanie, ergonomię i budżet,
                  żeby inspiracja stała się wykonalnym projektem.
                </p>
              </article>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
