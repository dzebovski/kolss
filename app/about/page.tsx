import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBike,
  IconBuildingStore,
  IconCheck,
  IconClipboardCheck,
  IconHammer,
  IconMapPin,
  IconPencil,
  IconRulerMeasure2,
  IconShieldCheck,
  IconToolsKitchen2,
  IconUsersGroup,
} from "@tabler/icons-react";

import { ContactSection } from "@/app/_components/home/ContactSection";
import { SiteFooter } from "@/app/_components/home/SiteFooter";
import { SiteHeader } from "@/app/_components/site-header";
import { contact } from "@/app/_content/home";
import { headerNavigation } from "@/lib/site";
import heroImage from "@/assets/images/workers-2.dektop.jpg";
import officeImage from "@/assets/images/home/hero.desktop.jpg";
import productionImage from "@/assets/images/workers-4.dektop.jpg";
import teamImage from "@/assets/images/workers-1.dektop.jpg";
import detailImage from "@/assets/images/workers-3.dektop.jpg";
import cyclingTeamImage from "@/assets/images/kolss-cycling-team.png";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Poznaj KOLSS Polska: salon w Legionowie, zaplecze produkcyjne, zespół i historię marki KOLSS, która od 1995 roku tworzy meble na wymiar.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "O nas | KOLSS Polska",
    description:
      "Historia, salon, produkcja i zespół KOLSS Polska. Kuchnie i zabudowy na wymiar dla Warszawy, Legionowa i okolic.",
    url: "/about",
    type: "website",
  },
};

const pageNavigation = [
  { label: "Start", href: "#start" },
  { label: "Firma", href: "#firma" },
  { label: "Salon", href: "#salon" },
  { label: "Produkcja", href: "#produkcja" },
  { label: "Zespół", href: "#zespol" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

const heroStats = [
  { value: "1995", label: "początek historii marki KOLSS" },
  { value: "1", label: "proces od rozmowy do montażu" },
  { value: "mm", label: "skala, w której pracuje detal" },
] as const;

const principles = [
  {
    title: "Projekt zaczyna się od rozmowy",
    text: "Nie sprzedajemy gotowego układu. Najpierw rozumiemy rytm domu, sprzęty, przechowywanie i to, jak kuchnia ma działać w zwykły wtorek.",
    icon: IconPencil,
  },
  {
    title: "Technika jest częścią estetyki",
    text: "Piękny front nie wystarczy. Liczy się konstrukcja, prowadnice, krawędzie, ergonomia i to, czy zabudowa po latach nadal pracuje cicho.",
    icon: IconRulerMeasure2,
  },
  {
    title: "Salon i produkcja mówią jednym językiem",
    text: "Ustalenia z rozmów przekładamy na dokumentację, materiały i wykonanie. Klient nie musi łączyć oddzielnych światów samodzielnie.",
    icon: IconBuildingStore,
  },
  {
    title: "Montaż kończy projekt, nie emocje",
    text: "Dobra realizacja ma zostawić spokój: czytelne decyzje, dopięte detale i zespół, który wie, za co odpowiada.",
    icon: IconShieldCheck,
  },
] as const;

const productionSteps = [
  "Analiza projektu, wymiarów i założeń technicznych",
  "Dobór materiałów, okuć, frontów i rozwiązań wewnętrznych",
  "Przygotowanie elementów, kontrola detalu i logistyka montażu",
] as const;

const teamRoles = [
  {
    title: "Projektanci",
    text: "Prowadzą rozmowę, porządkują potrzeby i zamieniają inspiracje w układ, który da się wykonać.",
    icon: IconPencil,
  },
  {
    title: "Technolodzy",
    text: "Pilnują konstrukcji, połączeń, wymiarów i rozwiązań, których zwykle nie widać na pierwszym renderze.",
    icon: IconToolsKitchen2,
  },
  {
    title: "Produkcja i montaż",
    text: "Domykają obietnicę projektu w materiale: precyzyjnie, spokojnie i z odpowiedzialnością za detal.",
    icon: IconHammer,
  },
] as const;

export default function AboutPage() {
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
        salonHref="#salon"
      />

      <main id="main-content">
        <section
          id="start"
          aria-labelledby="about-hero-title"
          className="dark-section relative isolate overflow-hidden border-b border-kolss-warm-white/14 bg-kolss-charcoal"
        >
          <Image
            src={heroImage}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[58%_center]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,36,33,0.92)_0%,rgba(30,36,33,0.72)_34%,rgba(30,36,33,0.32)_68%,rgba(30,36,33,0.16)_100%),linear-gradient(180deg,rgba(30,36,33,0.36)_0%,rgba(30,36,33,0.06)_42%,rgba(30,36,33,0.46)_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid min-h-[720px] w-full max-w-[1440px] gap-8 px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end lg:px-20 lg:pt-32">
            <div className="max-w-[780px] self-center lg:self-end">
              <p className="mb-5 text-[13px] font-semibold uppercase leading-[1.3] text-kolss-warm-white/78 sm:text-sm">
                O KOLSS Polska
              </p>
              <h1
                id="about-hero-title"
                className="hero-title text-[38px] font-semibold leading-[1.02] text-kolss-warm-white min-[420px]:text-[44px] sm:text-[58px] lg:text-[74px]"
              >
                Meble zaczynają się od charakteru ludzi, którzy je robią
              </h1>
              <p className="mt-6 max-w-[660px] text-[15px] leading-[1.65] text-kolss-warm-white/80 sm:text-base">
                KOLSS Polska łączy salon w Legionowie, doświadczenie marki
                rozwijanej od 1995 roku i zaplecze produkcyjne, które zamienia
                szkic, próbkę materiału i rozmowę w gotową zabudowę.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#firma" className="hero-cta hero-cta-primary">
                  Poznaj nas bliżej
                  <IconArrowRight aria-hidden="true" size={18} stroke={1.8} />
                </Link>
                <Link href="#produkcja" className="hero-cta hero-cta-secondary">
                  Zobacz jak pracujemy
                </Link>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-3 border-t border-kolss-warm-white/20 pt-5 lg:mb-3 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              {heroStats.map((item) => (
                <div
                  key={item.value}
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
          aria-label="Nawigacja po stronie o KOLSS Polska"
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
          id="firma"
          aria-labelledby="company-title"
          className="border-b border-border bg-background"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.42fr_0.58fr] lg:px-10 lg:py-20">
            <div>
              <p className="section-kicker">Firma</p>
              <h2 id="company-title" className="section-title">
                Nie jesteśmy tylko producentem mebli. Jesteśmy tłumaczem między
                domem, projektem i warsztatem.
              </h2>
            </div>

            <div>
              <p className="text-[17px] leading-[1.65] text-foreground sm:text-[19px]">
                W KOLSS Polska najważniejsze jest to, żeby klient nie czuł, że
                musi znać wszystkie techniczne odpowiedzi od pierwszej rozmowy.
                Naszą pracą jest uporządkować potrzeby, nazwać ryzyka, pokazać
                materiały i przeprowadzić projekt przez decyzje, które naprawdę
                wpływają na efekt.
              </p>
              <p className="mt-5 text-[15px] leading-[1.65] text-muted sm:text-base">
                Dlatego mówimy o jednym procesie: salon, projekt, produkcja,
                dostawa i montaż są częścią tej samej odpowiedzialności. Wnętrze
                ma wyglądać dobrze, ale przede wszystkim ma działać codziennie,
                bez teatralnych gestów i bez przypadkowych kompromisów.
              </p>

              <div className="mt-9 grid gap-4 md:grid-cols-2">
                {principles.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="kolss-card h-full p-5"
                    >
                      <span className="kolss-icon-tile">
                        <Icon aria-hidden="true" size={22} stroke={1.7} />
                      </span>
                      <h3 className="mt-5 text-[19px] font-semibold leading-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-[1.55] text-muted">
                        {item.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          id="salon"
          aria-labelledby="office-title"
          className="border-b border-border bg-kolss-surface"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.52fr_0.48fr] lg:px-10 lg:py-20">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-muted-surface lg:min-h-[640px]">
              <Image
                src={officeImage}
                alt="Kuchnia KOLSS jako przykład rozmowy o materiałach w salonie"
                fill
                sizes="(max-width: 1023px) 100vw, 52vw"
                className="object-cover object-[58%_center]"
              />
              <div
                className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(30,36,33,0)_0%,rgba(30,36,33,0.72)_100%)] p-5 sm:p-7"
                aria-hidden="true"
              >
                <p className="max-w-[360px] text-[13px] font-semibold uppercase leading-[1.35] text-kolss-warm-white/82">
                  Próbki, plany, rozmowy o świetle, materiale i realnym życiu w
                  kuchni
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="section-kicker">Biuro i salon</p>
              <h2 id="office-title" className="section-title">
                Salon w Legionowie to miejsce, gdzie projekt przestaje być
                abstrakcją
              </h2>
              <p className="mt-6 text-[15px] leading-[1.65] text-muted sm:text-base">
                Tutaj można dotknąć frontów, porównać odcienie, zobaczyć jak
                pracują proporcje i spokojnie przejść przez budżet. Spotkanie w
                salonie nie jest prezentacją katalogu, tylko warsztatem decyzyjnym:
                co zostaje, co upraszczamy, co warto dopracować przed produkcją.
              </p>

              <address className="mt-8 grid gap-4 not-italic sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-kolss-surface-alt p-5">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase leading-none text-muted">
                    <IconBuildingStore
                      aria-hidden="true"
                      size={17}
                      stroke={1.7}
                      className="text-kolss-muted-green"
                    />
                    Salon
                  </p>
                  <p className="mt-3 text-[15px] font-semibold leading-[1.45] text-foreground">
                    {contact.company}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-kolss-surface-alt p-5">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase leading-none text-muted">
                    <IconMapPin
                      aria-hidden="true"
                      size={17}
                      stroke={1.7}
                      className="text-kolss-muted-green"
                    />
                    Adres
                  </p>
                  <p className="mt-3 text-[15px] font-semibold leading-[1.45] text-foreground">
                    {contact.streetAddress}, {contact.postalCode} {contact.city}
                  </p>
                </div>
              </address>

              <Link href="#kontakt" className="kolss-text-link mt-8">
                Umów rozmowę w salonie
              </Link>
            </div>
          </div>
        </section>

        <section
          id="produkcja"
          aria-labelledby="production-title"
          className="border-b border-border bg-kolss-surface-alt"
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
              <div>
                <p className="section-kicker">Produkcja</p>
                <h2 id="production-title" className="section-title">
                  Tam, gdzie decyzja o uchwycie spotyka się z tolerancją
                  milimetra
                </h2>
              </div>
              <div className="lg:pt-12">
                <p className="text-[15px] leading-[1.65] text-muted sm:text-base">
                  Produkcja jest dla nas naturalnym przedłużeniem projektu.
                  Dokumentacja, materiał i detal muszą przejść przez ten sam
                  filtr: czy rozwiązanie będzie estetyczne, trwałe i wygodne w
                  codziennym użytkowaniu.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
              <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-kolss-charcoal lg:min-h-[620px]">
                <Image
                  src={productionImage}
                  alt="Praca przy produkcji mebli KOLSS"
                  fill
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>

              <div className="grid gap-5">
                <div className="relative min-h-[260px] overflow-hidden rounded-lg bg-muted-surface">
                  <Image
                    src={detailImage}
                    alt="Detal procesu produkcji mebli na wymiar"
                    fill
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>

                <div className="rounded-lg border border-border bg-kolss-surface p-6 shadow-[var(--shadow-soft)]">
                  <div className="flex items-start gap-4">
                    <span className="kolss-icon-tile shrink-0">
                      <IconClipboardCheck
                        aria-hidden="true"
                        size={22}
                        stroke={1.7}
                      />
                    </span>
                    <div>
                      <h3 className="text-[22px] font-semibold leading-tight text-foreground">
                        Kontrola nie jest ostatnim etapem. Jest sposobem pracy.
                      </h3>
                      <ul className="mt-5 grid gap-3">
                        {productionSteps.map((step) => (
                          <li
                            key={step}
                            className="flex gap-3 text-sm leading-[1.55] text-muted"
                          >
                            <IconCheck
                              aria-hidden="true"
                              size={18}
                              stroke={2}
                              className="mt-0.5 shrink-0 text-kolss-muted-green"
                            />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="zespol"
          aria-labelledby="team-title"
          className="border-b border-border bg-background"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.45fr_0.55fr] lg:px-10 lg:py-20">
            <div className="flex flex-col justify-center">
              <p className="section-kicker">Zespół</p>
              <h2 id="team-title" className="section-title">
                Jedna realizacja, wiele par rąk i jedna odpowiedzialność
              </h2>
              <p className="mt-6 text-[15px] leading-[1.65] text-muted sm:text-base">
                Najlepsze projekty nie powstają w ciszy jednego biurka. Powstają
                wtedy, gdy projektant, technolog, produkcja i montaż rozumieją
                ten sam cel: doprowadzić wnętrze do efektu, który jest piękny,
                logiczny i gotowy na codzienne używanie.
              </p>

              <div className="mt-8 grid gap-4">
                {teamRoles.map((role) => {
                  const Icon = role.icon;

                  return (
                    <article
                      key={role.title}
                      className="rounded-lg border border-border bg-kolss-surface p-5"
                    >
                      <div className="flex gap-4">
                        <span className="kolss-icon-tile shrink-0">
                          <Icon aria-hidden="true" size={21} stroke={1.7} />
                        </span>
                        <div>
                          <h3 className="text-[18px] font-semibold leading-tight text-foreground">
                            {role.title}
                          </h3>
                          <p className="mt-2 text-sm leading-[1.55] text-muted">
                            {role.text}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-muted-surface lg:min-h-[700px]">
              <Image
                src={teamImage}
                alt="Zespół KOLSS podczas pracy nad elementami mebli"
                fill
                sizes="(max-width: 1023px) 100vw, 55vw"
                className="object-cover object-[54%_center]"
              />
              <div className="absolute left-5 top-5 rounded-lg border border-kolss-warm-white/18 bg-kolss-charcoal/72 px-4 py-3 text-kolss-warm-white backdrop-blur-md sm:left-7 sm:top-7">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase leading-none text-kolss-warm-white/70">
                  <IconUsersGroup
                    aria-hidden="true"
                    size={17}
                    stroke={1.7}
                    className="text-kolss-lime"
                  />
                  Zespół
                </p>
                <p className="mt-2 max-w-[220px] text-sm font-semibold leading-[1.35]">
                  Projekt, technologia, produkcja i montaż w jednym rytmie.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="cycling-title"
          className="dark-section overflow-hidden border-b border-kolss-warm-white/14"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.54fr_0.46fr] lg:px-10 lg:py-20">
            <div className="flex flex-col justify-center">
              <p className="section-kicker text-background/70">KOLSS Team</p>
              <h2 id="cycling-title" className="section-title text-background">
                Był też rozdział kolarski. I on świetnie tłumaczy naszą pracę.
              </h2>
              <p className="mt-6 text-[15px] leading-[1.7] text-background/78 sm:text-base">
                Przez pewien czas pod marką KOLSS jeździła również drużyna
                kolarska. To detal z historii, który nie jest przypadkowy:
                rower uczy dyscypliny, powtarzalności, pracy zespołowej i tego,
                że wynik robią setki małych decyzji podjętych we właściwym
                momencie.
              </p>
              <p className="mt-5 text-[15px] leading-[1.7] text-background/78 sm:text-base">
                W kuchniach działa podobna logika. Najpierw strategia, potem
                tempo, kontrola detalu i wspólny finisz: wnętrze, które wygląda
                lekko, choć za nim stoi bardzo precyzyjna praca.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["Dyscyplina", "Technika", "Zespół"].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-kolss-warm-white/14 bg-kolss-warm-white/6 p-4"
                  >
                    <p className="text-xs font-semibold uppercase leading-none text-kolss-lime">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="self-center rounded-lg border border-kolss-warm-white/14 bg-kolss-warm-white p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-kolss-charcoal/10 pb-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase leading-none text-kolss-charcoal/70">
                  <IconBike
                    aria-hidden="true"
                    size={18}
                    stroke={1.8}
                    className="text-kolss-muted-green"
                  />
                  Archiwum marki
                </p>
                <span className="rounded-lg bg-kolss-lime px-3 py-2 text-xs font-semibold uppercase leading-none text-kolss-charcoal">
                  KOLSS
                </span>
              </div>
              <Image
                src={cyclingTeamImage}
                alt="Dawna drużyna kolarska KOLSS"
                sizes="(max-width: 1023px) 100vw, 46vw"
                className="mt-5 h-auto w-full"
              />
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
