import Link from 'next/link';
import {getLocale} from 'next-intl/server';

const messages = {
  uk: {
    title: 'Каталог тимчасово недоступний',
    description: 'Не вдалося завантажити дані каталогу. Спробуйте пізніше.',
    backHome: 'Повернутися на головну'
  },
  pl: {
    title: 'Katalog jest tymczasowo niedostępny',
    description: 'Nie udało się załadować danych katalogu. Spróbuj ponownie później.',
    backHome: 'Wróć na stronę główną'
  },
  en: {
    title: 'Catalog is temporarily unavailable',
    description: 'We could not load the catalog data. Please try again later.',
    backHome: 'Back to homepage'
  }
} as const;

type SupportedLocale = keyof typeof messages;

function normalizeLocale(locale: string): SupportedLocale {
  if (locale === 'uk' || locale === 'pl' || locale === 'en') {
    return locale;
  }
  return 'en';
}

export default async function CatalogNotFound() {
  const locale = normalizeLocale(await getLocale());
  const copy = messages[locale];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center md:px-6">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">{copy.title}</h1>
          <p className="mt-3 text-slate-600">{copy.description}</p>
          <Link
            className="mt-6 inline-flex rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            href="/"
          >
            {copy.backHome}
          </Link>
        </div>
      </section>
    </main>
  );
}
