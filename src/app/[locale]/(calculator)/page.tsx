import {getTranslations} from 'next-intl/server';

export default async function CalculatorHomePage() {
  const t = await getTranslations('Calculator');

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {t('title')}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          {t('subtitle')}
        </p>
      </section>

      <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
        <div className="text-center">
          <p className="text-xl font-medium text-slate-900">{t('placeholderTitle')}</p>
          <p className="mt-2 text-sm text-slate-600">
            {t('placeholderDescription')}
          </p>
        </div>
      </div>
    </div>
  );
}
