import Link from "next/link";
import type { ElementType } from "react";

import * as TablerIcons from "@tabler/icons-react";
import { processSteps } from "@/app/_content/home";

function StepIcon({
  name,
  className,
  size = 20,
  stroke = 1.7,
}: {
  name?: string;
  className?: string;
  size?: number;
  stroke?: number;
}) {
  const fallback: ElementType = TablerIcons.IconMail;
  const icons = TablerIcons as unknown as Record<string, ElementType>;
  const maybeIcon = name ? icons[name] : undefined;
  const Icon: ElementType = maybeIcon ?? fallback;

  return (
    <Icon
      aria-hidden="true"
      size={size}
      stroke={stroke}
      className={className}
    />
  );
}

export function ProcessSection() {
  const reassuranceItems = [
    {
      title: "Pełna jasność",
      text: "Wszystkie ustalenia potwierdzamy na piśmie.",
    },
    {
      title: "Bezpieczeństwo",
      text: "Przedpłata zabezpiecza harmonogram i Twoje zamówienie.",
    },
    {
      title: "Zaufanie",
      text: "Działamy profesjonalnie i transparentnie na każdym etapie.",
    },
  ] as const;

  return (
    <section
      id="proces"
      aria-labelledby="process-title"
      className="border-b border-border bg-kolss-surface-alt"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <p className="section-kicker">PROCES</p>
            <h2 id="process-title" className="section-title">
              Jak wygląda współpraca od pierwszej rozmowy do montażu
            </h2>
          </div>
          <div className="lg:mt-[50px]">
            <p className="text-[15px] leading-[1.6] text-muted sm:text-base">
              Prowadzimy projekt kompleksowo i transparentnie. Wiesz, co dzieje
              się na każdym etapie — od pierwszej rozmowy i analizy po produkcję,
              montaż i opiekę po zakończeniu prac.
            </p>
            <Link href="#kontakt" className="kolss-text-link mt-7">
              Wyślij plan do wstępnej analizy
            </Link>
          </div>
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-6 right-6 top-7 hidden h-px bg-border lg:block"
          />

          <ol className="grid gap-5 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {processSteps.map((step, index) => {
              const iconName = (step as { icon?: string }).icon;
              const stepLabel = `Etap ${String(index + 1).padStart(2, "0")}`;

              return (
                <li key={step.title} className="relative">
                  <article className="h-full rounded-[20px] border border-border bg-kolss-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-[2px] hover:shadow-[var(--shadow-card-hover)]">
                    <header className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.02em] text-muted">
                          <span
                            aria-hidden="true"
                            className="h-[7px] w-[7px] rounded-full bg-kolss-lime"
                          />
                          {stepLabel}
                        </span>
                      </div>

                      <span className="kolss-icon-tile h-10 w-10 shrink-0">
                        <StepIcon
                          name={iconName}
                          size={20}
                          stroke={1.7}
                          className="text-kolss-muted-green"
                        />
                      </span>
                    </header>

                    <h3 className="mt-5 text-[17px] font-semibold leading-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.5] text-muted">
                      {step.text}
                    </p>

                    <div
                      className="mt-5 h-px w-full bg-border/70 md:hidden"
                      aria-hidden="true"
                    />
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <section
          aria-labelledby="process-reassurance-title"
          className="mt-10 rounded-[24px] border border-border bg-kolss-surface p-6 shadow-[var(--shadow-soft)] sm:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
            <div className="hidden lg:block">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-kolss-charcoal text-kolss-warm-white">
                <StepIcon
                  name="IconFileText"
                  size={22}
                  stroke={1.6}
                  className="text-kolss-warm-white/85"
                />
              </div>
            </div>

            <div>
              <h3
                id="process-reassurance-title"
                className="text-[20px] font-semibold leading-tight text-foreground sm:text-[22px]"
              >
                Umowa po akceptacji, przedpłata dla Twojego spokoju
              </h3>
              <p className="mt-4 max-w-[980px] text-[15px] leading-[1.65] text-muted sm:text-base">
                Umowę podpisujemy dopiero po pełnym uzgodnieniu szczegółów
                projektu, materiałów i wyceny. Po podpisaniu umowy Klient
                dokonuje przedpłaty, co pozwala nam zarezerwować materiały i
                rozpocząć realizację z pełnym zaangażowaniem.
              </p>

              <div className="mt-7 rounded-[18px] border border-border bg-kolss-surface-alt">
                <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {reassuranceItems.map((item) => (
                    <div key={item.title} className="p-5 sm:p-6">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-kolss-surface text-kolss-muted-green">
                          <StepIcon
                            name="IconCheck"
                            size={15}
                            stroke={2}
                            className="text-kolss-muted-green"
                          />
                        </span>
                        <p className="text-xs font-semibold uppercase leading-none text-foreground">
                          {item.title}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-[1.55] text-muted">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
