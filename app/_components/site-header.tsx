"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import kolssLogo from "@/assets/images/kolss-white-logo.svg";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navigation: readonly NavigationItem[];
  quoteHref: "#kontakt";
  salonHref: "#salon";
};

export function SiteHeader({
  navigation,
  quoteHref,
  salonHref,
}: SiteHeaderProps) {
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

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 ${
        solidHeader ? "site-header-solid" : "site-header-transparent"
      } ${isScrolled ? "site-header-compact" : ""}`}
    >
      <div className="site-header-inner mx-auto flex w-full max-w-[1440px] items-center justify-between">
        <Link
          href="#start"
          className="group flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          aria-label="KOLSS Polska, strona główna"
          onClick={closeMenu}
        >
          <Image
            src={kolssLogo}
            alt=""
            width={157}
            height={24}
            priority
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
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link" onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
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
              {navigation.map((item) => (
                <li key={`mobile-${item.href}`}>
                  <Link
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
        </div>
      </div>
    </header>
  );
}
