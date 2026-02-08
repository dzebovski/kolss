import Image from 'next/image';
import {CheckCircle2, ShieldCheck, Zap} from 'lucide-react';
import {getLocale, getTranslations} from 'next-intl/server';

import {FadeIn} from '@/src/components/animations/fade-in';
import {ContactForm} from '@/src/components/forms/contact-form';
import {LanguageSwitcher} from '@/src/components/layout/language-switcher';
import {VideoSection} from '@/src/components/sections/video-section';
import {routing} from '@/src/i18n/routing';
import {Link} from '@/src/i18n/navigation';
import {kitchenProjects} from '@/src/lib/mock-data/mock-data';
import {AppLocale} from '@/src/types';

export default async function HomePage() {
  const requestLocale = await getLocale();
  const locale: AppLocale = routing.locales.includes(requestLocale as AppLocale)
    ? (requestLocale as AppLocale)
    : 'uk';

  const tNavigation = await getTranslations('Navigation');
  const tHero = await getTranslations('Hero');
  const tFeatures = await getTranslations('Features');
  const tFeatured = await getTranslations('FeaturedKitchens');
  const tCta = await getTranslations('CTA');
  const tFooter = await getTranslations('Footer');

  const featuredItems = kitchenProjects.filter((project) => project.isFeature).slice(0, 3);
  const currencyByLocale: Record<AppLocale, string> = {
    uk: 'UAH',
    pl: 'PLN',
    en: 'USD'
  };
  const priceFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyByLocale[locale],
    maximumFractionDigits: 0
  });

  return (
    <>
      <header className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link className="text-xl font-bold text-slate-900" href="/">
            {tNavigation('logo')}
          </Link>

          <nav aria-label="Main navigation" className="flex items-center gap-3 text-sm md:gap-6 md:text-base">
            <a className="text-slate-700 transition hover:text-slate-900" href="#featured-kitchens">
              {tNavigation('catalog')}
            </a>
            <a className="text-slate-700 transition hover:text-slate-900" href="#features">
              {tNavigation('about')}
            </a>
            <a className="text-slate-700 transition hover:text-slate-900" href="#contacts">
              {tNavigation('contacts')}
            </a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-slate-50" id="hero">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center md:px-6 md:py-20">
            <div className="space-y-5">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{tHero('title')}</h1>
              <p className="text-lg text-slate-600">{tHero('subtitle')}</p>
              <Link
                className="inline-flex rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                href="/#featured-kitchens"
              >
                {tHero('cta')}
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Image
                alt={tHero('imageAlt')}
                className="h-auto w-full"
                height={800}
                priority
                quality={85}
                src="/kitchens/nordic-light.svg"
                width={1200}
              />
            </div>
          </div>
        </section>

        <section id="features">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
            <h2 className="text-3xl font-semibold text-slate-900">{tFeatures('title')}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-slate-200 bg-white p-6">
                <Zap className="h-6 w-6 text-slate-900" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{tFeatures('speed.title')}</h3>
                <p className="mt-2 text-slate-600">{tFeatures('speed.description')}</p>
              </article>

              <article className="rounded-xl border border-slate-200 bg-white p-6">
                <CheckCircle2 className="h-6 w-6 text-slate-900" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{tFeatures('quality.title')}</h3>
                <p className="mt-2 text-slate-600">{tFeatures('quality.description')}</p>
              </article>

              <article className="rounded-xl border border-slate-200 bg-white p-6">
                <ShieldCheck className="h-6 w-6 text-slate-900" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{tFeatures('warranty.title')}</h3>
                <p className="mt-2 text-slate-600">{tFeatures('warranty.description')}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-slate-50" id="featured-kitchens">
          <FadeIn className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
            <h2 className="text-3xl font-semibold text-slate-900">{tFeatured('title')}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {featuredItems.map((project) => {
                const title = project.title[locale];
                const description = project.description[locale];
                const formattedPrice = project.priceStart ? priceFormatter.format(project.priceStart) : null;

                return (
                  <article className="overflow-hidden rounded-xl border border-slate-200 bg-white" key={project.id}>
                    <Image
                      alt={tFeatured('imageAlt', {title})}
                      className="h-auto w-full"
                      height={800}
                      quality={85}
                      src={project.images[0]}
                      width={1200}
                    />
                    <div className="space-y-3 p-5">
                      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                      <p className="text-sm text-slate-600">{description}</p>
                      {formattedPrice ? (
                        <p className="text-sm font-medium text-slate-900">
                          {tFeatured('priceFrom')}: {formattedPrice}
                        </p>
                      ) : null}
                      <Link className="text-sm font-medium text-slate-900 underline" href={`/kitchens/${project.slug}`}>
                        {tFeatured('catalogButton')}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6" id="video">
          <FadeIn>
            <VideoSection />
          </FadeIn>
        </section>

        <section id="contacts">
          <FadeIn className="mx-auto w-full max-w-6xl px-4 py-16 text-center md:px-6">
            <h2 className="text-3xl font-semibold text-slate-900">{tCta('title')}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">{tCta('subtitle')}</p>
            <div className="mx-auto mt-8 max-w-3xl text-left">
              <ContactForm />
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto w-full max-w-6xl px-4 text-sm text-slate-600 md:px-6">{tFooter('copyright')}</div>
      </footer>
    </>
  );
}
