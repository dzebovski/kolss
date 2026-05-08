import Image from "next/image";

import { proofItems } from "@/app/_content/home";

export function ProofSection() {
  return (
    <section
      id="realizacje"
      aria-labelledby="proof-title"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="max-w-[860px]">
          <p className="section-kicker">Realizacje</p>
          <h2 id="proof-title" className="section-title">
            Przykłady rozwiązań, które pokazują kierunek pracy
          </h2>
          <p className="mt-6 max-w-[760px] text-[15px] leading-[1.6] text-muted sm:text-base">
            Na stronie głównej pokazujemy wybrane kierunki estetyczne i
            funkcjonalne. Pełne studia przypadków warto dodać dopiero wtedy, gdy
            mamy potwierdzone zdjęcia, opis zadania, materiały i zakres
            realizacji.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {proofItems.map((item) => (
            <article key={item.title} className="kolss-card overflow-hidden">
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
  );
}
