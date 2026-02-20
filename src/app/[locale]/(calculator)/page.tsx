import {getTranslations} from 'next-intl/server';
import {CalculatorWizard} from '@/src/components/calculator/calculator-wizard';

export default async function CalculatorHomePage() {
  const t = await getTranslations('Calculator');

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {t('title')}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t('subtitle')}
        </p>
      </section>

      <CalculatorWizard />
    </div>
  );
}
