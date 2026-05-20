"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconRoute,
} from "@tabler/icons-react";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import kolssLogo from "@/assets/images/kolss-white-logo.svg";
import { compactOpeningHours, contact, salonRouteHref } from "@/lib/contact";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navigation: readonly NavigationItem[];
  quoteHref: string;
  salonHref: string;
};

export function SiteHeader({
  navigation,
  quoteHref,
  salonHref,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const solidHeader = isScrolled || isMenuOpen;

  useEffect(() => {
    let isTicking = false;

    const updateScrollState = () => {
      if (isTicking) {
        return;
      }

      isTicking = true;
      window.requestAnimationFrame(() => {
        const nextIsScrolled = window.scrollY > 24;
        setIsScrolled((current) =>
          current === nextIsScrolled ? current : nextIsScrolled,
        );
        isTicking = false;
      });
    };

    updateScrollState();
    const immediateSync = window.setTimeout(updateScrollState, 0);
    const hashSync = window.setTimeout(updateScrollState, 160);
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("hashchange", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.clearTimeout(immediateSync);
      window.clearTimeout(hashSync);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("hashchange", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const scrollToPageTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const clearCurrentHash = () => {
    if (!window.location.hash) {
      return;
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  };

  const isItemActive = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/";
    }

    const path = href.split("#", 1)[0];
    return pathname === path;
  };
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    clearCurrentHash();
    scrollToPageTop();
  };
  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    isActive: boolean,
  ) => {
    closeMenu();

    if (!isActive) {
      return;
    }

    event.preventDefault();
    clearCurrentHash();
    scrollToPageTop();
  };

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 ${
        solidHeader ? "site-header-solid" : "site-header-transparent"
      } ${isScrolled ? "site-header-compact" : ""}`}
    >
      <div className="site-header-inner mx-auto flex w-full max-w-[1440px] items-center justify-between">
        <Link
          href="/"
          className="group flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          aria-label="KOLSS Polska, strona główna"
          onClick={handleLogoClick}
        >
          <Image
            src={kolssLogo}
            alt=""
            width={157}
            height={24}
            preload
            className={`site-logo h-auto ${
              solidHeader ? "site-logo-dark" : ""
            } ${isScrolled ? "site-logo-compact" : ""}`}
          />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Główna nawigacja"
        >
          <ul className="site-header-nav-list flex items-center text-[13px] font-semibold uppercase">
            {navigation.map((item) => {
              const isActive = isItemActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(event) =>
                      handleNavigationClick(event, isActive)
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href={quoteHref}
            className={`header-cta ${solidHeader ? "header-cta-solid" : ""}`}
          >
            Otrzymaj wycenę
          </Link>
        </div>

        <button
          type="button"
          className={`hamburger-button lg:hidden ${
            isScrolled ? "hamburger-button-compact" : ""
          }`}
          aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">
            {isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          </span>
          <span
            className={`hamburger-line ${
              isMenuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span className={`hamburger-line ${isMenuOpen ? "opacity-0" : ""}`} />
          <span
            className={`hamburger-line ${
              isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen ? true : undefined}
        className={`mobile-menu lg:hidden ${
          isMenuOpen ? "mobile-menu-open" : "mobile-menu-closed"
        }`}
      >
        <div className="mobile-menu-content">
          <nav aria-label="Mobilna nawigacja">
            <ul className="grid gap-1">
              {navigation.map((item) => {
                const isActive = isItemActive(item.href);

                return (
                  <li key={`mobile-${item.href}`}>
                    <Link
                      href={item.href}
                      className={`mobile-nav-link ${
                        isActive ? "mobile-nav-link-active" : ""
                      }`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(event) =>
                        handleNavigationClick(event, isActive)
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-5 grid gap-3">
            <Link
              href={quoteHref}
              className="mobile-menu-cta mobile-menu-cta-primary"
              onClick={closeMenu}
            >
              Otrzymaj wycenę
            </Link>
            <Link
              href={salonHref}
              className="mobile-menu-cta mobile-menu-cta-secondary"
              onClick={closeMenu}
            >
              Umów wizytę w salonie
            </Link>
          </div>

          <div className="mt-5 rounded-lg border border-border bg-kolss-surface-alt p-4">
            <p className="text-xs font-semibold uppercase leading-none text-kolss-muted-green">
              Kontakt i godziny
            </p>

            <div className="mt-4 grid gap-3 text-sm leading-[1.4] text-muted">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-3 font-semibold text-foreground transition hover:text-kolss-muted-green focus-visible:text-kolss-muted-green"
                onClick={closeMenu}
              >
                <IconPhone
                  aria-hidden="true"
                  size={18}
                  stroke={1.8}
                  className="shrink-0 text-kolss-muted-green"
                />
                <span>{contact.phone}</span>
              </a>

              <a
                href={contact.emailHref}
                className="flex items-center gap-3 font-semibold text-foreground transition hover:text-kolss-muted-green focus-visible:text-kolss-muted-green"
                onClick={closeMenu}
              >
                <IconMail
                  aria-hidden="true"
                  size={18}
                  stroke={1.8}
                  className="shrink-0 text-kolss-muted-green"
                />
                <span>{contact.email}</span>
              </a>

              <div className="flex items-start gap-3">
                <IconMapPin
                  aria-hidden="true"
                  size={18}
                  stroke={1.8}
                  className="mt-0.5 shrink-0 text-kolss-muted-green"
                />
                <span>
                  {contact.streetAddress}
                  <br />
                  {contact.postalCode} {contact.city}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <IconClock
                  aria-hidden="true"
                  size={18}
                  stroke={1.8}
                  className="shrink-0 text-kolss-muted-green"
                />
                <p className="text-xs font-semibold uppercase leading-none text-kolss-muted-green">
                  Godziny pracy
                </p>
              </div>
              <dl className="mt-3 grid gap-2 text-sm leading-none">
                {compactOpeningHours.map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <dt className="text-muted">{day}</dt>
                    <dd className="font-semibold text-foreground">{hours}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <a
              href={salonRouteHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-lg border border-kolss-muted-green bg-kolss-surface px-4 text-sm font-semibold text-foreground transition hover:bg-kolss-lime/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kolss-lime"
              onClick={closeMenu}
            >
              Wyznacz trasę w Google Maps
              <IconRoute aria-hidden="true" size={18} stroke={1.8} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
