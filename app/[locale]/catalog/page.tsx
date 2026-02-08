import Image from 'next/image';
import Link from 'next/link';

import {getLocalizedProjectText, getProjects, normalizeLocale, type ProjectRow} from '@/src/lib/projects/projects';

type PageProps = {
  params: Promise<{locale: string}>;
};

export default async function CatalogPage({params}: PageProps) {
  const {locale: localeParam} = await params;
  const locale = normalizeLocale(localeParam);

  let projects: ProjectRow[] = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('[catalog] failed to load projects:', error);
  }
  const currencyByLocale = {
    uk: 'UAH',
    pl: 'PLN',
    en: 'USD'
  } as const;

  const priceFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyByLocale[locale],
    maximumFractionDigits: 0
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-slate-900">Каталог кухонь</h1>
          <Link className="text-sm font-medium text-slate-700 underline" href={`/${locale}`}>
            На головну
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => {
            const {title, description} = getLocalizedProjectText(project, locale);
            return (
              <article className="overflow-hidden rounded-xl border border-slate-200 bg-white" key={project.id}>
                <Image
                  alt={`Модель кухні ${title}`}
                  className="h-auto w-full"
                  height={800}
                  quality={85}
                  src={project.image_url || '/kitchens/nordic-light.svg'}
                  width={1200}
                />
                <div className="space-y-3 p-5">
                  <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                  <p className="text-sm text-slate-600">{description}</p>
                  {project.price_start ? (
                    <p className="text-sm font-medium text-slate-900">Від {priceFormatter.format(project.price_start)}</p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
