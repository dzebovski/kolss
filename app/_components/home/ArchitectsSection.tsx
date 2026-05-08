import Image from "next/image";
import Link from "next/link";

import { architectBullets, homeImages } from "@/app/_content/home";

export function ArchitectsSection() {
  return (
    <section
      id="dla-architektow"
      aria-labelledby="architects-title"
      className="border-b border-border bg-kolss-surface-alt"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.45fr_0.55fr] lg:px-10 lg:py-20">
        <div>
          <p className="section-kicker">Dla architektów</p>
          <h2 id="architects-title" className="section-title">
            Współpracujemy z projektantami i architektami wnętrz
          </h2>
          <p className="mt-6 text-[15px] leading-[1.6] text-muted sm:text-base">
            Jeśli pracujesz z gotowym projektem, możemy przeanalizować
            dokumentację, doprecyzować rozwiązania techniczne i przygotować
            ofertę wykonawczą. KOLSS może być partnerem dla kuchni, zabudów
            dziennych, garderób, łazienek i innych elementów stolarskich w
            jednym wnętrzu.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.48fr_0.52fr]">
          <div className="relative min-h-[320px] overflow-hidden rounded-lg bg-muted-surface">
            <Image
              src={homeImages.workersThree}
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
            <Link href="#kontakt" className="kolss-text-link mt-8 w-fit">
              Wyślij projekt do analizy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
