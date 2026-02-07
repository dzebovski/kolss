'use client';

import {ChangeEvent} from 'react';
import {useLocale, useTranslations} from 'next-intl';

import {AppLocale, routing} from '@/src/i18n/routing';
import {usePathname, useRouter} from '@/src/i18n/navigation';

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const localeFlag: Record<AppLocale, string> = {
    uk: '🇺🇦',
    pl: '🇵🇱',
    en: '🇬🇧'
  };

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as AppLocale;
    router.replace(pathname, {locale: nextLocale});
  };

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
      <span className="sr-only">{t('localeLabel')}</span>
      {t('label')}
      <select
        aria-label={t('localeLabel')}
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm outline-none transition focus:border-slate-500"
        onChange={onChange}
        value={locale}
      >
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {localeFlag[item]} {t(item)}
          </option>
        ))}
      </select>
    </label>
  );
}
