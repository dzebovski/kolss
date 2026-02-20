import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Link} from '@/src/i18n/navigation';

import {LanguageSwitcher} from './language-switcher';

type HeaderProps = {
  variant?: 'default' | 'light';
};

export async function Header({variant = 'default'}: HeaderProps) {
  const tNavigation = await getTranslations('Navigation');

  return (
    <header className="border-b border-slate-200 bg-white/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link className="flex items-center" href="/">
          <Image src="/kolss-logo.svg" alt="KOLSS" width={167} height={25} priority />
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-3 text-sm md:gap-6 md:text-base"
        >
          {variant === 'default' && (
            <>
              <a
                className="text-slate-700 transition hover:text-slate-900"
                href="#featured-kitchens"
              >
                {tNavigation('catalog')}
              </a>
              <a className="text-slate-700 transition hover:text-slate-900" href="#features">
                {tNavigation('about')}
              </a>
              <a className="text-slate-700 transition hover:text-slate-900" href="#contacts">
                {tNavigation('contacts')}
              </a>
            </>
          )}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
