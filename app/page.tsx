import Image from "next/image";
import Link from "next/link";
import { HomeCatalog } from "@/app/_components/home-catalog";
import { SiteHeader } from "@/app/_components/site-header";
import heroImage from "@/assets/images/home/hero.desktop.jpg";
import { absoluteUrl, mainNavigation, siteConfig } from "@/lib/site";

const offerItems = ["Obszar oferty", "Obszar oferty", "Obszar oferty"];
const articleItems = ["Artykuł ekspercki", "Poradnik", "Aktualność"];
const faqItems = ["Pytanie klienta", "Pytanie ofertowe", "Pytanie techniczne"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl()}#organization`,
      name: siteConfig.name,
      url: absoluteUrl(),
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl()}#website`,
      name: siteConfig.name,
      url: absoluteUrl(),
      inLanguage: siteConfig.language,
      publisher: {
        "@id": `${absoluteUrl()}#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl()}#webpage`,
      name: siteConfig.name,
      url: absoluteUrl(),
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      isPartOf: {
        "@id": `${absoluteUrl()}#website`,
      },
      about: {
        "@id": `${absoluteUrl()}#organization`,
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
          showroomHref="#showroom"
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
              <div className="max-w-[620px]">
                <p className="mb-6 text-[13px] font-medium uppercase leading-none text-white/90 sm:text-base">
                  Kuchnie na zamówienie
                </p>
                <h1
                  id="hero-title"
                  className="hero-title max-w-[650px] text-[42px] font-bold uppercase leading-[0.92] text-white sm:text-[58px] lg:text-[64px]"
                >
                  Kuchnia stworzona
                  <br />
                  dla Ciebie
                </h1>
                <p className="mt-6 max-w-[560px] text-[15px] leading-[1.45] text-white/88 sm:text-base">
                  Projektujemy, doradzamy i tworzymy nowoczesne kuchnie na
                  wymiar. Bez względu na to, czy masz gotowy projekt, czy
                  dopiero szukasz pomysłu - pomożemy Ci od początku do finalnego
                  efektu.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="#kontakt" className="hero-cta hero-cta-primary">
                    Otrzymaj wycenę
                  </Link>
                  <Link
                    href="#showroom"
                    className="hero-cta hero-cta-secondary"
                  >
                    Umów wizytę w showroomie
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section
            id="oferta"
            aria-labelledby="offer-title"
            className="border-b border-border"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.38fr_0.62fr] lg:px-10 lg:py-20">
              <div>
                <p className="section-kicker">Oferta</p>
                <h2 id="offer-title" className="section-title">
                  Struktura oferty
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {offerItems.map((item, index) => (
                  <article
                    key={`${item}-${index}`}
                    className="rounded-lg border border-border bg-surface p-5"
                    aria-labelledby={`offer-item-${index + 1}`}
                  >
                    <h3
                      id={`offer-item-${index + 1}`}
                      className="text-lg font-semibold"
                    >
                      {item}
                    </h3>
                    <div className="mt-6 grid gap-3" aria-hidden="true">
                      <span className="h-3 rounded-full bg-muted-surface" />
                      <span className="h-3 w-5/6 rounded-full bg-muted-surface" />
                      <span className="h-3 w-2/3 rounded-full bg-muted-surface" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="o-firmie"
            aria-labelledby="company-title"
            className="border-b border-border bg-surface"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.62fr_0.38fr] lg:px-10 lg:py-20">
              <article aria-labelledby="company-title">
                <p className="section-kicker">O firmie</p>
                <h2 id="company-title" className="section-title">
                  Informacje o marce
                </h2>
                <div className="mt-8 grid gap-3" aria-hidden="true">
                  <span className="h-3 rounded-full bg-muted-surface-strong" />
                  <span className="h-3 w-11/12 rounded-full bg-muted-surface-strong" />
                  <span className="h-3 w-9/12 rounded-full bg-muted-surface-strong" />
                </div>
              </article>

              <aside
                className="rounded-lg border border-border bg-background p-5"
                aria-labelledby="company-aside-title"
              >
                <h3 id="company-aside-title" className="text-lg font-semibold">
                  Dane pomocnicze
                </h3>
                <ul className="mt-5 grid gap-3 text-sm text-muted">
                  <li className="border-t border-border pt-3">Zakres działania</li>
                  <li className="border-t border-border pt-3">Standard obsługi</li>
                  <li className="border-t border-border pt-3">Obszary kompetencji</li>
                </ul>
              </aside>
            </div>
          </section>

          <section
            id="realizacje"
            aria-labelledby="case-title"
            className="border-b border-border"
          >
            <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
              <div className="max-w-2xl">
                <p className="section-kicker">Realizacje</p>
                <h2 id="case-title" className="section-title">
                  Realizacje
                </h2>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <article
                    key={item}
                    className="rounded-lg border border-border bg-surface p-5"
                    aria-labelledby={`case-${item}`}
                  >
                    <h3 id={`case-${item}`} className="text-lg font-semibold">
                      Studium przypadku
                    </h3>
                    <div
                      className="mt-6 aspect-[16/10] rounded-md bg-muted-surface"
                      aria-hidden="true"
                    />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <HomeCatalog />

          <section
            id="wiedza"
            aria-labelledby="knowledge-title"
            className="border-b border-border"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.35fr_0.65fr] lg:px-10 lg:py-20">
              <div>
                <p className="section-kicker">Wiedza</p>
                <h2 id="knowledge-title" className="section-title">
                  Baza wiedzy
                </h2>
              </div>

              <div className="grid gap-4">
                {articleItems.map((item, index) => (
                  <article
                    key={item}
                    className="grid gap-4 rounded-lg border border-border bg-surface p-5 sm:grid-cols-[0.26fr_0.74fr]"
                    aria-labelledby={`article-${index + 1}`}
                  >
                    <div
                      className="aspect-[4/3] rounded-md bg-muted-surface"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-accent">
                        Kategoria
                      </p>
                      <h3
                        id={`article-${index + 1}`}
                        className="mt-2 text-lg font-semibold"
                      >
                        {item}
                      </h3>
                      <div className="mt-5 grid gap-3" aria-hidden="true">
                        <span className="h-3 rounded-full bg-muted-surface" />
                        <span className="h-3 w-4/5 rounded-full bg-muted-surface" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="faq"
            aria-labelledby="faq-title"
            className="border-b border-border bg-surface"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.35fr_0.65fr] lg:px-10 lg:py-20">
              <div>
                <p className="section-kicker">FAQ</p>
                <h2 id="faq-title" className="section-title">
                  Pytania i odpowiedzi
                </h2>
              </div>

              <dl className="grid gap-4">
                {faqItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-border bg-background p-5"
                  >
                    <dt className="text-lg font-semibold">{item}</dt>
                    <dd className="mt-5 grid gap-3" aria-hidden="true">
                      <span className="h-3 rounded-full bg-muted-surface" />
                      <span className="h-3 w-4/5 rounded-full bg-muted-surface" />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <div
            id="showroom"
            className="block h-px scroll-mt-24"
            aria-hidden="true"
          />

          <section
            id="kontakt"
            aria-labelledby="contact-title"
            className="border-b border-border"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.45fr_0.55fr] lg:px-10 lg:py-20">
              <div>
                <p className="section-kicker">Kontakt</p>
                <h2 id="contact-title" className="section-title">
                  Dane kontaktowe
                </h2>
              </div>

              <address className="not-italic">
                <dl className="grid gap-4 sm:grid-cols-3">
                  {["Telefon", "E-mail", "Adres"].map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-border bg-surface p-5"
                    >
                      <dt className="text-sm font-medium text-muted">{item}</dt>
                      <dd
                        className="mt-4 h-3 rounded-full bg-muted-surface"
                        aria-hidden="true"
                      />
                    </div>
                  ))}
                </dl>
              </address>
            </div>
          </section>
        </main>

        <footer className="bg-foreground text-background">
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.4fr_0.6fr] lg:px-10">
            <div>
              <p className="text-base font-semibold uppercase">
                Kolss Polska
              </p>
              <div className="mt-4 grid max-w-sm gap-3" aria-hidden="true">
                <span className="h-3 rounded-full bg-background/25" />
                <span className="h-3 w-3/4 rounded-full bg-background/25" />
              </div>
            </div>

            <nav aria-label="Nawigacja w stopce">
              <ul className="grid gap-3 text-sm text-background/75 sm:grid-cols-2 lg:grid-cols-3">
                {mainNavigation.slice(1).map((item) => (
                  <li key={`footer-${item.href}`}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-background"
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
