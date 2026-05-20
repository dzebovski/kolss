"use client";

import Image from "next/image";
import {
  IconArrowLeft,
  IconArrowRight,
  IconGridDots,
  IconMaximize,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  galleryCategoryLabels,
  type GalleryCategory,
  type GalleryItem,
  type GalleryVariant,
} from "@/app/gallery/gallery-types";

type GalleryFilter = GalleryCategory | "all";

type GalleryBrowserProps = {
  items: GalleryItem[];
};

const filterOptions: readonly { value: GalleryFilter; label: string }[] = [
  { value: "all", label: "Wszystkie" },
  { value: "kitchens", label: galleryCategoryLabels.kitchens },
  { value: "wardrobes", label: galleryCategoryLabels.wardrobes },
  { value: "bathrooms", label: galleryCategoryLabels.bathrooms },
  { value: "workplaces", label: galleryCategoryLabels.workplaces },
];

const tileLayoutClasses: Record<GalleryVariant, string> = {
  feature: "col-span-2",
  wide: "col-span-2",
  tall: "",
  standard: "",
};

function getCountLabel(count: number) {
  if (count === 1) {
    return "1 zdjęcie";
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit >= 2 && lastDigit <= 4 && lastTwoDigits < 12) {
    return `${count} zdjęcia`;
  }

  return `${count} zdjęć`;
}

function getTileSizes(variant: GalleryVariant) {
  if (variant === "feature" || variant === "wide") {
    return "(max-width: 767px) 100vw, (max-width: 1279px) 66vw, 50vw";
  }

  return "(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw";
}

export function GalleryBrowser({ items }: GalleryBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryFilter>(() =>
    items.some((item) => item.category === "kitchens") ? "kitchens" : "all",
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const browserRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const openedTileIdRef = useRef<string | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());

  const countsByCategory = useMemo(
    () =>
      items.reduce<Record<GalleryCategory, number>>(
        (counts, item) => {
          counts[item.category] += 1;
          return counts;
        },
        {
          kitchens: 0,
          wardrobes: 0,
          bathrooms: 0,
          workplaces: 0,
        },
      ),
    [items],
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const activeItem =
    activeIndex === null ? null : (filteredItems[activeIndex] ?? null);
  const activePosition = activeIndex === null ? 0 : activeIndex + 1;

  useEffect(() => {
    browserRef.current?.setAttribute("data-gallery-ready", "true");
  }, []);

  const projectCount = useMemo(
    () => new Set(filteredItems.map((item) => item.projectLabel)).size,
    [filteredItems],
  );

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || filteredItems.length === 0) {
        return currentIndex;
      }

      return (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || filteredItems.length === 0) {
        return currentIndex;
      }

      return (currentIndex + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);

    window.requestAnimationFrame(() => {
      const openedTileId = openedTileIdRef.current;

      if (!openedTileId) {
        return;
      }

      triggerRefs.current.get(openedTileId)?.focus();
    });
  }, []);

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    closeButtonRef.current?.focus();
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem, closeLightbox, showNext, showPrevious]);

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleBackdropMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <div ref={browserRef} className="mt-10" data-gallery-ready="false">
      <div className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="flex items-center gap-2 text-[13px] font-semibold uppercase leading-none text-muted">
            <IconGridDots aria-hidden="true" size={17} stroke={1.8} />
            Filtr galerii
          </p>
          <p className="mt-3 max-w-[660px] text-[15px] leading-[1.6] text-muted sm:text-base">
            Zdjęcia są podzielone według typu zabudowy. Miniatury zostają
            zwarte, a pełny kadr można obejrzeć w lightboxie.
          </p>
        </div>

        <p
          className="text-sm font-semibold uppercase leading-none text-foreground"
          aria-live="polite"
        >
          {getCountLabel(filteredItems.length)} / {projectCount}{" "}
          {projectCount === 1 ? "zestaw" : "zestawów"}
        </p>
      </div>

      <div
        className="mt-6 flex gap-2 overflow-x-auto pb-2"
        aria-label="Kategorie galerii"
      >
        {filterOptions.map((option) => {
          const isActive = activeCategory === option.value;
          const count =
            option.value === "all"
              ? items.length
              : countsByCategory[option.value];

          return (
            <button
              key={option.value}
              type="button"
              className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-semibold uppercase leading-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kolss-lime ${
                isActive
                  ? "border-kolss-charcoal bg-kolss-lime text-kolss-charcoal"
                  : "border-border bg-kolss-surface-alt text-foreground hover:border-kolss-charcoal hover:bg-kolss-lime/16"
              }`}
              aria-pressed={isActive}
              onClick={() => {
                setActiveCategory(option.value);
                setActiveIndex(null);
              }}
            >
              {option.label}
              <span className="ml-2 text-[11px] opacity-70">
                {getCountLabel(count)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid auto-rows-[clamp(190px,29vw,420px)] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
        {filteredItems.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              if (node) {
                triggerRefs.current.set(item.id, node);
                return;
              }

              triggerRefs.current.delete(item.id);
            }}
            type="button"
            className={`group relative h-full min-w-0 overflow-hidden rounded-lg bg-kolss-charcoal text-left shadow-[0_14px_34px_rgba(30,36,33,0.08)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(30,36,33,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kolss-lime motion-reduce:transition-none ${tileLayoutClasses[item.variant]}`}
            aria-label={`Otwórz zdjęcie: ${item.alt}`}
            data-gallery-category={item.category}
            onClick={() => {
              openedTileIdRef.current = item.id;
              setActiveIndex(index);
            }}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes={getTileSizes(item.variant)}
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
            />
            <span
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,36,33,0)_38%,rgba(30,36,33,0.74)_100%)]"
              aria-hidden="true"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-kolss-warm-white sm:p-4">
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-semibold uppercase leading-none text-kolss-warm-white/80">
                  {galleryCategoryLabels[item.category]}
                </span>
              </span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-kolss-warm-white/22 bg-kolss-charcoal/38 backdrop-blur-md transition group-hover:bg-kolss-lime group-hover:text-kolss-charcoal"
                aria-hidden="true"
              >
                <IconMaximize size={17} stroke={1.8} />
              </span>
            </span>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[80] bg-kolss-charcoal/96 p-3 text-kolss-warm-white backdrop-blur-xl sm:p-5"
          onMouseDown={handleBackdropMouseDown}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            className="mx-auto grid h-full max-w-[1440px] grid-rows-[auto_1fr_auto] gap-3"
            onKeyDown={handleDialogKeyDown}
          >
            <div className="flex items-center justify-between gap-3 border-b border-kolss-warm-white/14 pb-3">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase leading-none text-kolss-warm-white/58">
                  <IconPhoto aria-hidden="true" size={16} stroke={1.8} />
                  Zdjęcie {activePosition} z {filteredItems.length}
                </p>
                <h2
                  id="gallery-lightbox-title"
                  className="mt-2 truncate text-lg font-semibold leading-tight text-kolss-warm-white sm:text-2xl"
                >
                  {activeItem.projectLabel}
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-kolss-warm-white/20 bg-kolss-warm-white/8 text-kolss-warm-white transition hover:border-kolss-lime hover:bg-kolss-lime hover:text-kolss-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kolss-lime"
                aria-label="Zamknij podgląd zdjęcia"
                onClick={closeLightbox}
              >
                <IconX aria-hidden="true" size={21} stroke={1.8} />
              </button>
            </div>

            <figure className="relative min-h-0 overflow-hidden rounded-lg bg-black/22">
              <Image
                src={activeItem.image}
                alt={activeItem.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />

              {filteredItems.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-kolss-warm-white/20 bg-kolss-charcoal/64 text-kolss-warm-white backdrop-blur-md transition hover:border-kolss-lime hover:bg-kolss-lime hover:text-kolss-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kolss-lime sm:left-5"
                    aria-label="Poprzednie zdjęcie"
                    onClick={showPrevious}
                  >
                    <IconArrowLeft aria-hidden="true" size={21} stroke={1.8} />
                  </button>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-kolss-warm-white/20 bg-kolss-charcoal/64 text-kolss-warm-white backdrop-blur-md transition hover:border-kolss-lime hover:bg-kolss-lime hover:text-kolss-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kolss-lime sm:right-5"
                    aria-label="Następne zdjęcie"
                    onClick={showNext}
                  >
                    <IconArrowRight aria-hidden="true" size={21} stroke={1.8} />
                  </button>
                </>
              ) : null}
            </figure>

            <div className="flex flex-col gap-2 border-t border-kolss-warm-white/14 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-[1.45] text-kolss-warm-white/76">
                {activeItem.alt}
              </p>
              <p className="text-[11px] font-semibold uppercase leading-none text-kolss-warm-white/52">
                {galleryCategoryLabels[activeItem.category]}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
