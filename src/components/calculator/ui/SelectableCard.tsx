'use client';

import Image from 'next/image';
import {CheckCircle2, CheckSquare2, Circle, Square} from 'lucide-react';
import {cn} from '@/lib/utils';

export interface SelectableCardProps {
  title: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  imageBlurDataURL?: string;
  selectionType?: 'radio' | 'checkbox';
  selected: boolean;
  onClick: () => void;
}

const plnFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  maximumFractionDigits: 0,
});

const CARD_IMAGE_SIZES =
  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw';
const CARD_IMAGE_QUALITY = 75;

export const SelectableCard = ({
  title,
  description,
  price,
  imageUrl,
  imageBlurDataURL,
  selectionType = 'radio',
  selected,
  onClick,
}: SelectableCardProps) => {
  const formattedPrice =
    typeof price === 'number' ? (price > 0 ? `+${plnFormatter.format(price)}` : plnFormatter.format(price)) : null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={selectionType}
      aria-checked={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={title}
      className={cn(
        'group flex h-full cursor-pointer flex-col rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-200',
        selected
          ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary'
          : 'border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-md',
        'active:translate-y-px focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      )}
    >
      {imageUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-muted">
          <Image
            src={imageUrl}
            fill
            alt={title}
            sizes={CARD_IMAGE_SIZES}
            quality={CARD_IMAGE_QUALITY}
            placeholder={imageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={imageBlurDataURL}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-sm font-semibold leading-tight text-foreground">{title}</p>

        {description ? (
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className="mt-auto flex items-center justify-between p-4 pt-0">
        {formattedPrice ? <p className="text-sm font-semibold tabular-nums text-primary">{formattedPrice}</p> : <span />}
        {selectionType === 'checkbox' ? (
          selected ? (
            <CheckSquare2 aria-hidden="true" className="h-5 w-5 text-primary" />
          ) : (
            <Square aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
          )
        ) : (
          selected ? (
            <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-primary" />
          ) : (
            <Circle aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
          )
        )}
      </div>
    </div>
  );
};
