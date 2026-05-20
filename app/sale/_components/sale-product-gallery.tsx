"use client";

import Image, { type StaticImageData } from "next/image";
import { useMemo, useState } from "react";

type SaleProductGalleryProps = {
  alt: string;
  discountLabel: string;
  feature?: "wide";
  images: readonly StaticImageData[];
  productId: string;
  title: string;
};

export function SaleProductGallery({
  alt,
  discountLabel,
  feature,
  images,
  productId,
  title,
}: SaleProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] ?? images[0];
  const imageSizes =
    feature === "wide"
      ? "(max-width: 1023px) 100vw, 48vw"
      : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 32vw";
  const thumbnailSizes =
    feature === "wide"
      ? "(max-width: 1023px) 30vw, 14vw"
      : "(max-width: 767px) 30vw, 10vw";
  const thumbnails = useMemo(
    () => images.map((image, index) => ({ image, index })),
    [images],
  );

  return (
    <div className="grid gap-0 bg-kolss-surface-alt">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-muted-surface">
        <Image
          src={selectedImage}
          alt={alt}
          fill
          sizes={imageSizes}
          className="object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
        <div className="absolute left-4 top-4 rounded-lg bg-kolss-lime px-3 py-2 text-xs font-semibold uppercase leading-none text-kolss-charcoal shadow-[0_14px_28px_rgba(30,36,33,0.18)]">
          {discountLabel}
        </div>
      </div>

      {thumbnails.length > 1 ? (
        <div
          className="grid grid-cols-3 gap-3 p-3 sm:p-4"
          aria-label={`Zdjęcia produktu ${title}`}
        >
          {thumbnails.map(({ image, index }) => {
            const isSelected = selectedIndex === index;

            return (
              <button
                key={`${productId}-thumb-${index}`}
                type="button"
                className={`relative aspect-[4/3] overflow-hidden rounded-lg border bg-kolss-surface p-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kolss-lime ${
                  isSelected
                    ? "border-kolss-muted-green shadow-[0_12px_28px_rgba(30,36,33,0.14)]"
                    : "border-border hover:border-kolss-muted-green hover:bg-kolss-warm-white"
                }`}
                aria-label={`Pokaż zdjęcie ${index + 1}: ${title}`}
                aria-current={isSelected ? "true" : undefined}
                onClick={() => setSelectedIndex(index)}
                onFocus={() => setSelectedIndex(index)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="relative block h-full w-full overflow-hidden rounded-md">
                  <Image
                    src={image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes={thumbnailSizes}
                    className="object-cover"
                  />
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
