import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

import { ContactSection } from "@/app/_components/home/ContactSection";
import { SalonSection } from "@/app/_components/home/SalonSection";
import { SiteFooter } from "@/app/_components/home/SiteFooter";
import { SiteHeader } from "@/app/_components/site-header";
import { headerNavigation } from "@/lib/site";
import lightMain from "@/assets/images/kitchens/1-light-main.png";
import lightHover from "@/assets/images/kitchens/1-light/light-kitchen-1.jpg";
import capriMain from "@/assets/images/kitchens/2-capri-main.png";
import capriHover from "@/assets/images/kitchens/2-capri/capri-sample-9.jpg";
import ladeMain from "@/assets/images/kitchens/3-lade-main.png";
import ladeHover from "@/assets/images/kitchens/3-lade/lade-sample-5.jpg";
import alegranzaMain from "@/assets/images/kitchens/4-alegranza-main.png";
import alegranzaHover from "@/assets/images/kitchens/4-alegranza/alegranza-sample-2.jpg";
import kokoMain from "@/assets/images/kitchens/5-koko-main.png";
import kokoHover from "@/assets/images/kitchens/5-koko/koko-sample-2.jpg";
import madeyraMain from "@/assets/images/kitchens/6-madeyra-main.png";
import madeyraHover from "@/assets/images/kitchens/6-madeyra/madeyra-sample-2.jpg";
import loftMain from "@/assets/images/kitchens/7-loft-main.png";
import loftHover from "@/assets/images/kitchens/7-loft/loft-sample-3.jpg";
import grandMain from "@/assets/images/kitchens/8-grand-main.png";
import grandHover from "@/assets/images/kitchens/8-grand/grand-sample-9.jpg";
import floresMain from "@/assets/images/kitchens/9-fores-main.png";
import floresHover from "@/assets/images/kitchens/9-flores/flores-sample-10.jpg";
import notaMain from "@/assets/images/kitchens/10-nota-main.png";
import notaHover from "@/assets/images/kitchens/10-nota/nota-sample-4.jpg";
import merengeMain from "@/assets/images/kitchens/11-merenge-main.png";
import merengeHover from "@/assets/images/kitchens/11-merenge/merenge-sample-2.jpg";
import rondoMain from "@/assets/images/kitchens/12-rondo-main.png";
import rondoHover from "@/assets/images/kitchens/12-rondo/rondo-sample-5.jpg";
import mdfMain from "@/assets/images/kitchens/13-mdf-main.png";
import mdfHover from "@/assets/images/kitchens/13-mdf/mdf-sample-5.jpg";

export const metadata: Metadata = {
  title: "Kolekcje kuchni na wymiar",
  description:
    "Poznaj kolekcje kuchni KOLSS: Light, Capri, Lade, Alegranza, Koko, Madeyra, Loft, Grand, Flores, Nota, Merenge, Rondo i MDF.",
  alternates: {
    canonical: "/kitchen-collections",
  },
  openGraph: {
    title: "Kolekcje kuchni na wymiar | KOLSS Polska",
    description:
      "Trzynaście kierunków stylistycznych kuchni KOLSS, od ciepłego minimalizmu po klasyczne drewno i lakierowany MDF.",
    url: "/kitchen-collections",
    type: "website",
  },
};

type KitchenCollection = {
  number: string;
  name: string;
  slug: string;
  mood: string;
  description: string;
  image: StaticImageData;
  hoverImage: StaticImageData;
  alt: string;
  tags: readonly string[];
  feature?: "wide";
};

const pageNavigation = [
  { label: "Start", href: "#start" },
  { label: "Kolekcje", href: "#kolekcje" },
  { label: "Salon", href: "#salon" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

const collections: KitchenCollection[] = [
  {
    number: "01",
    name: "Light",
    slug: "light",
    mood: "Warm modern kitchen with wooden accents",
    description:
      "Nowoczesna kuchnia modułowa definiująca standardy współczesnego luksusu. Innowacyjne rozwiązania konstrukcyjne, najwyższej jakości okucia oraz bogata paleta prestiżowych frontów pozwalają projektować wnętrza o wyjątkowym charakterze.",
    image: lightMain,
    hoverImage: lightHover,
    alt: "Kuchnia Light z jasnymi frontami i drewnianymi akcentami",
    tags: ["Modułowa", "Premium"],
    feature: "wide",
  },
  {
    number: "02",
    name: "Capri",
    slug: "capri",
    mood: "Scandinavian-inspired kitchen and living space",
    description:
      "Nowe spojrzenie na klasyczną kuchnię, w której ponadczasowa estetyka spotyka się z nowoczesnymi materiałami i zaawansowanymi komponentami. To propozycja łącząca tradycję z innowacją.",
    image: capriMain,
    hoverImage: capriHover,
    alt: "Kuchnia Capri inspirowana skandynawskim stylem i strefą dzienną",
    tags: ["Klasyka", "Scandi"],
  },
  {
    number: "03",
    name: "Lade",
    slug: "lade",
    mood: "Modern minimalist kitchen-dining design",
    description:
      "Stylowa kuchnia LADE zachwyca lekkością formy i nowoczesnym charakterem. Połączenie trzech rodzajów frontów nadaje aranżacji unikalny wyraz i podkreśla jej indywidualny rytm.",
    image: ladeMain,
    hoverImage: ladeHover,
    alt: "Minimalistyczna kuchnia Lade połączona z jadalnią",
    tags: ["Minimalizm", "Trzy fronty"],
  },
  {
    number: "04",
    name: "Alegranza",
    slug: "alegranza",
    mood: "Modern Scandinavian kitchen with dining area",
    description:
      "Łączy wyrafinowaną prostotę i funkcjonalność. Nowoczesny beżowy odcień tworzy atmosferę ciepła i komfortu, a faktura drewna dodaje wnętrzu naturalnej głębi.",
    image: alegranzaMain,
    hoverImage: alegranzaHover,
    alt: "Kuchnia Alegranza w nowoczesnym skandynawskim charakterze",
    tags: ["Beż", "Drewno"],
  },
  {
    number: "05",
    name: "Koko",
    slug: "koko",
    mood: "Modern kitchen and dining space",
    description:
      "Nowoczesny klasyk, czyli estetyka, która w wyważony i subtelny sposób wpisuje się w niemal każde wnętrze. To propozycja dla koneserów nowoczesnego rytmu połączonego z ponadczasową klasyką.",
    image: kokoMain,
    hoverImage: kokoHover,
    alt: "Kuchnia Koko jako nowoczesny klasyk z jadalnią",
    tags: ["Modern classic", "Subtelna"],
  },
  {
    number: "06",
    name: "Madeyra",
    slug: "madeyra",
    mood: "Bright minimalist kitchen with dining area",
    description:
      "Kolekcja nowoczesnych frontów drewnianych zaprojektowana z myślą o harmonijnym dopasowaniu do różnych aranżacji. Naturalne materiały i staranne wykończenie tworzą spójną, elegancką całość.",
    image: madeyraMain,
    hoverImage: madeyraHover,
    alt: "Jasna minimalistyczna kuchnia Madeyra z drewnianymi frontami",
    tags: ["Drewniane fronty", "Jasna"],
  },
  {
    number: "07",
    name: "Loft",
    slug: "loft",
    mood: "Warm industrial kitchen with modern accents",
    description:
      "Idealna do wnętrz o wyraźnie minimalistycznym charakterze. Nowoczesne, stylowe fronty drewniane harmonijnie łączą się z estetyką loftową, nadając przestrzeni elegancki i wyrazisty charakter.",
    image: loftMain,
    hoverImage: loftHover,
    alt: "Ciepła industrialna kuchnia Loft z nowoczesnymi akcentami",
    tags: ["Industrial", "Drewno"],
  },
  {
    number: "08",
    name: "Grand",
    slug: "grand",
    mood: "Elegant modern kitchen with dining nook",
    description:
      "Propozycja do wnętrz w stylu wyrafinowanego minimalizmu oraz szlachetnej, postarzanej klasyki. Naturalne drewno i dopracowane detale podkreślają prestiżowy charakter kolekcji.",
    image: grandMain,
    hoverImage: grandHover,
    alt: "Elegancka kuchnia Grand z nowoczesnym miejscem jadalnianym",
    tags: ["Naturalne drewno", "Certyfikat"],
  },
  {
    number: "09",
    name: "Flores",
    slug: "flores",
    mood: "Modern minimalist living and kitchen space",
    description:
      "FLORES łączy nowoczesną estetykę z naturalnym charakterem drewna. Fronty MDF w drewnianej ramie z naturalnym fornirem nadają całości lekkości, a wersje lakierowane w palecie RAL otwierają szerokie możliwości aranżacyjne.",
    image: floresMain,
    hoverImage: floresHover,
    alt: "Kuchnia Flores z naturalnym fornirem i minimalistyczną strefą dzienną",
    tags: ["Fornir", "RAL"],
    feature: "wide",
  },
  {
    number: "10",
    name: "Nota",
    slug: "nota",
    mood: "Elegant navy and marble kitchen design",
    description:
      "Kuchnia NOTA dostępna jest w dwóch szlachetnych gatunkach drewna: olcha lub jesion. Naturalne materiały w połączeniu ze sprawdzonymi systemami Blum gwarantują trwałość i ponadczasowy wygląd.",
    image: notaMain,
    hoverImage: notaHover,
    alt: "Elegancka kuchnia Nota z granatem, marmurowym rysunkiem i drewnem",
    tags: ["Olcha", "Jesion"],
  },
  {
    number: "11",
    name: "Merenge",
    slug: "merenge",
    mood: "Cozy rustic farmhouse kitchen ambiance",
    description:
      "MERENGE to ikona marki KOLSS i jej znak rozpoznawczy. Charakterystyczny front zaprojektowany 15 lat temu zachwyca niezmiennie swoją formą, łącząc klasykę z uniwersalnym stylem.",
    image: merengeMain,
    hoverImage: merengeHover,
    alt: "Kuchnia Merenge w przytulnym klasycznym stylu",
    tags: ["Ikona KOLSS", "Klasyka"],
  },
  {
    number: "12",
    name: "Rondo",
    slug: "rondo",
    mood: "Modern minimalist kitchen with marble accents",
    description:
      "Rondo to kolekcja efektownych drewnianych frontów, które dopasują się do różnych stylów wnętrza. Możliwość łączenia kolorów i klasycznych wykończeń sprawia, że dobrze działa w pomieszczeniach o wielu rozmiarach.",
    image: rondoMain,
    hoverImage: rondoHover,
    alt: "Nowoczesna minimalistyczna kuchnia Rondo z marmurowymi akcentami",
    tags: ["Drewno", "Wszechstronna"],
  },
  {
    number: "13",
    name: "MDF",
    slug: "mdf",
    mood: "Sleek modern kitchen with city view",
    description:
      "Kuchnie MDF to synonim minimalizmu i czystych, nowoczesnych linii. Wysoka jakość wykonania oraz szeroka gama kolorów pozwalają stworzyć kuchnię precyzyjnie dopasowaną do indywidualnych potrzeb.",
    image: mdfMain,
    hoverImage: mdfHover,
    alt: "Nowoczesna kuchnia MDF z czystymi liniami i widokiem na miasto",
    tags: ["Minimalizm", "Kolor"],
    feature: "wide",
  },
];

function CollectionCard({ collection }: { collection: KitchenCollection }) {
  const isWide = collection.feature === "wide";
  const imageSizes = isWide
    ? "(max-width: 1023px) 100vw, 50vw"
    : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw";

  return (
    <article
      id={`kolekcja-${collection.slug}`}
      className={`kolss-card group flex h-full scroll-mt-28 flex-col overflow-hidden ${
        isWide ? "lg:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted-surface">
        <Image
          src={collection.image}
          alt={collection.alt}
          sizes={imageSizes}
          className="h-full w-full object-cover"
        />
        <Image
          src={collection.hoverImage}
          alt=""
          aria-hidden="true"
          fill
          sizes={imageSizes}
          className="object-cover opacity-0 transition-opacity duration-1000 ease-out group-hover:opacity-100 motion-reduce:transition-none"
        />
        <div
          className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4"
          aria-hidden="true"
        >
          <span className="rounded-lg bg-kolss-charcoal px-3 py-2 text-xs font-semibold leading-none text-kolss-warm-white">
            {collection.number}
          </span>
          <span className="rounded-lg border border-kolss-charcoal/12 bg-kolss-warm-white px-3 py-2 text-xs font-semibold uppercase leading-none text-kolss-charcoal shadow-[0_10px_24px_rgba(30,36,33,0.08)]">
            {collection.tags[0]}
          </span>
        </div>
      </div>

      <div
        className={
          isWide
            ? "grid min-h-0 flex-1 gap-5 p-5 md:grid-cols-[0.36fr_0.64fr]"
            : "flex min-h-0 flex-1 flex-col p-5"
        }
      >
        <div>
          <p className="text-xs font-semibold uppercase leading-none text-kolss-muted-green">
            Kolekcja {collection.number}
          </p>
          <h2 className="mt-3 text-[30px] font-semibold leading-[1.02] text-foreground">
            {collection.name}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-[1.35] text-muted">
            {collection.mood}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <p className="text-[15px] leading-[1.6] text-muted">
            {collection.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {collection.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-border bg-kolss-surface-alt px-3 py-2 text-xs font-semibold uppercase leading-none text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function KitchenCollectionsPage() {
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
        salonHref="#salon"
      />

      <main id="main-content">
        <section
          id="start"
          aria-labelledby="kitchen-collections-title"
          className="dark-section relative isolate overflow-hidden border-b border-kolss-warm-white/14 bg-kolss-charcoal"
        >
          <Image
            src={floresMain}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[58%_center]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,36,33,0.9)_0%,rgba(30,36,33,0.68)_33%,rgba(30,36,33,0.24)_70%,rgba(30,36,33,0.1)_100%),linear-gradient(180deg,rgba(30,36,33,0.36)_0%,rgba(30,36,33,0.06)_42%,rgba(30,36,33,0.38)_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-9 pt-28 sm:px-8 sm:pb-10 sm:pt-28 lg:px-20 lg:pb-10 lg:pt-28">
            <div className="grid w-full gap-6 lg:grid-cols-[0.66fr_0.34fr] lg:items-end">
              <div>
                <p className="mb-4 text-[13px] font-semibold uppercase leading-[1.3] text-kolss-warm-white/82 sm:text-sm">
                  Kolekcje kuchni KOLSS
                </p>
                <h1
                  id="kitchen-collections-title"
                  className="hero-title max-w-[760px] text-[36px] font-semibold leading-[1.02] text-kolss-warm-white min-[420px]:text-[42px] sm:text-[50px] lg:text-[60px]"
                >
                  13 kolekcji kuchni z naturalnym charakterem
                </h1>
                <p className="mt-5 max-w-[700px] text-[15px] leading-[1.6] text-kolss-warm-white/80 sm:text-base lg:max-w-[660px]">
                  Każda kolekcja jest gotowym kierunkiem stylistycznym, ale
                  finalny projekt powstaje pod konkretne wnętrze, wymiary,
                  materiały i codzienny rytm domowników.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="#kolekcje" className="hero-cta hero-cta-primary">
                    Zobacz kolekcje
                    <IconArrowRight aria-hidden="true" size={18} stroke={1.8} />
                  </Link>
                  <Link href="#kontakt" className="hero-cta hero-cta-secondary">
                    Omów projekt
                  </Link>
                </div>
              </div>

              <dl className="grid grid-cols-3 gap-3 rounded-lg border border-kolss-warm-white/16 bg-kolss-charcoal/34 p-3 backdrop-blur-md lg:grid-cols-1 lg:p-4">
                <div className="border-r border-kolss-warm-white/14 pr-3 lg:border-b lg:border-r-0 lg:pb-4 lg:pr-0">
                  <dt className="text-[11px] font-semibold uppercase leading-none text-kolss-warm-white/56">
                    Kolekcje
                  </dt>
                  <dd className="mt-2 text-3xl font-semibold leading-none text-kolss-lime">
                    13
                  </dd>
                </div>
                <div className="border-r border-kolss-warm-white/14 pr-3 lg:border-b lg:border-r-0 lg:pb-4 lg:pr-0">
                  <dt className="text-[11px] font-semibold uppercase leading-none text-kolss-warm-white/56">
                    Kierunki
                  </dt>
                  <dd className="mt-2 text-3xl font-semibold leading-none text-kolss-warm-white">
                    4
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase leading-none text-kolss-warm-white/56">
                    Format
                  </dt>
                  <dd className="mt-2 text-sm font-semibold uppercase leading-[1.2] text-kolss-warm-white">
                    Na wymiar
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section
          aria-label="Kierunki stylistyczne"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-5 py-8 sm:px-8 lg:grid-cols-4 lg:px-10">
            {[
              "Ciepły minimalizm",
              "Nowoczesna klasyka",
              "Naturalne drewno",
              "Lakier i czysta linia",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-kolss-lime"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold uppercase leading-[1.25] text-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="kolekcje"
          aria-labelledby="collections-grid-title"
          className="border-b border-border bg-background"
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
              <div>
                <p className="section-kicker">Kolekcje</p>
                <h2 id="collections-grid-title" className="section-title">
                  Wybierz kierunek, który pasuje do architektury wnętrza
                </h2>
              </div>
              <div className="lg:pt-12">
                <p className="text-[15px] leading-[1.65] text-muted sm:text-base">
                  Poniższe kolekcje pokazują gotowe języki formy: od jasnych,
                  spokojnych układów po ciemniejsze, bardziej wyraziste
                  kompozycje. W salonie można przełożyć ten kierunek na
                  konkretne fronty, blaty, uchwyty, systemy i budżet.
                </p>
              </div>
            </div>

            <nav
              className="mt-10 flex gap-2 overflow-x-auto pb-2"
              aria-label="Lista kolekcji"
            >
              {collections.map((collection) => (
                <Link
                  key={collection.slug}
                  href={`#kolekcja-${collection.slug}`}
                  className="shrink-0 rounded-lg border border-border bg-kolss-surface-alt px-3 py-2 text-xs font-semibold uppercase leading-none text-foreground transition hover:border-kolss-charcoal hover:bg-kolss-lime/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kolss-lime"
                >
                  {collection.number} {collection.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 grid auto-rows-auto gap-5 md:grid-cols-2 lg:grid-cols-4">
              {collections.map((collection) => (
                <CollectionCard key={collection.slug} collection={collection} />
              ))}
            </div>
          </div>
        </section>

        <SalonSection />
        <ContactSection />
      </main>

      <SiteFooter navigation={pageNavigation} />
    </div>
  );
}
