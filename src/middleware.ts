import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';

import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const hasLocaleCookie = request.cookies.get('NEXT_LOCALE');

    if (!hasLocaleCookie) {
      const geoCountry = (request as NextRequest & {geo?: {country?: string}}).geo
        ?.country;
      const headerCountry = request.headers.get('x-vercel-ip-country');
      const country = geoCountry ?? headerCountry;

      let targetLocale: 'uk' | 'pl' | 'en' = 'en';
      if (country === 'UA') targetLocale = 'uk';
      if (country === 'PL') targetLocale = 'pl';

      const url = request.nextUrl.clone();
      url.pathname = `/${targetLocale}`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)', '/']
};
