'use client';

import {useTranslations} from 'next-intl';
import {SelectableCard} from '@/src/components/calculator/ui/SelectableCard';

export function CalculatorPrimitivesShowcase() {
  const t = useTranslations('UIKit');

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <SelectableCard
        title={t('cards.default.title')}
        description={t('cards.default.description')}
        price={2490}
        selected={false}
        onClick={() => console.log('Clicked default selectable card')}
      />

      <SelectableCard
        title={t('cards.selected.title')}
        description={t('cards.selected.description')}
        price={3490}
        selected={true}
        onClick={() => console.log('Clicked selected selectable card')}
      />

      <SelectableCard
        title={t('cards.withImage.title')}
        description={t('cards.withImage.description')}
        price={4290}
        imageUrl="/kitchens/minimal-oak.svg"
        selected={false}
        onClick={() => console.log('Clicked image selectable card')}
      />

      <SelectableCard
        title={t('cards.longText.title')}
        description={t('cards.longText.description')}
        price={5590}
        selected={false}
        onClick={() => console.log('Clicked long text selectable card')}
      />
    </div>
  );
}
