import Image from "next/image";
import Link from "next/link";

import {
  homeImages,
  materialBullets,
  materialSwatches,
} from "@/app/_content/home";

export function MaterialsSection() {
  return (
    <section
      id="materialy"
      aria-labelledby="materials-title"
      className="dark-section border-b border-kolss-warm-white/14"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.52fr_0.48fr] lg:px-10 lg:py-20">
        <div className="overflow-hidden rounded-lg bg-kolss-charcoal/30">
          <Image
            src={homeImages.someKitchen}
            alt="Nowoczesna kuchnia z białymi frontami, drewnem i kamiennym rysunkiem blatu"
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="h-full min-h-[360px] w-full object-cover lg:min-h-[620px]"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="section-kicker text-background/70">Materiały</p>
          <h2 id="materials-title" className="section-title text-background">
            Premium, który widać w dotyku i detalach
          </h2>
          <p className="mt-6 text-[15px] leading-[1.6] text-background/82 sm:text-base">
            Najlepsze kuchnie nie są tylko drewniane albo nowoczesne. Dobrze
            działają wtedy, gdy materiały tworzą spójną całość: fornir lub
            drewno daje wnętrzu ciepło, lakier porządkuje formę, kamień albo
            blat kompaktowy buduje trwałą powierzchnię roboczą, a okucia
            odpowiadają za codzienny komfort.
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

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {materialSwatches.map((item) => (
              <div
                key={item.name}
                className="material-swatch bg-kolss-warm-white text-kolss-charcoal"
              >
                <div
                  className="material-swatch-chip"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold leading-tight">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs leading-tight text-muted">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="#kontakt"
            className="hero-cta hero-cta-primary mt-9 w-full sm:w-fit"
          >
            Porozmawiaj o materiałach
          </Link>
        </div>
      </div>
    </section>
  );
}
