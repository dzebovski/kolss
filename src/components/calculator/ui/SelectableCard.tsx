'use client';

import type {KeyboardEvent} from 'react';
import Image from 'next/image';
import {CheckCircle2, CheckSquare2, Circle, Square} from 'lucide-react';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
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
const CARD_IMAGE_QUALITY = 85;

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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  const UnselectedIcon = selectionType === 'checkbox' ? Square : Circle;
  const SelectedIcon = selectionType === 'checkbox' ? CheckSquare2 : CheckCircle2;

  return (
    <Card
      role={selectionType === 'checkbox' ? 'checkbox' : 'radio'}
      aria-checked={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={title}
      className={cn(
        'group cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden flex h-full rounded-lg',
        'hover:border-primary/50 hover:shadow-md hover:bg-accent/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        selected
          ? 'border-primary border-2 bg-primary/5 shadow-sm ring-1 ring-primary/20'
          : 'border border-border/70 bg-card',
      )}
    >
      {imageUrl ? (
        <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-muted/30 overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            fill
            alt={title}
            sizes={CARD_IMAGE_SIZES}
            quality={CARD_IMAGE_QUALITY}
            placeholder={imageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={imageBlurDataURL}
            className={cn('object-contain transition-transform duration-500 group-hover:scale-105 p-3')}
            loading="lazy"
          />
        </div>
      ) : null}

      <CardHeader className="flex flex-row items-start justify-between gap-3 p-4 pb-2">
        <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>
        <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <UnselectedIcon
            aria-hidden="true"
            className={cn(
              'h-5 w-5 text-muted-foreground/60 transition-all duration-200',
              selected ? 'scale-90 opacity-0' : 'scale-100 opacity-100 group-hover:text-primary/70',
            )}
          />
          <SelectedIcon
            aria-hidden="true"
            className={cn(
              'absolute h-5 w-5 text-primary transition-all duration-200',
              selected ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
            )}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-4 flex-1 gap-3 pt-0">
        {description ? (
          <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
            {description}
          </p>
        ) : (
          <div className="min-h-5" />
        )}

        {formattedPrice ? (
          <div className="mt-auto">
            <span className="inline-flex items-center text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
              {formattedPrice}
            </span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
