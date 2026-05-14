import Image from "next/image";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

import { contact } from "@/app/_content/home";
import kolssLogo from "@/assets/images/kolss-white-logo.svg";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/kolss.polska",
    icon: IconBrandFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kolss_pl/",
    icon: IconBrandInstagram,
  },
] as const;

const footerNavigation = [
  { label: "Start", href: "/" },
  { label: "O nas", href: "/about" },
  { label: "Kolekcje", href: "/kitchen-collections" },
] as const;

const companyDetails = [
  "KOLSS Polska Sp. z o.o., ul. Zegrzyńska 6, 05-119 Legionowo,",
  "KRS 0001207180, NIP 536-199-62-94",
  "REGON 543320017",
  "Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy KRS",
] as const;

export function SiteFooter() {
  return (
    <footer className="dark-section bg-kolss-charcoal text-kolss-warm-white">
      <div className="border-t border-kolss-warm-white/12 bg-[linear-gradient(180deg,rgba(247,245,239,0.06),rgba(247,245,239,0)_32%)]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.7fr] lg:gap-14">
            <div className="max-w-xl">
              <Link
                href="/"
                className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kolss-lime"
                aria-label="KOLSS Polska, strona główna"
              >
                <Image
                  src={kolssLogo}
                  alt=""
                  width={157}
                  height={24}
                  className="h-auto w-[157px]"
                />
              </Link>

              <p className="mt-7 max-w-md text-[15px] leading-[1.65] text-kolss-warm-white/72">
                Kuchnie, zabudowy i meble na wymiar projektowane z myślą o
                codziennym rytmie domu. Salon w Legionowie, realizacje dla
                Warszawy i okolic.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#kontakt"
                  className="kolss-button kolss-button-primary"
                >
                  Otrzymaj wycenę
                </Link>
                <Link
                  href="#salon"
                  className="kolss-button border border-kolss-warm-white/22 bg-kolss-warm-white/6 text-kolss-warm-white hover:border-kolss-warm-white/38 hover:bg-kolss-warm-white/10"
                >
                  Odwiedź salon
                </Link>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-[0.58fr_0.82fr_1.3fr]">
              <nav aria-label="Nawigacja w stopce">
                <h2 className="text-xs font-semibold uppercase leading-none text-kolss-lime">
                  Nawigacja
                </h2>
                <ul className="mt-5 grid gap-3 text-sm text-kolss-warm-white/68">
                  {footerNavigation.map((item) => (
                    <li key={`footer-${item.href}`}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 underline decoration-kolss-lime/0 underline-offset-4 transition hover:text-kolss-warm-white hover:decoration-kolss-lime focus-visible:text-kolss-warm-white focus-visible:decoration-kolss-lime"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <address className="not-italic">
                <h2 className="text-xs font-semibold uppercase leading-none text-kolss-lime">
                  Kontakt
                </h2>
                <ul className="mt-5 grid gap-4 text-sm text-kolss-warm-white/72">
                  <li>
                    <a
                      href={contact.phoneHref}
                      className="group flex items-start gap-3 transition hover:text-kolss-warm-white focus-visible:text-kolss-warm-white"
                    >
                      <IconPhone
                        aria-hidden="true"
                        size={18}
                        stroke={1.7}
                        className="mt-0.5 shrink-0 text-kolss-lime"
                      />
                      <span>{contact.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={contact.emailHref}
                      className="group flex items-start gap-3 transition hover:text-kolss-warm-white focus-visible:text-kolss-warm-white"
                    >
                      <IconMail
                        aria-hidden="true"
                        size={18}
                        stroke={1.7}
                        className="mt-0.5 shrink-0 text-kolss-lime"
                      />
                      <span>{contact.email}</span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconMapPin
                      aria-hidden="true"
                      size={18}
                      stroke={1.7}
                      className="mt-0.5 shrink-0 text-kolss-lime"
                    />
                    <span>
                      {contact.streetAddress}
                      <br />
                      {contact.postalCode} {contact.city}
                    </span>
                  </li>
                </ul>

                <div className="mt-7">
                  <h2 className="text-xs font-semibold uppercase leading-none text-kolss-lime">
                    Social media
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {socialLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex h-11 w-11 items-center justify-center rounded-lg border border-kolss-warm-white/18 bg-kolss-warm-white/6 text-kolss-warm-white transition hover:border-kolss-lime/70 hover:bg-kolss-lime hover:text-kolss-charcoal focus-visible:border-kolss-lime/70 focus-visible:bg-kolss-lime focus-visible:text-kolss-charcoal"
                            aria-label={item.label}
                          >
                            <Icon aria-hidden="true" size={20} stroke={1.8} />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </address>

              <div className="sm:col-span-2 xl:col-span-1">
                <h2 className="text-xs font-semibold uppercase leading-none text-kolss-lime">
                  Dane spółki
                </h2>
                <dl className="mt-5 grid gap-3 text-sm leading-[1.55] text-kolss-warm-white/66">
                  {companyDetails.map((detail, index) => (
                    <div key={detail}>
                      <dt className="sr-only">Dane spółki {index + 1}</dt>
                      <dd>{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-kolss-warm-white/12 pt-6 text-xs leading-[1.5] text-kolss-warm-white/52 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © KOLSS since 1995-2025.
              <br className="sm:hidden" /> All Rights Reserved.
            </p>
            <a
              href="https://kolss.eu"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold uppercase text-kolss-warm-white/62 transition hover:text-kolss-warm-white focus-visible:text-kolss-warm-white"
            >
              kolss.eu
              <IconArrowUpRight aria-hidden="true" size={15} stroke={1.8} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
