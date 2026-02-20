import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import {CalculatorPrimitivesShowcase} from './CalculatorPrimitivesShowcase';

export default async function UIKitPage() {
  // DEV-ONLY: This page is only accessible in development
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const t = await getTranslations('UIKit');

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
      <p className="mt-4 text-muted-foreground">
        {t('description')}
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          {t('calculatorPrimitivesTitle')}
        </h2>
        <CalculatorPrimitivesShowcase />
      </section>
    </div>
  );
}
