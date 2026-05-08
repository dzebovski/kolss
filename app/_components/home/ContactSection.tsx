import {
  IconBuildingStore,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

import { contactCards, projectTypes } from "@/app/_content/home";
import { ContactForm } from "@/app/_components/contact/contact-form";

const detailIcon = {
  buildingStore: IconBuildingStore,
  mapPin: IconMapPin,
  phone: IconPhone,
  mail: IconMail,
} as const;

export function ContactSection() {
  return (
    <section
      id="kontakt"
      aria-labelledby="contact-title"
      className="dark-section border-b border-kolss-warm-white/14"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.42fr_0.58fr] lg:px-10 lg:py-20">
        <div>
          <p className="section-kicker text-background/70">Kontakt</p>
          <h2 id="contact-title" className="section-title text-background">
            Wyślij plan, zdjęcia albo projekt do wstępnej analizy
          </h2>
          <p className="mt-6 text-[15px] leading-[1.6] text-background/80 sm:text-base">
            Im więcej danych wyślesz na początku, tym szybciej możemy
            przygotować sensowną odpowiedź: rzut, wymiary, zdjęcia wnętrza,
            inspiracje, lista sprzętu AGD albo projekt od architekta.
          </p>

          <address className="mt-8 not-italic">
            <div className="grid gap-4">
              {contactCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-lg border border-kolss-warm-white/14 bg-kolss-warm-white/6 p-5"
                >
                  <dl className="grid gap-5 sm:grid-cols-2">
                    {card.details.map((item) => {
                      const Icon = detailIcon[item.icon];

                      return (
                        <div key={item.label}>
                          <dt className="flex items-center gap-2 text-xs font-semibold uppercase leading-none text-background/58">
                            <Icon
                              aria-hidden="true"
                              size={17}
                              stroke={1.7}
                              className="shrink-0 text-kolss-lime"
                            />
                            <span>{item.label}</span>
                          </dt>
                          <dd className="mt-2 pl-[25px] text-[15px] leading-[1.42] text-background/88">
                            {"href" in item && item.href ? (
                              <a
                                href={item.href}
                                className="transition hover:text-background"
                              >
                                {item.value}
                              </a>
                            ) : (
                              item.value
                            )}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </article>
              ))}
            </div>
          </address>
        </div>

        <ContactForm projectTypes={projectTypes} />
      </div>
    </section>
  );
}
