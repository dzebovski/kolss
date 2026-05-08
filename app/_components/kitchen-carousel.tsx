"use client";

import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";

export type KitchenCarouselDetail = {
  image: StaticImageData;
  alt: string;
  caption: string;
};

export type KitchenCarouselCollection = {
  title: string;
  subtitle: string;
  bestFor: string;
  image: StaticImageData;
  alt: string;
  details: [KitchenCarouselDetail, KitchenCarouselDetail];
};

type KitchenCarouselProps = {
  collections: KitchenCarouselCollection[];
};

export function KitchenCarousel({ collections }: KitchenCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const syncCarouselState = useCallback((api: EmblaCarouselType) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
    setScrollSnaps(api.scrollSnapList());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      syncCarouselState(emblaApi);
    });

    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  if (collections.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-14 sm:mt-16 lg:mt-[4.5rem]"
      role="region"
      aria-label="Kolekcje kuchni"
      aria-roledescription="carousel"
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <p className="text-[13px] font-semibold uppercase leading-none text-muted">
          {selectedIndex + 1} / {collections.length}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-border bg-background text-2xl leading-none text-foreground transition hover:border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Poprzednia kolekcja"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-border bg-background text-2xl leading-none text-foreground transition hover:border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Następna kolekcja"
            disabled={!canScrollNext}
            onClick={scrollNext}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex touch-pan-y lg:-ml-10">
          {collections.map((collection, index) => (
            <article
              key={collection.title}
              role="group"
              aria-label={`${collection.title}, ${index + 1} z ${
                collections.length
              }`}
              aria-roledescription="slide"
              className="min-w-0 flex-[0_0_100%] pl-5 lg:pl-10"
            >
              <div className="mb-6">
                <h3
                  id={`${collection.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}-title`}
                  className="text-[34px] font-bold leading-[1.02] text-foreground sm:text-[40px] lg:text-[46px]"
                >
                  {collection.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.4] text-foreground sm:text-base">
                  {collection.subtitle}
                </p>
                <p className="mt-3 max-w-[760px] text-[13px] font-semibold uppercase leading-[1.35] text-muted">
                  Najlepiej pasuje do: {collection.bestFor}
                </p>
              </div>

              <div className="grid gap-3 sm:gap-5 md:grid-cols-3 lg:gap-10">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted-surface">
                  <Image
                    src={collection.image}
                    alt={collection.alt}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 30vw"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid gap-3 min-[420px]:grid-cols-2 sm:gap-5 md:contents">
                  {collection.details.map((detail) => (
                    <figure key={detail.caption} className="min-w-0">
                      <div className="relative aspect-square overflow-hidden bg-muted-surface">
                        <Image
                          src={detail.image}
                          alt={detail.alt}
                          sizes="(max-width: 419px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 30vw"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <figcaption className="mt-4 text-[15px] leading-[1.25] text-foreground sm:text-base sm:leading-[1.28]">
                        {detail.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className="mt-7 flex items-center gap-2"
        aria-label="Wybierz kolekcję kuchni"
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
              selectedIndex === index
                ? "w-9 bg-foreground"
                : "w-2.5 bg-border hover:bg-muted"
            }`}
            aria-label={`Pokaż ${collections[index]?.title ?? "kolekcję"}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
