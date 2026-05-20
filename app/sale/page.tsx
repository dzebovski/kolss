import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBuildingStore,
  IconCheck,
  IconPhone,
  IconRulerMeasure2,
  IconToolsKitchen2,
} from "@tabler/icons-react";

import { ContactSection } from "@/app/_components/home/ContactSection";
import { SiteFooter } from "@/app/_components/home/SiteFooter";
import { SiteHeader } from "@/app/_components/site-header";
import { SaleProductGallery } from "@/app/sale/_components/sale-product-gallery";
import { contact } from "@/app/_content/home";
import { headerNavigation } from "@/lib/site";
import capriOne from "@/assets/images/sale/kithcnes/capri/capri-1.jpg.webp";
import capriTwo from "@/assets/images/sale/kithcnes/capri/capri-2.jpg.webp";
import capriThree from "@/assets/images/sale/kithcnes/capri/capri-3.jpg.jpg";
import fijiOne from "@/assets/images/sale/kithcnes/fiji/fiji-1.jpg.jpg";
import fijiTwo from "@/assets/images/sale/kithcnes/fiji/fiji-2.jpg.jpg";
import grandOne from "@/assets/images/sale/kithcnes/grand/grand-1.jpg.webp";
import grandTwo from "@/assets/images/sale/kithcnes/grand/grand-2.jpg.jpg";
import grandThree from "@/assets/images/sale/kithcnes/grand/grand-3.jpg.webp";
import grandFour from "@/assets/images/sale/kithcnes/grand/grand-4.jpg.webp";
import grandFive from "@/assets/images/sale/kithcnes/grand/grand-5.jpg.jpg";
import kraftOne from "@/assets/images/sale/kithcnes/kraft/kraft-1.jpg.webp";
import kraftTwo from "@/assets/images/sale/kithcnes/kraft/kraft-2.jpg.webp";
import kraftThree from "@/assets/images/sale/kithcnes/kraft/kraft-3.jpg.webp";
import kraftFour from "@/assets/images/sale/kithcnes/kraft/kraft-4.jpg.webp";
import merengeOne from "@/assets/images/sale/kithcnes/merenge/merenge-1.jpg.jpg";
import notaOne from "@/assets/images/sale/kithcnes/nota/nota-1.jpg.webp";
import notaTwo from "@/assets/images/sale/kithcnes/nota/nota-2.jpg.webp";
import notaThree from "@/assets/images/sale/kithcnes/nota/nota-3.jpg.webp";
import notaFour from "@/assets/images/sale/kithcnes/nota/nota-4.jpg.webp";
import veronaOne from "@/assets/images/sale/garderoba/garderoba-verona/verona-1.jpg.webp";
import veronaTwo from "@/assets/images/sale/garderoba/garderoba-verona/verona-2.webp";
import veronaTwoDoorOne from "@/assets/images/sale/garderoba/szafa-verona-2/verona-2-1.png.webp";
import veronaTwoDoorTwo from "@/assets/images/sale/garderoba/szafa-verona-2/verona-2-2.jpg.webp";
import veronaTwoDoorThree from "@/assets/images/sale/garderoba/szafa-verona-2/verona-2-3.webp";
import veronaThreeDoorOne from "@/assets/images/sale/garderoba/szafa-verona-3/verona-3-1.webp";
import veronaThreeDoorTwo from "@/assets/images/sale/garderoba/szafa-verona-3/verona-3-2.jpg.webp";
import veronaThreeDoorThree from "@/assets/images/sale/garderoba/szafa-verona-3/verona-3-3.webp";

export const metadata: Metadata = {
  title: "Wyprzedaż kuchni i zabudów ekspozycyjnych",
  description:
    "Gotowe kuchnie, garderoby i szafy ekspozycyjne KOLSS z rabatem do 60%. Sprawdź aktualne ceny wyprzedażowe i umów konsultację.",
  alternates: {
    canonical: "/sale",
  },
  openGraph: {
    title: "Wyprzedaż kuchni i zabudów ekspozycyjnych | KOLSS Polska",
    description:
      "Kuchnie, garderoby i szafy z ekspozycji KOLSS w cenach wyprzedażowych. Oferta dostępna po konsultacji w salonie.",
    url: "/sale",
    type: "website",
  },
};

type SaleProduct = {
  id: string;
  title: string;
  category: "kitchen" | "wardrobe";
  categoryLabel: string;
  discountLabel: string;
  newPrice?: string;
  oldPrice?: string;
  priceNote?: string;
  images: readonly StaticImageData[];
  alt: string;
  intro: string;
  details?: readonly string[];
  feature?: "wide";
};

const kitchenProducts: SaleProduct[] = [
  {
    id: "capri",
    title: "Kuchnia Capri",
    category: "kitchen",
    categoryLabel: "Kuchnia ekspozycyjna",
    discountLabel: "SALE",
    priceNote: "Cena do potwierdzenia w salonie",
    images: [capriOne, capriTwo, capriThree],
    alt: "Kuchnia Capri z jasnymi frontami i drewnianymi detalami",
    intro:
      "Ekspozycyjny zestaw z olchowymi frontami, dębowym fornirem i dodatkowymi elementami jadalnianymi.",
    details: [
      "Korpus kuchni: płyta wiórowa 18 mm",
      "Fasada kuchni: lite drewno olchowe",
      "Otwarte szafki, półki i fartuch: fornir dębowy",
      "Przezroczyste szkło z fazą",
      "Okucia Blum",
      "Rozmiar kuchni: 4180 x 2620 x 600 mm",
      "Szafka Barnu z olchową fasadą w kolorze 9003",
      "Blat szafki z akrylu kamiennego, rozmiar 1960 x 1000 x 930 mm",
      "Stół jadalniany z blatem z litego dębu i szkłem 10 mm",
    ],
    feature: "wide",
  },
  {
    id: "nota",
    title: "Kuchnia Nota",
    category: "kitchen",
    categoryLabel: "Kuchnia ekspozycyjna",
    discountLabel: "-56%",
    newPrice: "74 600 zł",
    oldPrice: "169 800 zł",
    images: [notaOne, notaTwo, notaThree, notaFour],
    alt: "Kuchnia Nota z eleganckimi frontami i kamiennym blatem",
    intro:
      "Gotowy zestaw ekspozycyjny z jesionowymi frontami, kwarcowym blatem i okuciami Blum.",
    details: [
      "Szerokość: 405 x 322 cm",
      "Wysokość: 248 cm",
      "Korpus: płyta wiórowa 18 mm",
      "Fronty: drewniany jesionowy malowany matowy",
      "Akcesoria: Blum",
      "Blat: kwarc",
    ],
  },
  {
    id: "kraft",
    title: "Kuchnia Kraft",
    category: "kitchen",
    categoryLabel: "Kuchnia ekspozycyjna",
    discountLabel: "-56%",
    newPrice: "46 800 zł",
    oldPrice: "106 000 zł",
    images: [kraftOne, kraftTwo, kraftThree, kraftFour],
    alt: "Kuchnia Kraft z antracytowymi frontami i fornirem czereśniowym",
    intro:
      "Nowoczesny zestaw w antracycie z fornirem czereśniowym, kwarcowym blatem i systemami Blum.",
    details: [
      "Szerokość: 410 cm",
      "Wysokość: 280 cm",
      "Głębokość: 60 cm",
      "Korpus: płyta wiórowa 18 mm EGGER Antracyt",
      "Fronty: lakierowane matowe Antracyt + fornir Czereśnia",
      "Akcesoria: Blum",
      "Blat: kwarc",
    ],
  },
  {
    id: "grand",
    title: "Kuchnia Grand",
    category: "kitchen",
    categoryLabel: "Kuchnia ekspozycyjna",
    discountLabel: "-56%",
    newPrice: "48 500 zł",
    oldPrice: "110 300 zł",
    images: [grandOne, grandTwo, grandThree, grandFour, grandFive],
    alt: "Kuchnia Grand z drewnianymi frontami i jasnym blatem",
    intro:
      "Klasyczny zestaw ekspozycyjny z drewnianymi jesionowymi frontami i konglomeratowym blatem.",
    details: [
      "Szerokość: 322 x 240 cm",
      "Wysokość: 270 cm",
      "Korpus: płyta wiórowa 18 mm",
      "Fronty: drewniany jesionowy malowany matowy",
      "Akcesoria: Blum",
      "Blat: konglomerat 38 mm",
    ],
    feature: "wide",
  },
  {
    id: "fiji",
    title: "Kuchnia Fiji",
    category: "kitchen",
    categoryLabel: "Kuchnia ekspozycyjna",
    discountLabel: "-31%",
    newPrice: "21 800 zł",
    oldPrice: "31 600 zł",
    images: [fijiOne, fijiTwo],
    alt: "Kuchnia Fiji z fornirowanymi frontami dębowymi",
    intro:
      "Zestaw ekspozycyjny z dębowym fornirem, laminowanym blatem i sprawdzonymi akcesoriami Blum.",
    details: [
      "Szerokość: 430 cm",
      "Wysokość: 221 cm",
      "Korpus: płyta wiórowa 18 mm",
      "Fronty: fornir dębowy lakierowany matowy",
      "Akcesoria: Blum",
      "Blat: laminowany 38 mm",
    ],
  },
  {
    id: "merenge",
    title: "Kuchnia Merenge",
    category: "kitchen",
    categoryLabel: "Kuchnia ekspozycyjna",
    discountLabel: "-56%",
    newPrice: "37 200 zł",
    oldPrice: "84 500 zł",
    images: [merengeOne],
    alt: "Kuchnia Merenge w klasycznym stylu z drewnianymi frontami",
    intro:
      "Klasyczny zestaw KOLSS z olchowymi frontami, konglomeratowym blatem i akcesoriami Blum.",
    details: [
      "Szerokość: 290 x 210 cm",
      "Wysokość: 252 cm",
      "Korpus: płyta wiórowa 18 mm + masyw olchowy",
      "Fronty: drewniany olchowy lakierowany",
      "Akcesoria: Blum",
      "Blat: konglomerat 38 mm",
    ],
  },
];

const wardrobeProducts: SaleProduct[] = [
  {
    id: "garderoba-verona",
    title: "Garderoba VERONA z wyspą",
    category: "wardrobe",
    categoryLabel: "Garderoba ekspozycyjna",
    discountLabel: "SALE",
    newPrice: "21 850 zł",
    oldPrice: "34 960 zł",
    images: [veronaOne, veronaTwo],
    alt: "Garderoba VERONA z wyspą",
    intro:
      "Gotowa garderoba ekspozycyjna z wyspą, dostępna w cenie wyprzedażowej.",
  },
  {
    id: "szafa-verona-2",
    title: "Szafa WERONA 2-drzwiowa",
    category: "wardrobe",
    categoryLabel: "Szafa ekspozycyjna",
    discountLabel: "SALE",
    newPrice: "11 800 zł",
    oldPrice: "18 880 zł",
    images: [veronaTwoDoorOne, veronaTwoDoorTwo, veronaTwoDoorThree],
    alt: "Szafa WERONA 2-drzwiowa",
    intro:
      "Dwudrzwiowa szafa ekspozycyjna WERONA w cenie wyprzedażowej.",
  },
  {
    id: "szafa-verona-3",
    title: "Szafa WERONA 3-drzwiowa",
    category: "wardrobe",
    categoryLabel: "Szafa ekspozycyjna",
    discountLabel: "SALE",
    newPrice: "11 972 zł",
    oldPrice: "19 155,20 zł",
    images: [veronaThreeDoorOne, veronaThreeDoorTwo, veronaThreeDoorThree],
    alt: "Szafa WERONA 3-drzwiowa",
    intro:
      "Trzydrzwiowa szafa ekspozycyjna WERONA w cenie wyprzedażowej.",
  },
];

const saleHighlights = [
  {
    label: "Rabat",
    value: "do 60%",
    text: "Na gotowe kuchnie z ekspozycji salonowej.",
  },
  {
    label: "Oferta",
    value: "9",
    text: "Kuchnie, garderoby i szafy z lokalnych zdjęć.",
  },
  {
    label: "Status",
    value: "od ręki",
    text: "Dostępność potwierdzamy podczas konsultacji.",
  },
] as const;

const saleNavigation = [
  { label: "Kuchnie", href: "#kuchnie" },
  { label: "Szafy i garderoby", href: "#garderoby" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

function PriceBlock({ product }: { product: SaleProduct }) {
  if (!product.newPrice) {
    return (
      <div className="rounded-lg border border-border bg-kolss-surface-alt p-4">
        <p className="text-[11px] font-semibold uppercase leading-none text-kolss-text-muted">
          Cena
        </p>
        <p className="mt-2 text-[22px] font-semibold leading-[1.05] text-foreground">
          {product.priceNote}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 rounded-lg border border-border bg-kolss-surface-alt p-4 sm:grid-cols-2">
      <div>
        <p className="text-[11px] font-semibold uppercase leading-none text-kolss-text-muted">
          Cena wyprzedażowa
        </p>
        <p className="mt-2 text-[28px] font-semibold leading-none text-foreground">
          {product.newPrice}
        </p>
      </div>
      {product.oldPrice ? (
        <div className="sm:text-right">
          <p className="text-[11px] font-semibold uppercase leading-none text-kolss-text-muted">
            Cena przed rabatem
          </p>
          <p className="mt-2 text-lg font-semibold leading-none text-muted line-through decoration-kolss-muted-green/70 decoration-2">
            {product.oldPrice}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function SaleProductCard({ product }: { product: SaleProduct }) {
  const isWide = product.feature === "wide";

  return (
    <article
      id={`sale-${product.category}-${product.id}`}
      className={`kolss-card group scroll-mt-28 overflow-hidden ${
        isWide ? "lg:col-span-2" : ""
      }`}
    >
      <div className={isWide ? "grid gap-0 lg:grid-cols-[0.54fr_0.46fr]" : ""}>
        <SaleProductGallery
          alt={product.alt}
          discountLabel={product.discountLabel}
          feature={product.feature}
          images={product.images}
          productId={product.id}
          title={product.title}
        />

        <div className="flex h-full flex-col p-5 sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase leading-none text-kolss-muted-green">
              {product.categoryLabel}
            </p>
            <h3 className="mt-3 text-[30px] font-semibold leading-[1.02] text-foreground">
              {product.title}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.6] text-muted">
              {product.intro}
            </p>
          </div>

          <div className="mt-5">
            <PriceBlock product={product} />
          </div>

          {product.details && product.details.length > 0 ? (
            <ul className="mt-5 grid gap-2">
              {product.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-2 text-[14px] leading-[1.45] text-muted"
                >
                  <IconCheck
                    aria-hidden="true"
                    size={17}
                    stroke={1.9}
                    className="mt-0.5 shrink-0 text-kolss-muted-green"
                  />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto pt-6">
            <Link
              href="#kontakt"
              className="kolss-text-link"
              aria-label={`Zapytaj o ${product.title}`}
            >
              Zapytaj o dostępność
              <IconArrowRight aria-hidden="true" size={17} stroke={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProductSection({
  id,
  kicker,
  title,
  text,
  products,
}: {
  id: string;
  kicker: string;
  title: string;
  text: string;
  products: readonly SaleProduct[];
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2 id={`${id}-title`} className="section-title">
              {title}
            </h2>
          </div>
          <div className="lg:pt-12">
            <p className="text-[15px] leading-[1.65] text-muted sm:text-base">
              {text}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {products.map((product) => (
            <SaleProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SalePage() {
  return (
    <div className="min-h-screen bg-background">
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-background"
      >
        Przejdź do treści
      </Link>

      <SiteHeader
        navigation={headerNavigation}
        quoteHref="#kontakt"
        salonHref="#kontakt"
      />

      <main id="main-content">
        <section
          id="start"
          aria-labelledby="sale-hero-title"
          className="dark-section relative isolate overflow-hidden border-b border-kolss-warm-white/14 bg-kolss-charcoal"
        >
          <Image
            src={grandFour}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[58%_center]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,36,33,0.92)_0%,rgba(30,36,33,0.72)_38%,rgba(30,36,33,0.28)_76%,rgba(30,36,33,0.12)_100%),linear-gradient(180deg,rgba(30,36,33,0.38)_0%,rgba(30,36,33,0.06)_42%,rgba(30,36,33,0.46)_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid min-h-[700px] w-full max-w-[1440px] gap-8 px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-[0.64fr_0.36fr] lg:items-end lg:px-20 lg:pt-32">
            <div className="max-w-[780px] self-center lg:self-end">
              <p className="mb-5 text-[13px] font-semibold uppercase leading-[1.3] text-kolss-warm-white/78 sm:text-sm">
                Wyprzedaż ekspozycyjna KOLSS
              </p>
              <h1
                id="sale-hero-title"
                className="hero-title text-[38px] font-semibold leading-[1.02] text-kolss-warm-white min-[420px]:text-[44px] sm:text-[58px] lg:text-[74px]"
              >
                Gotowe kuchnie i zabudowy z rabatem do 60%
              </h1>
              <p className="mt-6 max-w-[690px] text-[15px] leading-[1.65] text-kolss-warm-white/80 sm:text-base">
                Kuchnie, szafy i garderoby wyprodukowane na potrzeby salonów i
                wystaw są dostępne w cenach wyprzedażowych. Każdy zestaw
                omawiamy indywidualnie, razem z wymiarami, transportem i
                możliwym zakresem dopasowania.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#kuchnie" className="hero-cta hero-cta-primary">
                  Zobacz oferty
                  <IconArrowRight aria-hidden="true" size={18} stroke={1.8} />
                </Link>
                <a href={contact.phoneHref} className="hero-cta hero-cta-secondary">
                  {contact.phone}
                  <IconPhone aria-hidden="true" size={18} stroke={1.8} />
                </a>
              </div>
            </div>

            <dl className="grid gap-3 rounded-lg border border-kolss-warm-white/16 bg-kolss-charcoal/40 p-4 text-kolss-warm-white shadow-[0_24px_60px_rgba(15,18,17,0.26)] backdrop-blur-md sm:grid-cols-3 lg:mb-3 lg:grid-cols-1">
              {saleHighlights.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-kolss-warm-white/14 pb-4 last:border-b-0 last:pb-0 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4 sm:last:border-r-0 sm:last:pr-0 lg:border-b lg:border-r-0 lg:pb-4 lg:pr-0"
                >
                  <dt className="text-[11px] font-semibold uppercase leading-none text-kolss-warm-white/56">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-semibold leading-none text-kolss-lime">
                    {item.value}
                  </dd>
                  <p className="mt-2 text-[13px] leading-[1.45] text-kolss-warm-white/68">
                    {item.text}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          aria-label="Nawigacja po stronie wyprzedaży"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto flex w-full max-w-[1440px] gap-2 overflow-x-auto px-5 py-4 sm:px-8 lg:px-10">
            {saleNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-lg border border-border bg-kolss-surface px-3 py-2 text-xs font-semibold uppercase leading-none text-foreground transition hover:border-kolss-charcoal hover:bg-kolss-lime/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kolss-lime"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="sale-context-title"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-5 px-5 py-10 sm:px-8 lg:grid-cols-3 lg:px-10">
            {[
              {
                title: "Ekspozycje salonowe",
                text: "Zestawy były przygotowane na potrzeby salonów i wystaw.",
                icon: IconBuildingStore,
              },
              {
                title: "Znane wymiary",
                text: "Przy każdej kuchni podajemy dostępne wymiary i materiały.",
                icon: IconRulerMeasure2,
              },
              {
                title: "Konsultacja techniczna",
                text: "Przed zakupem potwierdzamy logistykę, montaż i dopasowanie.",
                icon: IconToolsKitchen2,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="kolss-card p-5 sm:p-6">
                  <Icon
                    aria-hidden="true"
                    size={26}
                    stroke={1.7}
                    className="text-kolss-muted-green"
                  />
                  <h2
                    id={
                      item.title === "Ekspozycje salonowe"
                        ? "sale-context-title"
                        : undefined
                    }
                    className="mt-5 text-[23px] font-semibold leading-[1.08]"
                  >
                    {item.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <ProductSection
          id="kuchnie"
          kicker="Zestawy kuchenne"
          title="Kuchnie ekspozycyjne w cenach wyprzedażowych"
          text="Ceny i opisy poniżej zostały przeniesione ze strony wyprzedaży KOLSS. Zdjęcia pochodzą z lokalnego katalogu sale i pokazują konkretne dostępne zestawy."
          products={kitchenProducts}
        />

        <div className="border-t border-border bg-kolss-surface-alt">
          <ProductSection
            id="garderoby"
            kicker="Szafy i garderoby"
            title="Gotowe zabudowy WERONA z ekspozycji"
            text="W tej części znajdują się pozycje z działu szaf i zestawów gabinetowych ze starej strony wyprzedaży, razem z ceną wyprzedażową i ceną przed rabatem."
            products={wardrobeProducts}
          />
        </div>

        <section
          aria-labelledby="sale-final-title"
          className="dark-section border-b border-kolss-warm-white/14 bg-kolss-charcoal"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.58fr_0.42fr] lg:px-10 lg:py-20">
            <div>
              <p className="section-kicker text-background/70">
                Rezerwacja zestawu
              </p>
              <h2 id="sale-final-title" className="section-title text-background">
                Wybrany zestaw warto potwierdzić przed wizytą
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[15px] leading-[1.65] text-background/78 sm:text-base">
                Oferta ekspozycyjna może zmieniać się szybciej niż standardowe
                kolekcje. Najpewniej jest zadzwonić albo wysłać formularz z
                nazwą produktu, a salon potwierdzi aktualną dostępność.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={contact.phoneHref} className="hero-cta hero-cta-primary">
                  Zadzwoń do salonu
                  <IconPhone aria-hidden="true" size={18} stroke={1.8} />
                </a>
                <Link href="#kontakt" className="hero-cta hero-cta-secondary">
                  Wyślij zapytanie
                  <IconArrowRight aria-hidden="true" size={18} stroke={1.8} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
