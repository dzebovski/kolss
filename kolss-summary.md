# KOLSS Project Summary

## 1. Project Idea
KOLSS is a multilingual web application for showcasing and selling custom kitchen solutions.

Core product idea:
- present a portfolio/catalog of kitchen models;
- give users a fast way to submit a lead;
- automatically distribute each lead to CRM and communication channels;
- store every lead in the database as a reliable source of truth.

## 2. Current Status
Current state based on the codebase:
- multilingual landing page is implemented (`/uk`, `/pl`, `/en`);
- catalog page is implemented (`/[locale]/catalog`) with data from Supabase;
- full backend lead-processing pipeline with integrations is implemented;
- unit + e2e test coverage exists for core scenarios;
- dependency `opencode-ai` was added to `package.json` and `package-lock.json` (aligned).

## 3. Technology Stack
- Framework: Next.js 16 (App Router)
- Language: TypeScript (strict mode)
- UI: Tailwind CSS v4, Shadcn UI (new-york), Radix primitives, Lucide icons
- Animations: Framer Motion
- Forms: React Hook Form + Zod
- i18n: next-intl
- Data/backend: Supabase (DB + Storage)
- Integrations: Pipedrive, Telegram, Slack
- Testing:
  - Unit: Vitest + Testing Library + jsdom
  - E2E: Playwright
- Linting: ESLint (Next core-web-vitals + typescript)

## 4. Architecture and Structure

### 4.1 Routing and Localization
- Locales: `uk`, `pl`, `en`
- Main routes:
  - `src/app/[locale]/page.tsx` - homepage
  - `src/app/[locale]/catalog/page.tsx` - catalog
- Middleware (`src/middleware.ts`):
  - when a user opens `/` and `NEXT_LOCALE` is missing, Geo-IP redirect is applied;
  - `UA -> /uk`, `PL -> /pl`, others -> `/en`;
  - then standard `next-intl` middleware handles locale routing.
- SEO metadata is generated at locale layout level (`generateMetadata`) from the `SEO` translation namespace.

### 4.2 Key Directories
- `src/app` - pages and layouts
- `src/actions` - server actions (lead submission flow)
- `src/components` - UI/sections/forms
- `src/lib` - Supabase clients, validation, utilities, project data layer
- `src/i18n` - localization configuration
- `messages` - `uk/pl/en` translations
- `tests` - Playwright e2e tests
- `src/__tests__` - Vitest unit tests
- `.github/workflows/playwright.yml` - CI Playwright workflow

## 5. Implemented Pages and UI

### 5.1 Homepage
`src/app/[locale]/page.tsx` includes:
- Header with navigation and language switcher;
- Hero section with CTA;
- Features section (speed/quality/warranty);
- Featured kitchens (3 cards with localized title/description);
- Video section (background video + modal dialog);
- Contact section with lead form;
- Footer.

Featured block data currently comes from `src/lib/mock-data/mock-data.ts`.

### 5.2 Catalog
`src/app/[locale]/catalog/page.tsx`:
- performs server-side read from Supabase `projects` table;
- localizes `title/description` using `getLocalizedProjectText`;
- formats prices per locale (`UAH/PLN/USD`);
- logs errors and renders an empty list fallback if data fetch fails.

## 6. Implemented Form and Server Pipeline

### 6.1 Validation
- Client + server validation is unified via one Zod schema: `src/lib/validation/contact.ts`.
- Fields: `name`, `phone`, `email`, `message`, `preferredContact`, `budget`, `file`.

### 6.2 Lead Submission Flow
Main logic: `src/actions/contact.ts`.

Execution order:
1. Validate payload with `contactSchema`.
2. If a file exists:
   - upload to Supabase Storage bucket `kitchen-assets` (`leads/...`);
   - obtain public URL.
3. Run integrations with isolated failure handling (separate `try/catch` blocks):
   - Pipedrive;
   - Telegram;
   - Slack.
4. Persist lead to Supabase `leads` table regardless of partial integration failures.
5. Return to UI:
   - success message if all integrations pass;
   - partial warning if DB save passed but one or more integrations failed;
   - hard error on critical failure.

### 6.3 Pipedrive Logic (Current)
Implemented chain:
1. `POST /persons` -> get `person_id`
2. `POST /leads` with `person_id` -> get `lead_id`
3. `POST /notes` with `lead_id` + lead text/budget/file URL

This is important because note content is not sent directly in create lead payload.

### 6.4 Telegram and Slack
- Telegram: sends a composed text summary via bot to target chat.
- Slack: sends structured blocks plus clickable file link.

## 7. Supabase Layer
Files:
- `src/lib/supabase/env.ts` - env read/validation
- `src/lib/supabase/server.ts` - SSR client via `@supabase/ssr`
- `src/lib/supabase/browser.ts` - browser client
- `src/lib/supabase/admin.ts` - admin client (service role, fallback to publishable key)

Used env variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PIPEDRIVE_API_TOKEN`
- `PIPEDRIVE_API_URL` (optional, has default)
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `SLACK_WEBHOOK_URL`

## 8. Testing and Quality

### 8.1 Unit Tests (Vitest)
Covered areas:
- utility functions (currency format + slug);
- `leadFormSchema` validation for valid/invalid input;
- `KitchenCard` rendering (price + style badge).

Session result:
- `npm run test:unit` -> 3 test files, 6 tests, all passed.

### 8.2 E2E Tests (Playwright)
Implemented scenarios:
- open `/uk`;
- redirect from `/` to localized route;
- switch language via UI;
- render kitchen cards;
- open `/uk/catalog`;
- verify contact form presence.

### 8.3 Linting
Session result:
- `npm run lint` passed with no errors.

## 9. Aligned Working Tree Changes
During review, local changes were found and aligned:
- `package.json`: added `opencode-ai@^1.2.4`
- `package-lock.json`: synchronized lock entries for `opencode-ai` and platform optional packages.

No other unexpected repository changes were found.

## 10. Known Limitations / Technical Debt
- `README.md` is still the default create-next-app template and does not describe the real architecture.
- Homepage featured cards use mock data, while catalog already uses Supabase; data sources are split.
- Mock data references `classic-ivory.svg`, but this file does not exist in `public/kitchens`.
- Catalog contains static Ukrainian UI strings (`"Каталог кухонь"`, `"На головну"`, `"Від ..."`) without i18n.
- `next.config.ts` currently allows only `cdn.sanity.io` and `res.cloudinary.com`; no dedicated Supabase image host pattern is configured.

## 11. Recommended Next Steps
1. Unify data source: move Home featured section from mock data to Supabase `projects` (using `is_featured`).
2. Fully localize catalog page strings (H1, back link, price prefix).
3. Add `not-found.tsx`, `loading.tsx`, and thank-you flow after successful form submission.
4. Extract integrations (Pipedrive/Slack/Telegram) into `src/lib/services/*` for easier testing and maintenance.
5. Replace `README.md` with real project documentation and an operational runbook for env vars and integrations.
