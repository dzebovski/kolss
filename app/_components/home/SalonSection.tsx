import Image from "next/image";
import Link from "next/link";

import { IconMail, IconPhone } from "@tabler/icons-react";

import { contact, homeImages } from "@/app/_content/home";

export function SalonSection() {
  return (
    <section
      id="salon"
      aria-labelledby="salon-title"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.5fr_0.5fr] lg:px-10 lg:py-20">
        <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-muted-surface lg:min-h-[560px]">
          <Image
            src={homeImages.hero}
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
          <p className="mt-6 text-[15px] leading-[1.6] text-muted sm:text-base">
            Salon w Legionowie to miejsce, w którym można porozmawiać o
            projekcie, obejrzeć wybrane rozwiązania i przejść przez materiały z
            projektantem. Jeśli masz już plan, wizualizację albo projekt od
            architekta, zabierz go ze sobą albo wyślij wcześniej do analizy.
          </p>

          <address className="mt-8 not-italic">
            <p className="text-base font-semibold">{contact.company}</p>
            <p className="mt-2 text-[15px] leading-[1.5] text-muted">
              {contact.streetAddress}, {contact.postalCode} {contact.city}
            </p>
            <div className="mt-5 grid gap-2 text-[15px] leading-[1.5]">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 text-foreground underline decoration-kolss-lime/0 underline-offset-4 transition hover:decoration-kolss-lime"
              >
                <IconPhone
                  aria-hidden="true"
                  size={18}
                  stroke={1.75}
                  className="shrink-0"
                />
                {contact.phone}
              </a>
              <a
                href={contact.emailHref}
                className="inline-flex items-center gap-2 text-foreground underline decoration-kolss-lime/0 underline-offset-4 transition hover:decoration-kolss-lime"
              >
                <IconMail
                  aria-hidden="true"
                  size={18}
                  stroke={1.75}
                  className="shrink-0"
                />
                {contact.email}
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
  );
}
