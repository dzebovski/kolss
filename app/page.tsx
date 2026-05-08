import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { HomeCatalog } from "@/app/_components/home-catalog";
import { SiteHeader } from "@/app/_components/site-header";
import heroImage from "@/assets/images/home/hero.desktop.jpg";
import floresMain from "@/assets/images/kitchens/flores/flores-main.desktop.jpg";
import lightMain from "@/assets/images/kitchens/light/light-main.desktop.jpg";
import notaMain from "@/assets/images/kitchens/nota/nota-main.desktop.jpg";
import someKitchenImage from "@/assets/images/some-kitchen.desktop.jpg";
import workersOneImage from "@/assets/images/workers-1.dektop.jpg";
import workersThreeImage from "@/assets/images/workers-3.dektop.jpg";
import { absoluteUrl, mainNavigation, siteConfig } from "@/lib/site";

type ImageItem = {
  title: string;
  text: string;
  cta?: string;
  image: StaticImageData;
  alt: string;
};

const contact = {
  company: "KOLSS Polska Sp. z o.o.",
  streetAddress: "ul. Zegrzyńska 6",
  postalCode: "05-119",
  city: "Legionowo",
  phone: "+48 510 700 913",
  phoneHref: "tel:+48510700913",
  email: "biuro@kolss.eu",
  emailHref: "mailto:biuro@kolss.eu",
  designer: "Sławomir Szewczuk",
  designerPhone: "+48 510 700 889",
  designerPhoneHref: "tel:+48510700889",
  designerEmail: "projektant@kolss.eu",
  designerEmailHref: "mailto:projektant@kolss.eu",
};

const trustItems = [
  {
    title: "Od 1995 roku",
    text: "Doświadczenie w projektowaniu i produkcji mebli na wymiar.",
  },
  {
    title: "Salon w Legionowie",
    text: "Miejsce spotkań, próbek materiałowych i rozmów o projekcie.",
  },
  {
    title: "Warszawa i okolice",
    text: "Obsługujemy klientów z Warszawy, Legionowa i okolicznych miejscowości.",
  },
  {
    title: "Jeden proces",
    text: "Wycena, dopracowanie techniczne, produkcja, dostawa i montaż.",
  },
] as const;

const offerItems: ImageItem[] = [
  {
    title: "Kuchnie na wymiar",
    text: "Nowoczesne, klasyczne i ciepłe minimalistyczne kuchnie dopasowane do pomieszczenia, sprzętu AGD i codziennego rytmu domowników.",
    cta: "Omów kuchnię",
    image: lightMain,
    alt: "Jasna kuchnia z prostą linią zabudowy",
  },
  {
    title: "Kuchnia + salon",
    text: "Zabudowy, które łączą kuchnię, wyspę, strefę jadalni i meble dzienne w jednym spójnym języku materiałów.",
    cta: "Zaplanuj strefę dzienną",
    image: floresMain,
    alt: "Kuchnia z wyspą i ciepłymi drewnianymi frontami",
  },
  {
    title: "Szafy i garderoby",
    text: "Systemy przechowywania projektowane pod realne rzeczy, wymiary i sposób korzystania z mieszkania.",
    cta: "Wyceń zabudowę",
    image: heroImage,
    alt: "Zabudowa kuchenna połączona z meblami dziennymi",
  },
  {
    title: "Łazienki i utility",
    text: "Meble do łazienek, pralni i stref technicznych, gdzie liczy się dokładny wymiar, odporność i łatwe utrzymanie porządku.",
    cta: "Zapytaj o rozwiązanie",
    image: workersOneImage,
    alt: "Detal produkcji elementu meblowego na wymiar",
  },
];

const materialBullets = [
  "Fornir i drewno: naturalna głębia, spokojny charakter i indywidualny rysunek materiału.",
  "Lakierowane powierzchnie: czysta forma, szeroka paleta kolorów i łatwiejsze dopasowanie do projektu.",
  "Blaty i panele: elementy, które muszą łączyć estetykę z odpornością w codziennym użytkowaniu.",
  "Okucia i systemy wewnętrzne: detale, które decydują o tym, jak kuchnia działa po latach.",
] as const;

const proofItems: ImageItem[] = [
  {
    title: "Ciepła kuchnia z wyspą",
    text: "Kierunek dla wnętrz, w których kuchnia jest częścią codziennej strefy dziennej.",
    image: floresMain,
    alt: "Ciepła kuchnia z wyspą i drewnianymi frontami",
  },
  {
    title: "Jasna klasyczna zabudowa",
    text: "Spokojniejsza klasyka z naciskiem na proporcje, detale i praktyczny układ.",
    image: notaMain,
    alt: "Jasna klasyczna zabudowa kuchenna z dekoracyjnymi detalami",
  },
  {
    title: "Nowoczesna zabudowa kuchnia + salon",
    text: "Spójny język materiałów dla kuchni, przechowywania i mebli dziennych.",
    image: someKitchenImage,
    alt: "Nowoczesna kuchnia połączona ze strefą salonu",
  },
];

const processSteps = [
  {
    title: "Plan lub rozmowa",
    text: "Wysyłasz rzut, zdjęcia, wizualizację albo krótki opis tego, czego potrzebujesz.",
  },
  {
    title: "Wstępna analiza",
    text: "Sprawdzamy układ, skalę projektu, oczekiwane materiały i zakres prac.",
  },
  {
    title: "Wycena",
    text: "Przygotowujemy orientacyjną lub bardziej szczegółową propozycję na podstawie dostępnych danych.",
  },
  {
    title: "Salon i próbki",
    text: "W salonie w Legionowie można omówić projekt, zobaczyć materiały i doprecyzować kierunek.",
  },
  {
    title: "Pomiar i technika",
    text: "Po decyzji przechodzimy do dokładnych wymiarów, detali konstrukcyjnych i finalnej konfiguracji.",
  },
  {
    title: "Produkcja i montaż",
    text: "Realizujemy zamówienie, dostarczamy meble i montujemy zabudowę na miejscu.",
  },
] as const;

const architectBullets = [
  "analiza projektu i wizualizacji",
  "dobór materiałów oraz rozwiązań technicznych",
  "wycena na podstawie dokumentacji",
  "produkcja, dostawa i montaż",
] as const;

const faqItems = [
  {
    question: "Czy KOLSS Polska pracuje w Warszawie?",
    answer:
      "Tak. Obsługujemy Warszawę i okolice, a salon KOLSS Polska znajduje się w Legionowie.",
  },
  {
    question: "Czy mogę wysłać gotowy projekt od architekta?",
    answer:
      "Tak. Możesz wysłać wizualizacje, rysunki techniczne, rzut mieszkania albo listę założeń. Na tej podstawie przygotujemy wstępną analizę i dalsze pytania do wyceny.",
  },
  {
    question: "Czy można zacząć bez gotowego projektu?",
    answer:
      "Tak. Wystarczą zdjęcia, podstawowe wymiary, inspiracje i opis potrzeb. Pomożemy ustalić, jakie dane są potrzebne do kolejnego kroku.",
  },
  {
    question: "Co wpływa na cenę kuchni na wymiar?",
    answer:
      "Na cenę wpływają wymiary, układ, fronty, korpusy, blat, okucia, wewnętrzne wyposażenie, sprzęt AGD, zakres montażu i stopień indywidualizacji projektu.",
  },
  {
    question: "Czy wykonujecie tylko kuchnie?",
    answer:
      "Nie. Oprócz kuchni możemy projektować i wykonywać szafy, garderoby, zabudowy dzienne, meble łazienkowe i utility w spójnym języku materiałów.",
  },
  {
    question: "Jak umówić wizytę w salonie?",
    answer:
      "Najprościej zadzwonić, napisać na biuro@kolss.eu albo wysłać formularz z krótkim opisem projektu. Jeśli masz plan lub wizualizację, dołącz je od razu.",
  },
] as const;

const projectTypes = [
  "Kuchnia",
  "Kuchnia + salon",
  "Szafy / garderoby",
  "Łazienka / utility",
  "Kilka zabudów w mieszkaniu",
  "Projekt od architekta",
] as const;

const contactDetails = [
  {
    label: "Telefon",
    value: contact.phone,
    href: contact.phoneHref,
  },
  {
    label: "E-mail",
    value: contact.email,
    href: contact.emailHref,
  },
  {
    label: "Adres",
    value: `${contact.streetAddress}, ${contact.postalCode} ${contact.city}`,
  },
  {
    label: "Projektant",
    value: contact.designer,
  },
  {
    label: "Telefon projektanta",
    value: contact.designerPhone,
    href: contact.designerPhoneHref,
  },
  {
    label: "E-mail projektanta",
    value: contact.designerEmail,
    href: contact.designerEmailHref,
  },
] as const;

const organizationId = `${absoluteUrl()}#organization`;
const localBusinessId = `${absoluteUrl()}#local-business`;
const websiteId = `${absoluteUrl()}#website`;
const webpageId = `${absoluteUrl()}#webpage`;
const faqId = `${absoluteUrl()}#faq`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: contact.company,
      url: absoluteUrl(),
      telephone: contact.phone,
      email: contact.email,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: contact.phone,
          email: contact.email,
          contactType: "customer service",
          areaServed: "PL",
          availableLanguage: ["pl"],
        },
        {
          "@type": "ContactPoint",
          telephone: contact.designerPhone,
          email: contact.designerEmail,
          contactType: "project consultation",
          areaServed: "PL",
          availableLanguage: ["pl"],
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": localBusinessId,
      name: contact.company,
      url: absoluteUrl(),
      telephone: contact.phone,
      email: contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.streetAddress,
        postalCode: contact.postalCode,
        addressLocality: contact.city,
        addressCountry: "PL",
      },
      areaServed: ["Warszawa", "Legionowo", "okolice Warszawy"],
      parentOrganization: {
        "@id": organizationId,
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.name,
      url: absoluteUrl(),
      inLanguage: siteConfig.language,
      publisher: {
        "@id": organizationId,
      },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      name: siteConfig.title,
      url: absoluteUrl(),
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": localBusinessId,
      },
    },
    {
      "@type": "FAQPage",
      "@id": faqId,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
      isPartOf: {
        "@id": webpageId,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen bg-background">
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-background"
        >
          Przejdź do treści
        </Link>

        <SiteHeader
          navigation={mainNavigation}
          quoteHref="#kontakt"
          salonHref="#salon"
        />

        <main id="main-content">
          <section
            id="start"
            aria-labelledby="hero-title"
            className="home-hero relative isolate overflow-hidden border-b border-white/20 bg-black text-white"
          >
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-image object-cover"
            />
            <div className="hero-readability-layer" aria-hidden="true" />

            <div className="relative z-10 mx-auto flex min-h-[var(--hero-min-height)] w-full max-w-[1440px] items-center px-5 py-[clamp(6.5rem,13svh,8rem)] sm:px-8 lg:px-20">
              <div className="max-w-[660px]">
                <p className="mb-5 text-[13px] font-semibold uppercase leading-[1.25] text-white/90 sm:text-base">
                  Kuchnie i zabudowy na wymiar | Warszawa i okolice
                </p>
                <h1
                  id="hero-title"
                  className="hero-title max-w-full text-[34px] font-semibold leading-[1.02] text-white min-[420px]:text-[38px] sm:max-w-[680px] sm:text-[56px] lg:text-[66px]"
                >
                  Kuchnie i zabudowy na wymiar z naturalnym charakterem
                </h1>
                <p className="mt-6 max-w-full text-[14px] leading-[1.55] text-white/88 sm:max-w-[610px] sm:text-base">
                  Projektujemy i wykonujemy kuchnie oraz zabudowy dopasowane do
                  wnętrza, stylu życia i budżetu. Pracujemy z gotowymi
                  projektami architektów albo zaczynamy od planu, zdjęć i
                  rozmowy o potrzebach. Od pierwszej wyceny do montażu
                  prowadzimy proces w jednym, czytelnym rytmie.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="#kontakt" className="hero-cta hero-cta-primary">
                    Otrzymaj wstępną wycenę
                  </Link>
                  <Link href="#salon" className="hero-cta hero-cta-secondary">
                    Umów wizytę w salonie
                  </Link>
                </div>

                <p className="mt-7 max-w-[620px] text-[12px] font-semibold uppercase leading-[1.45] text-white/72 sm:text-[13px]">
                  KOLSS od 1995 roku | Salon w Legionowie | Warszawa i okolice
                  | Projekt, produkcja, montaż
                </p>
              </div>
            </div>
          </section>

          <section
            aria-label="Najważniejsze informacje o KOLSS Polska"
            className="border-b border-border bg-surface"
          >
            <div className="mx-auto grid w-full max-w-[1440px] divide-y divide-border px-5 sm:px-8 md:grid-cols-4 md:divide-x md:divide-y-0 lg:px-10">
              {trustItems.map((item) => (
                <article key={item.title} className="py-6 md:px-6 lg:py-7">
                  <h2 className="text-[13px] font-bold uppercase leading-none text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-[1.45] text-muted">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="oferta"
            aria-labelledby="offer-title"
            className="border-b border-border"
          >
            <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
              <div className="max-w-[820px]">
                <p className="section-kicker">Oferta</p>
                <h2 id="offer-title" className="section-title">
                  Co możemy zaprojektować i wykonać
                </h2>
                <p className="mt-6 max-w-[760px] text-[15px] leading-[1.55] text-foreground sm:text-base">
                  KOLSS Polska pomaga zaplanować pojedynczą kuchnię albo kilka
                  zabudów w jednym mieszkaniu. Najważniejsze decyzje podejmujemy
                  na podstawie układu wnętrza, sposobu użytkowania i materiałów,
                  które mają pracować przez lata.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {offerItems.map((item) => (
                  <article
                    key={item.title}
                    className="overflow-hidden rounded-lg border border-border bg-surface"
                  >
                    <div className="relative aspect-[4/3] bg-muted-surface">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.48] text-muted">
                        {item.text}
                      </p>
                      {item.cta ? (
                        <Link
                          href="#kontakt"
                          className="mt-6 inline-flex text-[13px] font-bold uppercase leading-none text-accent transition hover:text-foreground"
                        >
                          {item.cta}
                        </Link>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="materialy"
            aria-labelledby="materials-title"
            className="border-b border-border bg-foreground text-background"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.52fr_0.48fr] lg:px-10 lg:py-20">
              <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-black/20 lg:min-h-[620px]">
                <Image
                  src={someKitchenImage}
                  alt="Nowoczesna kuchnia z białymi frontami, drewnem i kamiennym rysunkiem blatu"
                  fill
                  sizes="(max-width: 1023px) 100vw, 52vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="section-kicker text-background/70">Materiały</p>
                <h2
                  id="materials-title"
                  className="section-title text-background"
                >
                  Premium, który widać w dotyku i detalach
                </h2>
                <p className="mt-6 text-[15px] leading-[1.6] text-background/82 sm:text-base">
                  Najlepsze kuchnie nie są tylko drewniane albo nowoczesne.
                  Dobrze działają wtedy, gdy materiały tworzą spójną całość:
                  fornir lub drewno daje wnętrzu ciepło, lakier porządkuje
                  formę, kamień albo blat kompaktowy buduje trwałą powierzchnię
                  roboczą, a okucia odpowiadają za codzienny komfort.
                </p>

                <ul className="mt-8 grid gap-4">
                  {materialBullets.map((item) => (
                    <li
                      key={item}
                      className="border-t border-background/20 pt-4 text-[15px] leading-[1.5] text-background/82"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#kontakt"
                  className="hero-cta hero-cta-primary mt-9 w-full sm:w-fit"
                >
                  Porozmawiaj o materiałach
                </Link>
              </div>
            </div>
          </section>

          <HomeCatalog />

          <section
            id="realizacje"
            aria-labelledby="proof-title"
            className="border-b border-border"
          >
            <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
              <div className="max-w-[860px]">
                <p className="section-kicker">Realizacje</p>
                <h2 id="proof-title" className="section-title">
                  Przykłady rozwiązań, które pokazują kierunek pracy
                </h2>
                <p className="mt-6 max-w-[760px] text-[15px] leading-[1.55] text-foreground sm:text-base">
                  Na stronie głównej pokazujemy wybrane kierunki estetyczne i
                  funkcjonalne. Pełne studia przypadków warto dodać dopiero
                  wtedy, gdy mamy potwierdzone zdjęcia, opis zadania, materiały
                  i zakres realizacji.
                </p>
              </div>

              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {proofItems.map((item) => (
                  <article
                    key={item.title}
                    className="overflow-hidden rounded-lg border border-border bg-surface"
                  >
                    <div className="relative aspect-[16/11] bg-muted-surface">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        sizes="(max-width: 1023px) 100vw, 33vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.45] text-muted">
                        {item.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="proces"
            aria-labelledby="process-title"
            className="border-b border-border bg-surface"
          >
            <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
              <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
                <div>
                  <p className="section-kicker">Proces</p>
                  <h2 id="process-title" className="section-title">
                    Jak wygląda współpraca od pierwszego planu do montażu
                  </h2>
                </div>
                <div>
                  <p className="text-[15px] leading-[1.6] text-foreground sm:text-base">
                    Najlepszy efekt powstaje wtedy, gdy estetyka, technika i
                    budżet są prowadzone razem. Dlatego zaczynamy od analizy
                    danych wejściowych, a dopiero potem przechodzimy do wyceny,
                    pomiaru i produkcji.
                  </p>
                  <Link
                    href="#kontakt"
                    className="mt-7 inline-flex text-[13px] font-bold uppercase leading-none text-accent transition hover:text-foreground"
                  >
                    Wyślij plan do wstępnej analizy
                  </Link>
                </div>
              </div>

              <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-6">
                {processSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="border-t border-border pt-5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.45] text-muted">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            id="salon"
            aria-labelledby="salon-title"
            className="border-b border-border"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.5fr_0.5fr] lg:px-10 lg:py-20">
              <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-muted-surface lg:min-h-[560px]">
                <Image
                  src={heroImage}
                  alt="Ciepła kuchnia na wymiar z zabudową i strefą dzienną"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="section-kicker">Salon</p>
                <h2 id="salon-title" className="section-title">
                  Spotkajmy się w salonie KOLSS w Legionowie
                </h2>
                <p className="mt-6 text-[15px] leading-[1.6] text-foreground sm:text-base">
                  Salon w Legionowie to miejsce, w którym można porozmawiać o
                  projekcie, obejrzeć wybrane rozwiązania i przejść przez
                  materiały z projektantem. Jeśli masz już plan, wizualizację
                  albo projekt od architekta, zabierz go ze sobą albo wyślij
                  wcześniej do analizy.
                </p>

                <address className="mt-8 not-italic">
                  <p className="text-base font-semibold">{contact.company}</p>
                  <p className="mt-2 text-[15px] leading-[1.5] text-muted">
                    {contact.streetAddress}, {contact.postalCode} {contact.city}
                  </p>
                  <div className="mt-5 grid gap-2 text-[15px] leading-[1.5]">
                    <a
                      href={contact.phoneHref}
                      className="text-foreground transition hover:text-accent"
                    >
                      {contact.phone}
                    </a>
                    <a
                      href={contact.emailHref}
                      className="text-foreground transition hover:text-accent"
                    >
                      {contact.email}
                    </a>
                    <p className="pt-3 text-muted">
                      Projektant: {contact.designer}
                    </p>
                    <a
                      href={contact.designerPhoneHref}
                      className="text-foreground transition hover:text-accent"
                    >
                      {contact.designerPhone}
                    </a>
                    <a
                      href={contact.designerEmailHref}
                      className="text-foreground transition hover:text-accent"
                    >
                      {contact.designerEmail}
                    </a>
                  </div>
                </address>

                <Link
                  href="#kontakt"
                  className="hero-cta hero-cta-primary mt-9 w-full sm:w-fit"
                >
                  Umów wizytę w salonie
                </Link>
              </div>
            </div>
          </section>

          <section
            id="dla-architektow"
            aria-labelledby="architects-title"
            className="border-b border-border bg-surface"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.45fr_0.55fr] lg:px-10 lg:py-20">
              <div>
                <p className="section-kicker">Dla architektów</p>
                <h2 id="architects-title" className="section-title">
                  Współpracujemy z projektantami i architektami wnętrz
                </h2>
                <p className="mt-6 text-[15px] leading-[1.6] text-foreground sm:text-base">
                  Jeśli pracujesz z gotowym projektem, możemy przeanalizować
                  dokumentację, doprecyzować rozwiązania techniczne i
                  przygotować ofertę wykonawczą. KOLSS może być partnerem dla
                  kuchni, zabudów dziennych, garderób, łazienek i innych
                  elementów stolarskich w jednym wnętrzu.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-[0.48fr_0.52fr]">
                <div className="relative min-h-[320px] overflow-hidden rounded-lg bg-muted-surface">
                  <Image
                    src={workersThreeImage}
                    alt="Praca techniczna przy elementach stolarskich i dokumentacji"
                    fill
                    sizes="(max-width: 767px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <ul className="grid gap-4">
                    {architectBullets.map((item) => (
                      <li
                        key={item}
                        className="border-t border-border pt-4 text-[15px] font-medium leading-[1.4]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#kontakt"
                    className="mt-8 inline-flex text-[13px] font-bold uppercase leading-none text-accent transition hover:text-foreground"
                  >
                    Wyślij projekt do analizy
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section
            id="faq"
            aria-labelledby="faq-title"
            className="border-b border-border"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.35fr_0.65fr] lg:px-10 lg:py-20">
              <div>
                <p className="section-kicker">FAQ</p>
                <h2 id="faq-title" className="section-title">
                  Najczęstsze pytania przed pierwszą wyceną
                </h2>
              </div>

              <dl className="grid gap-4">
                {faqItems.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-lg border border-border bg-surface p-5"
                  >
                    <dt className="text-lg font-semibold leading-tight">
                      {item.question}
                    </dt>
                    <dd className="mt-4 text-[15px] leading-[1.5] text-muted">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section
            id="kontakt"
            aria-labelledby="contact-title"
            className="border-b border-border bg-foreground text-background"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.42fr_0.58fr] lg:px-10 lg:py-20">
              <div>
                <p className="section-kicker text-background/70">Kontakt</p>
                <h2
                  id="contact-title"
                  className="section-title text-background"
                >
                  Wyślij plan, zdjęcia albo projekt do wstępnej analizy
                </h2>
                <p className="mt-6 text-[15px] leading-[1.6] text-background/80 sm:text-base">
                  Im więcej danych wyślesz na początku, tym szybciej możemy
                  przygotować sensowną odpowiedź: rzut, wymiary, zdjęcia
                  wnętrza, inspiracje, lista sprzętu AGD albo projekt od
                  architekta.
                </p>

                <address className="mt-8 not-italic">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {contactDetails.map((item) => (
                      <div
                        key={item.label}
                        className="border-t border-background/20 pt-4"
                      >
                        <dt className="text-xs font-semibold uppercase text-background/58">
                          {item.label}
                        </dt>
                        <dd className="mt-2 text-[15px] leading-[1.4]">
                          {"href" in item && item.href ? (
                            <a
                              href={item.href}
                              className="transition hover:text-background/70"
                            >
                              {item.value}
                            </a>
                          ) : (
                            item.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </address>
              </div>

              <form
                action={contact.emailHref}
                method="post"
                encType="text/plain"
                className="grid gap-5 rounded-lg border border-background/18 bg-background p-5 text-foreground sm:p-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold">
                    Imię i nazwisko
                    <input
                      name="Imię i nazwisko"
                      type="text"
                      autoComplete="name"
                      required
                      className="min-h-12 rounded-md border border-border bg-surface px-3 text-base font-normal outline-none transition focus:border-foreground"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    Telefon
                    <input
                      name="Telefon"
                      type="tel"
                      autoComplete="tel"
                      className="min-h-12 rounded-md border border-border bg-surface px-3 text-base font-normal outline-none transition focus:border-foreground"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold">
                    E-mail
                    <input
                      name="E-mail"
                      type="email"
                      autoComplete="email"
                      required
                      className="min-h-12 rounded-md border border-border bg-surface px-3 text-base font-normal outline-none transition focus:border-foreground"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    Miasto / lokalizacja inwestycji
                    <input
                      name="Miasto / lokalizacja inwestycji"
                      type="text"
                      autoComplete="address-level2"
                      className="min-h-12 rounded-md border border-border bg-surface px-3 text-base font-normal outline-none transition focus:border-foreground"
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-semibold">
                  Jakiego zakresu dotyczy projekt?
                  <select
                    name="Zakres projektu"
                    defaultValue=""
                    className="min-h-12 rounded-md border border-border bg-surface px-3 text-base font-normal outline-none transition focus:border-foreground"
                  >
                    <option value="" disabled>
                      Wybierz zakres
                    </option>
                    {projectTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-semibold">
                  Opis projektu
                  <textarea
                    name="Opis projektu"
                    rows={5}
                    className="rounded-md border border-border bg-surface px-3 py-3 text-base font-normal outline-none transition focus:border-foreground"
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold">
                  Dodaj plik
                  <span className="flex min-h-14 cursor-pointer flex-col justify-center rounded-md border border-dashed border-border bg-surface px-3 py-3 text-sm font-normal transition hover:border-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="inline-flex w-fit rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background">
                      Wybierz pliki
                    </span>
                    <span className="mt-2 text-muted sm:mt-0">
                      Rzut, wizualizacja albo zdjęcia
                    </span>
                  </span>
                  <input name="Pliki" type="file" multiple className="sr-only" />
                </label>

                <button
                  type="submit"
                  className="hero-cta w-full border border-foreground bg-foreground text-background"
                >
                  Wyślij do wstępnej analizy
                </button>
                <p className="text-sm leading-[1.45] text-muted">
                  Odpowiemy w godzinach pracy. Przesłanie projektu nie
                  zobowiązuje do zamówienia.
                </p>
              </form>
            </div>
          </section>
        </main>

        <footer className="bg-background text-foreground">
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.4fr_0.6fr] lg:px-10">
            <div>
              <p className="text-base font-semibold uppercase">
                KOLSS Polska
              </p>
              <p className="mt-3 max-w-sm text-sm leading-[1.5] text-muted">
                Kuchnie i zabudowy na wymiar dla Warszawy i okolic. Salon w
                Legionowie, projekt, produkcja, dostawa i montaż.
              </p>
            </div>

            <nav aria-label="Nawigacja w stopce">
              <ul className="grid gap-3 text-sm text-muted sm:grid-cols-2 lg:grid-cols-4">
                {mainNavigation.slice(1).map((item) => (
                  <li key={`footer-${item.href}`}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
