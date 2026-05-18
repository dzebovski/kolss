import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IconBuildingStore,
  IconCheck,
  IconClock,
  IconFileText,
  IconMapPin,
  IconPhone,
  IconRoute,
  IconRulerMeasure2,
  IconToolsKitchen2,
} from "@tabler/icons-react";

import {
  KitchenCarousel,
  type KitchenCarouselCollection,
} from "@/app/_components/kitchen-carousel";
import { SiteFooter } from "@/app/_components/home/SiteFooter";
import { SiteHeader } from "@/app/_components/site-header";
import { contact } from "@/app/_content/home";
import { headerNavigation } from "@/lib/site";
import heroImage from "@/assets/images/salon/salon-sample-7.jpg";
import salonPhotoOne from "@/assets/images/salon/salon-sample-4.jpg";
import salonPhotoTwo from "@/assets/images/salon/salon-sample-5.jpg";
import salonSampleOne from "@/assets/images/salon/salon-sample-1.jpg";
import salonSampleFour from "@/assets/images/salon/salon-sample-4.jpg";
import salonSampleFive from "@/assets/images/salon/salon-sample-5.jpg";
import salonSampleSix from "@/assets/images/salon/salon-sample-6.jpg";
import salonSampleSeven from "@/assets/images/salon/salon-sample-7.jpg";

export const metadata: Metadata = {
  title: "KOLSS Salon Warszawa | Oficjalny salon KOLSS Polska",
  description:
    "Odwiedź salon KOLSS Polska w Legionowie pod Warszawą. Kontakt, godziny otwarcia, mapa dojazdu i dane firmy KOLSS Polska Sp. z o.o.",
  alternates: {
    canonical: "/salon-warszawa",
  },
  openGraph: {
    title: "KOLSS Salon Warszawa | Oficjalny salon KOLSS Polska",
    description:
      "Salon KOLSS Polska w Legionowie pod Warszawą: konsultacje, ekspozycje kuchni, godziny otwarcia, mapa dojazdu i dane firmy.",
    url: "/salon-warszawa",
    type: "website",
  },
};

const routeHref =
  "https://www.google.com/maps/dir/?api=1&destination=52.401807098688344%2C20.948270951456184";
const mapSrc =
  "https://www.google.com/maps?q=52.401807098688344%2C20.948270951456184&output=embed";

const pageNavigation = [
  { label: "Start", href: "#start" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "W salonie", href: "#salon" },
  { label: "Ekspozycje", href: "#ekspozycje" },
  { label: "Dojazd", href: "#dojazd" },
] as const;

const openingHours = [
  ["Poniedziałek", "10:00-19:00"],
  ["Wtorek", "10:00-19:00"],
  ["Środa", "10:00-19:00"],
  ["Czwartek", "10:00-19:00"],
  ["Piątek", "10:00-19:00"],
  ["Sobota", "10:00-15:00"],
  ["Niedziela", "zamknięte"],
] as const;

const salonActions = [
  "otrzymać konsultację dotyczącą produktów i rozwiązań KOLSS",
  "omówić indywidualny projekt kuchni lub zabudowy",
  "porównać materiały, fronty, blaty, okucia i warianty wykonania",
  "doprecyzować rozwiązania techniczne i zakres kolejnego etapu",
  "uzyskać bezpośrednie wsparcie polskiego biura KOLSS",
] as const;

const preparationItems = [
  {
    title: "Plan lub wymiary",
    text: "Rzut mieszkania, podstawowe wymiary albo dokumentacja od architekta przyspieszą rozmowę.",
    icon: IconRulerMeasure2,
  },
  {
    title: "Inspiracje i styl",
    text: "Zdjęcia kuchni, materiały i kolory pomagają szybciej zawęzić kierunek projektu.",
    icon: IconFileText,
  },
  {
    title: "Sprzęt i potrzeby",
    text: "Lista AGD, sposób gotowania i potrzeby przechowywania pozwalają rozmawiać konkretnie.",
    icon: IconToolsKitchen2,
  },
] as const;

const processItems = [
  {
    title: "Rozmowa w salonie",
    text: "Porządkujemy potrzeby, budżet, styl i zakres projektu.",
  },
  {
    title: "Analiza techniczna",
    text: "Sprawdzamy wymiary, układ, materiały i możliwe rozwiązania.",
  },
  {
    title: "Kolejny krok",
    text: "Ustalamy wycenę, pomiar, dokumentację albo dalsze dopracowanie projektu.",
  },
] as const;

const salonCollections: KitchenCarouselCollection[] = [
  {
    title: "Klasyczna zabudowa z ramkowymi frontami",
    subtitle:
      "Dekoracyjne fronty, przeszklenia, ciepłe drewno i ciemniejszy blat roboczy.",
    bestFor:
      "fronty ramkowe, przeszklone szafki, klasyczny charakter, kontrast materiałów",
    image: salonSampleOne,
    alt: "Klasyczna ekspozycja kuchni KOLSS z ramkowymi frontami i drewnianymi akcentami",
    details: [
      {
        image: salonSampleFour,
        alt: "Nowoczesna ekspozycja kuchni KOLSS z ciemnymi frontami i drewnianym panelem",
        caption:
          "W salonie można porównać klasyczne fronty z prostszą, nowoczesną linią zabudowy.",
      },
      {
        image: salonSampleSeven,
        alt: "Granatowa klasyczna ekspozycja kuchni KOLSS z wyspą i jasnym blatem",
        caption:
          "Kolor, uchwyty i blat pomagają określić, czy projekt ma iść w spokojną klasykę czy mocniejszy akcent.",
      },
    ],
  },
  {
    title: "Nowoczesna kuchnia z ciemnymi frontami",
    subtitle:
      "Proste linie, drewno na ścianie, wysoka zabudowa i sprzęty w słupku.",
    bestFor:
      "nowoczesne mieszkania, ciemniejsze fronty, układy liniowe, wysoka zabudowa",
    image: salonSampleFour,
    alt: "Nowoczesna ekspozycja kuchni KOLSS z ciemnymi frontami i drewnianym panelem",
    details: [
      {
        image: salonSampleSix,
        alt: "Ciepła minimalistyczna kuchnia KOLSS z drewnianymi frontami i ciemnymi szafkami górnymi",
        caption:
          "Ciemne fronty można zestawić z drewnem i światłem podszafkowym, żeby kuchnia była spokojniejsza wizualnie.",
      },
      {
        image: salonSampleOne,
        alt: "Klasyczna ekspozycja kuchni KOLSS z ramkowymi frontami i drewnianymi akcentami",
        caption:
          "Ten sam układ rozmowy można przełożyć na bardziej klasyczny albo bardziej minimalistyczny język frontów.",
      },
    ],
  },
  {
    title: "Rustykalna ekspozycja z drewnem",
    subtitle:
      "Tradycyjny charakter, otwarte półki, wyspa i mocniejsza struktura naturalnego drewna.",
    bestFor:
      "domy, kuchnie z wyspą, naturalne drewno, cieplejszy tradycyjny klimat",
    image: salonSampleFive,
    alt: "Drewniana rustykalna ekspozycja kuchni KOLSS z wyspą i hokerami",
    details: [
      {
        image: salonSampleOne,
        alt: "Klasyczna ekspozycja kuchni KOLSS z ramkowymi frontami i drewnianymi akcentami",
        caption:
          "Różne warianty klasyki pozwalają porównać ciężar frontu, kolor drewna i proporcje zabudowy.",
      },
      {
        image: salonSampleSix,
        alt: "Ciepła minimalistyczna kuchnia KOLSS z drewnianymi frontami i ciemnymi szafkami górnymi",
        caption:
          "Drewno może budować rustykalny klimat albo bardziej współczesny, prostszy efekt.",
      },
    ],
  },
  {
    title: "Ciepły minimalizm",
    subtitle:
      "Spokojna zabudowa z drewnianymi frontami, ciemnym pasem roboczym i liniowym oświetleniem.",
    bestFor:
      "ciepły minimalizm, drewniane fronty, ciemny panel roboczy, prosta linia",
    image: salonSampleSix,
    alt: "Ciepła minimalistyczna kuchnia KOLSS z drewnianymi frontami i ciemnymi szafkami górnymi",
    details: [
      {
        image: salonSampleFour,
        alt: "Nowoczesna ekspozycja kuchni KOLSS z ciemnymi frontami i drewnianym panelem",
        caption:
          "W salonie można sprawdzić, jak ciemniejsze fronty zmieniają odbiór tej samej nowoczesnej logiki.",
      },
      {
        image: salonSampleSeven,
        alt: "Granatowa klasyczna ekspozycja kuchni KOLSS z wyspą i jasnym blatem",
        caption:
          "Kontrast z klasyczną ekspozycją ułatwia decyzję między prostą linią a bardziej dekoracyjnym projektem.",
      },
    ],
  },
  {
    title: "Granatowa klasyka z wyspą",
    subtitle:
      "Kolor, detale metalowe, blat inspirowany kamieniem i układ z wyspą.",
    bestFor:
      "wyspa kuchenna, mocniejszy kolor, złote detale, elegancki klasyczny projekt",
    image: salonSampleSeven,
    alt: "Granatowa klasyczna ekspozycja kuchni KOLSS z wyspą i jasnym blatem",
    details: [
      {
        image: salonSampleOne,
        alt: "Klasyczna ekspozycja kuchni KOLSS z ramkowymi frontami i drewnianymi akcentami",
        caption:
          "Klasyczne fronty można prowadzić spokojnie albo mocniej, zależnie od koloru i detalu.",
      },
      {
        image: salonSampleFive,
        alt: "Drewniana rustykalna ekspozycja kuchni KOLSS z wyspą i hokerami",
        caption:
          "Wyspa może mieć bardziej elegancki, rustykalny albo minimalistyczny charakter.",
      },
    ],
  },
];

export default function SalonWarszawaPage() {
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
          aria-labelledby="salon-hero-title"
          className="dark-section relative isolate overflow-hidden border-b border-kolss-warm-white/14 bg-kolss-charcoal"
        >
          <Image
            src={heroImage}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[52%_center]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,36,33,0.92)_0%,rgba(30,36,33,0.7)_38%,rgba(30,36,33,0.28)_76%,rgba(30,36,33,0.14)_100%),linear-gradient(180deg,rgba(30,36,33,0.42)_0%,rgba(30,36,33,0.08)_48%,rgba(30,36,33,0.5)_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid min-h-[720px] w-full max-w-[1440px] gap-8 px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-[0.64fr_0.36fr] lg:items-end lg:px-20 lg:pt-32">
            <div className="max-w-[780px] self-center lg:self-end">
              <p className="mb-5 text-[13px] font-semibold uppercase leading-[1.3] text-kolss-warm-white/78 sm:text-sm">
                Salon KOLSS Polska
              </p>
              <h1
                id="salon-hero-title"
                className="hero-title text-[38px] font-semibold leading-[1.02] text-kolss-warm-white min-[420px]:text-[44px] sm:text-[58px] lg:text-[74px]"
              >
                KOLSS Salon Warszawa
              </h1>
              <p className="mt-6 max-w-[660px] text-[15px] leading-[1.65] text-kolss-warm-white/80 sm:text-base">
                Oficjalny salon KOLSS Polska w regionie warszawskim. Zapraszamy
                do naszego biura w Legionowie, gdzie możesz otrzymać
                konsultację, zobaczyć rozwiązania KOLSS i omówić szczegóły
                współpracy.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={contact.phoneHref} className="hero-cta hero-cta-primary">
                  Zadzwoń
                  <IconPhone aria-hidden="true" size={18} stroke={1.8} />
                </a>
                <a
                  href={routeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta hero-cta-secondary"
                >
                  Wyznacz trasę
                  <IconRoute aria-hidden="true" size={18} stroke={1.8} />
                </a>
              </div>
            </div>

            <address className="rounded-lg border border-kolss-warm-white/18 bg-kolss-charcoal/44 p-5 text-kolss-warm-white shadow-[0_24px_60px_rgba(15,18,17,0.28)] backdrop-blur-md lg:mb-3">
              <p className="text-[13px] font-semibold uppercase leading-none text-kolss-warm-white/58">
                Adres salonu
              </p>
              <p className="mt-4 text-base font-semibold not-italic">
                {contact.company}
              </p>
              <p className="mt-2 text-[15px] leading-[1.55] text-kolss-warm-white/78">
                {contact.streetAddress}
                <br />
                {contact.postalCode} {contact.city}
                <br />
                Polska
              </p>
            </address>
          </div>
        </section>

        <section
          aria-label="Nawigacja po stronie salonu"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto flex w-full max-w-[1440px] gap-2 overflow-x-auto px-5 py-4 sm:px-8 lg:px-10">
            {pageNavigation.slice(1).map((item) => (
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
          id="kontakt"
          aria-labelledby="salon-contact-title"
          className="border-b border-border bg-background"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.42fr_0.58fr] lg:px-10 lg:py-20">
            <div>
              <p className="section-kicker">Kontakt</p>
              <h2 id="salon-contact-title" className="section-title">
                Adres, telefon i godziny otwarcia salonu
              </h2>
              <p className="mt-6 text-[15px] leading-[1.65] text-muted sm:text-base">
                Salon znajduje się w Legionowie, w bezpośrednim regionie
                Warszawy. Przed wizytą najlepiej zadzwonić, aby potwierdzić
                dogodny termin konsultacji.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={contact.phoneHref} className="hero-cta hero-cta-primary">
                  {contact.phone}
                  <IconPhone aria-hidden="true" size={18} stroke={1.8} />
                </a>
                <a
                  href={routeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta hero-cta-secondary"
                >
                  Trasa w Google Maps
                  <IconRoute aria-hidden="true" size={18} stroke={1.8} />
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="kolss-card p-5 sm:p-6">
                <IconBuildingStore
                  aria-hidden="true"
                  size={26}
                  stroke={1.7}
                  className="text-kolss-muted-green"
                />
                <h3 className="mt-5 text-[24px] font-semibold leading-[1.08]">
                  Adres salonu
                </h3>
                <address className="mt-4 text-[15px] leading-[1.6] text-muted not-italic">
                  <span className="font-semibold text-foreground">
                    {contact.company}
                  </span>
                  <br />
                  {contact.streetAddress}
                  <br />
                  {contact.postalCode} {contact.city}
                  <br />
                  Polska
                </address>
              </div>

              <div className="kolss-card p-5 sm:p-6">
                <IconClock
                  aria-hidden="true"
                  size={26}
                  stroke={1.7}
                  className="text-kolss-muted-green"
                />
                <h3 className="mt-5 text-[24px] font-semibold leading-[1.08]">
                  Godziny otwarcia
                </h3>
                <dl className="mt-4 grid gap-2 text-[15px] leading-[1.45]">
                  {openingHours.map(([day, hours]) => (
                    <div
                      key={day}
                      className="flex items-baseline justify-between gap-4 border-b border-border pb-2 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-muted">{day}</dt>
                      <dd className="font-semibold text-foreground">{hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section
          id="salon"
          aria-labelledby="in-salon-title"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.5fr_0.5fr] lg:px-10 lg:py-20">
            <div className="grid gap-4 sm:grid-cols-[0.6fr_0.4fr] lg:min-h-[580px]">
              <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-muted-surface shadow-[0_20px_48px_rgba(30,36,33,0.12)]">
                <Image
                  src={salonPhotoOne}
                  alt="Nowoczesna ekspozycja kuchni w salonie KOLSS w Legionowie"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 60vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-muted-surface shadow-[0_16px_38px_rgba(30,36,33,0.1)] sm:translate-y-10">
                <Image
                  src={salonPhotoTwo}
                  alt="Drewniana ekspozycja kuchni i wyspy w salonie KOLSS"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 40vw, 20vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="section-kicker">W salonie</p>
              <h2 id="in-salon-title" className="section-title">
                Zobacz rozwiązania KOLSS i porozmawiaj o swoim wnętrzu
              </h2>
              <p className="mt-6 text-[15px] leading-[1.65] text-muted sm:text-base">
                Salon nie jest tylko miejscem oglądania ekspozycji. To spokojna
                przestrzeń do rozmowy o układzie, materiałach, ergonomii,
                budżecie i decyzjach, które później wpływają na produkcję oraz
                montaż.
              </p>
              <ul className="mt-8 grid gap-3">
                {salonActions.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-muted">
                    <IconCheck
                      aria-hidden="true"
                      size={19}
                      stroke={1.9}
                      className="mt-0.5 shrink-0 text-kolss-muted-green"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="ekspozycje"
          aria-labelledby="salon-samples-title"
          className="border-b border-border bg-background"
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
              <div>
                <p className="section-kicker">Ekspozycje</p>
                <h2 id="salon-samples-title" className="section-title">
                  Kuchnie, które można zobaczyć w salonie
                </h2>
              </div>
              <div className="lg:pt-12">
                <p className="text-[15px] leading-[1.65] text-muted sm:text-base">
                  Zdjęcia pokazują przykładowe ekspozycje i kierunki rozmowy:
                  klasyczne fronty ramkowe, ciemne nowoczesne zabudowy,
                  naturalne drewno, kolor oraz układy z wyspą.
                </p>
              </div>
            </div>

            <KitchenCarousel
              collections={salonCollections}
              ariaLabel="Ekspozycje kuchni w salonie"
              bestForLabel="W salonie można omówić"
            />
          </div>
        </section>

        <section
          aria-labelledby="visit-prep-title"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.38fr_0.62fr] lg:px-10 lg:py-20">
            <div>
              <p className="section-kicker">Przed wizytą</p>
              <h2 id="visit-prep-title" className="section-title">
                Co warto przygotować przed spotkaniem
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {preparationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="kolss-card p-5 sm:p-6">
                    <Icon
                      aria-hidden="true"
                      size={26}
                      stroke={1.7}
                      className="text-kolss-muted-green"
                    />
                    <h3 className="mt-5 text-[22px] font-semibold leading-[1.1]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-muted">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="next-step-title"
          className="border-b border-border bg-background"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.42fr_0.58fr] lg:px-10 lg:py-20">
            <div>
              <p className="section-kicker">Po spotkaniu</p>
              <h2 id="next-step-title" className="section-title">
                Salon jest początkiem konkretnego procesu
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {processItems.map((item, index) => (
                <article
                  key={item.title}
                  className="border-l border-border pl-5"
                >
                  <p className="text-[13px] font-semibold uppercase leading-none text-kolss-muted-green">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-[23px] font-semibold leading-[1.08]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="dojazd"
          aria-labelledby="route-title"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.62fr_0.38fr] lg:px-10 lg:py-20">
            <div className="overflow-hidden rounded-lg border border-border bg-background shadow-[0_18px_44px_rgba(30,36,33,0.09)]">
              <iframe
                src={mapSrc}
                width="100%"
                height="420"
                className="block border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa dojazdu do salonu KOLSS Polska w Legionowie"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="section-kicker">Dojazd</p>
              <h2 id="route-title" className="section-title">
                KOLSS Polska, ul. Zegrzyńska 6 w Legionowie
              </h2>
              <p className="mt-6 text-[15px] leading-[1.65] text-muted sm:text-base">
                Skorzystaj z mapy lub otwórz trasę w Google Maps. Salon obsługuje
                klientów z Warszawy, Legionowa i okolic.
              </p>
              <a
                href={routeHref}
                target="_blank"
                rel="noreferrer"
                className="hero-cta hero-cta-primary mt-8 w-full sm:w-fit"
              >
                Wyznacz trasę w Google Maps
                <IconMapPin aria-hidden="true" size={18} stroke={1.8} />
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="salon-faq-title"
          className="border-b border-border bg-background"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.38fr_0.62fr] lg:px-10 lg:py-20">
            <div>
              <p className="section-kicker">FAQ</p>
              <h2 id="salon-faq-title" className="section-title">
                Najczęstsze pytania przed wizytą
              </h2>
            </div>
            <div className="grid gap-4">
              {[
                {
                  question: "Czy trzeba umawiać wizytę?",
                  answer:
                    "Najlepiej zadzwonić wcześniej, aby zarezerwować czas na spokojną konsultację.",
                },
                {
                  question: "Czy mogę przyjść z projektem od architekta?",
                  answer:
                    "Tak. Rysunki, wizualizacje i lista założeń pomagają szybciej przejść do analizy technicznej.",
                },
                {
                  question: "Czy salon obsługuje Warszawę?",
                  answer:
                    "Tak. Salon znajduje się w Legionowie, a komunikację prowadzimy jako Warsaw-first dla Warszawy i okolic.",
                },
              ].map((item) => (
                <article key={item.question} className="kolss-card p-5 sm:p-6">
                  <h3 className="text-[22px] font-semibold leading-[1.12]">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="company-data-title"
          className="bg-kolss-charcoal text-kolss-warm-white"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.32fr_0.68fr] lg:px-10">
            <div>
              <p className="text-[13px] font-semibold uppercase leading-none text-kolss-warm-white/56">
                Dane firmy
              </p>
              <h2
                id="company-data-title"
                className="mt-4 text-[30px] font-semibold leading-[1.04] sm:text-[36px]"
              >
                KOLSS Polska Sp. z o.o.
              </h2>
            </div>
            <dl className="grid gap-3 text-[15px] leading-[1.55] text-kolss-warm-white/78 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="font-semibold text-kolss-warm-white">Adres</dt>
                <dd className="mt-1">
                  ul. Zegrzyńska 6, 05-119 Legionowo
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-kolss-warm-white">KRS</dt>
                <dd className="mt-1">0001207180</dd>
              </div>
              <div>
                <dt className="font-semibold text-kolss-warm-white">NIP</dt>
                <dd className="mt-1">536-199-62-94</dd>
              </div>
              <div>
                <dt className="font-semibold text-kolss-warm-white">REGON</dt>
                <dd className="mt-1">543320017</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-kolss-warm-white">Sąd</dt>
                <dd className="mt-1">
                  Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział
                  Gospodarczy KRS
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
