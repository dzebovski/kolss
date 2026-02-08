import Image from 'next/image';
import Link from 'next/link';
import {CheckCircle2, ShieldCheck, Zap} from 'lucide-react';

import {FadeIn} from '@/src/components/animations/fade-in';
import {ContactForm} from '@/src/components/forms/contact-form';
import {LanguageSwitcher} from '@/src/components/layout/language-switcher';
import {VideoSection} from '@/src/components/sections/video-section';
import {Button} from '@/src/components/ui/button';
import {getLocalizedProjectText, getProjects, normalizeLocale, type ProjectRow} from '@/src/lib/projects/projects';

type PageProps = {
  params: Promise<{locale: string}>;
};

export default async function Home({params}: PageProps) {
  const {locale: localeParam} = await params;
  const locale = normalizeLocale(localeParam);

  let projects: ProjectRow[] = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('[home] failed to load projects:', error);
  }
  const featuredItems = projects.filter((project) => project.is_featured).slice(0, 3);
  const projectsToRender = featuredItems.length > 0 ? featuredItems : projects.slice(0, 3);

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
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <a className="text-lg font-bold tracking-wide text-slate-900" href="#hero">
            KOLSS
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm text-slate-700">
            <Link className="transition hover:text-slate-900" href={`/${locale}/catalog`}>
              Каталог
            </Link>
            <a className="transition hover:text-slate-900" href="#features">
              Про нас
            </a>
            <a className="transition hover:text-slate-900" href="#contacts">
              Контакти
            </a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-slate-50" id="hero">
          <FadeIn className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-6 md:py-20">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">Кухні на замовлення під ваш стиль життя</h1>
              <p className="mt-4 text-lg text-slate-600">
                Проєктуємо, виготовляємо та монтуємо сучасні кухні: чесні терміни, якісні матеріали, зрозумілий процес.
              </p>
              <Button asChild className="mt-8" size="lg">
                <Link href={`/${locale}/catalog`}>Перейти до каталогу</Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                alt="Сучасна кухня у світлих тонах"
                className="h-auto w-full"
                height={800}
                priority
                quality={85}
                src="/kitchens/nordic-light.svg"
                width={1200}
              />
            </div>
          </FadeIn>
        </section>

        <section id="features">
          <FadeIn className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
            <h2 className="text-3xl font-semibold text-slate-900">Наші переваги</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-slate-200 bg-white p-6">
                <Zap className="h-6 w-6 text-slate-900" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">Швидкість</h3>
                <p className="mt-2 text-slate-600">Працюємо за чітким графіком від замірів до монтажу без затримок.</p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-6">
                <CheckCircle2 className="h-6 w-6 text-slate-900" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">Якість</h3>
                <p className="mt-2 text-slate-600">Підбираємо матеріали та фурнітуру, які служать роками.</p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-6">
                <ShieldCheck className="h-6 w-6 text-slate-900" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">Гарантія</h3>
                <p className="mt-2 text-slate-600">Надаємо гарантійне обслуговування та підтримку після встановлення.</p>
              </article>
            </div>
          </FadeIn>
        </section>

        <section className="bg-slate-50" id="featured-kitchens">
          <FadeIn className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
            <h2 className="text-3xl font-semibold text-slate-900">Популярні моделі</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {projectsToRender.map((project) => {
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
                    <div className="space-y-2 p-5">
                      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                      <p className="text-sm text-slate-600">{description}</p>
                      {project.price_start ? (
                        <p className="text-sm font-medium text-slate-900">Від {priceFormatter.format(project.price_start)}</p>
                      ) : null}
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
          <FadeIn className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
            <h2 className="text-center text-3xl font-semibold text-slate-900">Готові обговорити ваш проєкт?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              Заповніть форму і менеджер зв&apos;яжеться з вами для безкоштовної консультації.
            </p>
            <div className="mx-auto mt-8 max-w-3xl">
              <ContactForm />
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6">
        <div className="mx-auto w-full max-w-6xl px-4 text-sm text-slate-600 md:px-6">© 2026 KOLSS. Всі права захищені.</div>
      </footer>
    </>
  );
}
