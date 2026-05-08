import Image from "next/image";
import Link from "next/link";

import { offerItems } from "@/app/_content/home";

export function OfferSection() {
  return (
    <section
      id="oferta"
      aria-labelledby="offer-title"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="max-w-[820px]">
          <p className="section-kicker">Oferta</p>
          <h2 id="offer-title" className="section-title">
            Co możemy zaprojektować i wykonać
          </h2>
          <p className="mt-6 max-w-[760px] text-[15px] leading-[1.6] text-muted sm:text-base">
            KOLSS Polska pomaga zaplanować pojedynczą kuchnię albo kilka zabudów
            w jednym mieszkaniu. Najważniejsze decyzje podejmujemy na podstawie
            układu wnętrza, sposobu użytkowania i materiałów, które mają
            pracować przez lata.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {offerItems.map((item) => (
            <article
              key={item.title}
              className="kolss-card group grid h-full grid-rows-[auto_1fr] overflow-hidden"
            >
              <div className="relative aspect-[4/3] shrink-0 bg-muted-surface">
                <Image
                  src={item.image}
                  alt={item.alt}
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-rows-[auto_1fr_auto] p-5">
                <h3 className="text-xl font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.48] text-muted">
                  {item.text}
                </p>
                {item.cta ? (
                  <Link
                    href="#kontakt"
                    className="kolss-text-link self-end w-fit pt-6"
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
  );
}
