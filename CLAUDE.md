# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 e-commerce website for a kitchen sales business built with the App Router. The site features internationalization (Ukrainian, Polish, English), Supabase backend, Tailwind CSS styling, and integrations with Pipedrive CRM, Telegram, and Slack.

**Tech Stack:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Supabase (authentication, database, file storage)
- next-intl (i18n with locale-based routing)
- Tailwind CSS 4
- Shadcn UI components
- Lucide React (icons)
- React Hook Form + Zod (form validation)
- Vitest (unit tests)
- Playwright (E2E tests)

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Unit tests (Vitest)
npm run test:unit

# E2E tests (Playwright)
npx playwright test

# Run specific test file
npx vitest src/__tests__/path/to/test.test.ts

# UI mode for Playwright
npx playwright test --ui
```

## Required Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
NEXT_PUBLIC_SITE_URL=
PIPEDRIVE_API_TOKEN=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SLACK_WEBHOOK_URL=
```

**Environment Validation:**
- All environment variables are validated at startup using Zod (`src/lib/config/env.validation.ts`)
- Validation runs automatically via `src/lib/config/init.ts` imported in root layout
- Missing or invalid required variables will fail fast with descriptive errors
- Integration variables (Pipedrive, Telegram, Slack) are optional - contact form degrades gracefully

## Architecture & Code Organization

### Directory Structure

```
src/
├── app/[locale]/           # Next.js App Router with locale prefix
│   ├── layout.tsx          # Root layout with locale provider
│   ├── page.tsx            # Homepage
│   └── catalog/            # Product catalog routes
├── actions/                # Server actions
│   └── contact.ts          # Contact form submission with integrations
├── components/             # React components
│   ├── animations/         # Framer Motion animation components
│   ├── cards/              # Reusable card components
│   ├── forms/              # Form components (ContactForm, etc.)
│   ├── layout/             # Layout components (Header, Footer, etc.)
│   ├── sections/           # Page section components
│   └── ui/                 # Shadcn UI primitives (button, dialog, input, etc.)
├── i18n/                   # Internationalization
│   ├── messages/           # Translation files (uk.json, pl.json, en.json)
│   ├── routing.ts          # Locale configuration
│   ├── request.ts          # Server-side i18n setup
│   └── navigation.ts       # Localized navigation helpers
├── lib/                    # Utilities and shared logic
│   ├── config/             # Application configuration
│   │   ├── env.validation.ts  # Zod-based env validation
│   │   └── init.ts         # Startup initialization (imported in root layout)
│   ├── supabase/           # Supabase client setup
│   │   ├── server.ts       # Server-side client
│   │   ├── browser.ts      # Client-side client
│   │   ├── admin.ts        # Admin client with service role
│   │   └── env.ts          # Environment variable helpers (uses validation)
│   ├── utils/              # Utility functions
│   └── validation/         # Zod schemas
├── services/               # External service integrations
│   ├── db/                 # Database operations
│   └── integrations/       # Third-party APIs
│       ├── pipedrive.service.ts
│       ├── telegram.service.ts
│       ├── slack.service.ts
│       └── storage.service.ts
├── types/                  # TypeScript type definitions
├── __tests__/              # Vitest unit tests
└── middleware.ts           # Next.js middleware (geo-based locale detection)
```

### Internationalization (i18n)

**Locale System:**
- Supported locales: `uk` (Ukrainian, default), `pl` (Polish), `en` (English)
- All routes are prefixed with locale: `/uk`, `/pl`, `/en`
- Middleware (`src/middleware.ts`) handles geo-based locale detection using Vercel's geo headers
- Translation files: `src/i18n/messages/{uk,pl,en}.json`

**Usage in Components:**
```typescript
import {useTranslations} from 'next-intl';

function Component() {
  const t = useTranslations('ComponentName');
  return <h1>{t('title')}</h1>;
}
```

**Usage in Server Components:**
```typescript
import {getTranslations} from 'next-intl/server';

async function ServerComponent() {
  const t = await getTranslations('ComponentName');
  return <h1>{t('title')}</h1>;
}
```

### Supabase Client Types

**Three client types exist:**
1. **Browser Client** (`src/lib/supabase/browser.ts`): For client components
2. **Server Client** (`src/lib/supabase/server.ts`): For server components, actions, and route handlers
3. **Admin Client** (`src/lib/supabase/admin.ts`): For operations requiring service role key

Always use the appropriate client type. Never use server-side keys in client components.

### Contact Form Integration Flow

The contact form (`src/actions/contact.ts`) implements a resilient multi-integration pattern:

1. **File Upload**: Uploads file to Supabase Storage (`kitchen-assets` bucket)
2. **Parallel Integrations**: Sends to Pipedrive, Telegram, and Slack independently (each in try/catch)
3. **Pipedrive Flow**: Creates Person → Lead → Note (3 sequential API calls)
4. **Database Backup**: Always saves to Supabase `leads` table regardless of integration failures
5. **Error Visibility**: Returns detailed status for each integration with specific warnings displayed to users

**Key Features:**
- Only attempts configured integrations (checks environment variables)
- Returns warnings for failed integrations (e.g., "Unable to send to: CRM, Telegram")
- Always succeeds if saved to database, even if integrations fail
- Frontend displays warnings in amber alert boxes below success message

See `docs/INTEGRATIONS.md` for detailed integration documentation.

### Image Optimization

All images must use Next.js `Image` component:
- Configured remote patterns: `cdn.sanity.io`, `res.cloudinary.com`, `*.supabase.co`, `*.supabase.in`
- Quality settings: `[75, 85]` defined in `next.config.ts`
- Use `placeholder="blur"` for large hero images
- Always include descriptive `alt` text from translations

### Rendering Strategy

**Follow Next.js 15 best practices:**
- Use React Server Components (RSC) by default
- Use `'use client'` only for interactivity (hooks, event handlers, browser APIs)
- Fetch data directly in Server Components using `async/await`
- Use `generateStaticParams` for static paths (e.g., catalog pages)
- Implement ISR with `revalidate` or `use cache` directive for dynamic content

## Critical Standards

### Frontend & SEO (Read FRONTEND_STANDARDS.md)

**Before writing any frontend code, read `FRONTEND_STANDARDS.md` for:**
- Semantic HTML5 structure requirements (`<header>`, `<main>`, `<section>`, proper heading hierarchy)
- Image optimization rules (art direction, Retina support, placeholder strategy)
- Technical SEO requirements (metadata API, JSON-LD structured data)
- Performance optimization (Core Web Vitals, FCP targets)

### Icons

**Use only Lucide React:**
```typescript
import { Menu, Phone, Check } from 'lucide-react';
```
- Never use `react-icons`, Font Awesome, or inline SVGs (except company logo)
- Style with Tailwind: `className="h-6 w-6 text-primary"`
- For brand icons not in Lucide, create SVG components in `components/icons/`

### Component Guidelines

- Use `'use client'` only when necessary (React hooks, browser APIs)
- Semantic HTML is mandatory (see FRONTEND_STANDARDS.md)
- All images require `alt` text from translations
- Use `cn()` utility (clsx + tailwind-merge) for dynamic classes
- Follow Shadcn UI patterns for accessibility
- Never use `useEffect` for initial data fetching (use Server Components)
- Never expose Supabase write tokens to client

### Path Aliases

TypeScript is configured with `@/*` pointing to project root:
```typescript
import {Button} from '@/src/components/ui/button';
import {createClient} from '@/src/lib/supabase/server';
```

## Testing

**Vitest Unit Tests:**
- Location: `src/__tests__/**/*.test.(ts|tsx)`
- Setup: `tests/setup.ts`
- Environment: jsdom
- Run: `npm run test:unit`

**Playwright E2E Tests:**
- Location: `tests/`
- Base URL: `http://localhost:3000`
- Browsers: Chromium, Firefox, WebKit
- Run: `npx playwright test`

## Language Note

The `.cursorrules` file contains Ukrainian instructions because the development team communicates in Ukrainian. This does not affect the codebase, which uses English for all code, comments, and commit messages.
