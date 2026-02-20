'use client';

import {ChangeEvent} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';

const locales = ['uk', 'pl', 'en'] as const;
type Locale = (typeof locales)[number];

function toLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = nextLocale;
    return `/${segments.join('/')}`;
  }

  return `/${nextLocale}/${segments.join('/')}`;
}

export function LanguageSwitcher() {
  const params = useParams<{locale?: string}>();
  const pathname = usePathname();
  const router = useRouter();

  const locale = locales.includes((params?.locale ?? '') as Locale)
    ? ((params?.locale as Locale) ?? 'uk')
    : 'uk';

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    router.push(toLocalePath(pathname, nextLocale));
  };

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
      <span className="sr-only">Вибір мови</span>
      <select
        aria-label="Вибір мови"
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm"
        onChange={onChange}
        value={locale}
      >
        <option value="uk">🇺🇦 Українська</option>
        <option value="pl">🇵🇱 Polski</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </label>
  );
}
