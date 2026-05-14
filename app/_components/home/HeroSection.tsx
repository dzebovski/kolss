import Image from "next/image";
import Link from "next/link";

import { homeImages } from "@/app/_content/home";

export function HeroSection() {
  return (
    <section
      id="start"
      aria-labelledby="hero-title"
      className="home-hero dark-section relative isolate overflow-hidden border-b border-kolss-charcoal bg-kolss-charcoal text-kolss-warm-white"
    >
      <Image
        src={homeImages.hero}
        alt=""
        fill
        preload
        sizes="100vw"
        className="hero-image object-cover"
      />
      <div className="hero-readability-layer" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[var(--hero-min-height)] w-full max-w-[1440px] items-center px-5 py-[clamp(6.5rem,13svh,8rem)] sm:px-8 lg:px-20">
        <div className="max-w-[660px]">
          <p className="mb-5 text-[13px] font-semibold uppercase leading-[1.25] text-kolss-warm-white/82 sm:text-base">
            Kuchnie i zabudowy na wymiar | Warszawa i okolice
          </p>
          <h1
            id="hero-title"
            className="hero-title max-w-full text-[34px] font-semibold leading-[1.02] text-kolss-warm-white min-[420px]:text-[38px] sm:max-w-[680px] sm:text-[56px] lg:text-[66px]"
          >
            Kuchnie i zabudowy na wymiar z naturalnym charakterem
          </h1>
          <p className="mt-6 max-w-full text-[14px] leading-[1.6] text-kolss-warm-white/78 sm:max-w-[610px] sm:text-base">
            Projektujemy i wykonujemy kuchnie oraz zabudowy dopasowane do
            wnętrza, stylu życia i budżetu. Pracujemy z gotowymi projektami
            architektów albo zaczynamy od planu, zdjęć i rozmowy o potrzebach.
            Od pierwszej wyceny do montażu prowadzimy proces w jednym, czytelnym
            rytmie.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#kontakt" className="hero-cta hero-cta-primary">
              Otrzymaj wstępną wycenę
            </Link>
            <Link href="#salon" className="hero-cta hero-cta-secondary">
              Umów wizytę w salonie
            </Link>
          </div>

          <p className="mt-7 max-w-[620px] text-[12px] font-semibold uppercase leading-[1.45] text-kolss-warm-white/62 sm:text-[13px]">
            KOLSS od 1995 roku | Salon w Legionowie | Warszawa i okolice |
            Projekt, produkcja, montaż
          </p>
        </div>
      </div>
    </section>
  );
}
