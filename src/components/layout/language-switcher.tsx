'use client';

import {useLocale, useTranslations} from 'next-intl';

import {usePathname, useRouter} from '@/src/i18n/navigation';

import {Button} from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const locales = ['uk', 'pl', 'en'] as const;
type Locale = (typeof locales)[number];

const flagByLocale: Record<Locale, string> = {
  uk: '🇺🇦',
  pl: '🇵🇱',
  en: '🇬🇧'
};

function isLocale(s: string): s is Locale {
  return locales.includes(s as Locale);
}

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = isLocale(locale) ? locale : 'uk';

  const handleLocaleChange = (nextLocale: Locale) => {
    router.replace(pathname, {locale: nextLocale});
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label={t('localeLabel')}
          className="min-w-[10rem] justify-start gap-2 text-slate-700 hover:text-slate-900"
        >
          <span className="text-lg leading-none" aria-hidden>
            {flagByLocale[currentLocale]}
          </span>
          {t(currentLocale)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          {(locales as readonly Locale[]).map((loc) => (
            <DropdownMenuCheckboxItem
              key={loc}
              checked={currentLocale === loc}
              onCheckedChange={() => handleLocaleChange(loc)}
            >
              <span className="mr-2 text-base leading-none" aria-hidden>
                {flagByLocale[loc]}
              </span>
              {t(loc)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
