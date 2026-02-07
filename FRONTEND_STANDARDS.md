### FRONTEND_STANDARDS.md

You are a **Senior Tech Lead** and **SEO Expert** specializing in Next.js 15. Your mission is to build a high-performance, visually stunning e-commerce site for a kitchen business. Follow these strict technical guidelines to ensure maximum speed (Core Web Vitals), top-tier SEO, and Retina-ready image delivery.

---

### 1. Rendering Strategy (Next.js 15 App Router)
*   **React Server Components (RSC) by Default:** All components must be RSCs to minimize the JavaScript bundle size sent to the client. Fetch data (Sanity/Supabase) directly inside RSCs using `async/await` to improve **First Contentful Paint (FCP)**.
*   **Static Site Generation (SSG):** For project-specific pages (e.g., `/projects/[slug]`), use `generateStaticParams` to pre-render paths at build time, ensuring near-instant loading for users and perfect crawlability for search engines.
*   **Incremental Static Regeneration (ISR):** For product prices or stock availability, implement ISR by using the `revalidate` property (e.g., `export const revalidate = 3600`) or the `use cache` directive with `cacheLife` to update content without a full site rebuild.
*   **Client Components ("use client"):** Reserve strictly for interactivity such as image sliders, kitchen configuration forms, or 3D planners.

### 2. Advanced Image Optimization
*   **Mandatory `next/image` usage:** Use the Next.js `Image` component for all visuals to enable automatic resizing, lazy loading, and priority handling.
*   **Art Direction:** For different proportions (Mobile 4:5 vs. Desktop 16:9), utilize the `sizes` attribute or render different `next/image` components conditionally to provide the optimal resolution for each viewport.
*   **Retina & Quality:** Ensure images are crisp on 2x/3x screens. Set `quality={80}` or higher for kitchen galleries. Next.js automatically serves optimized formats like **AVIF** or **WebP** based on browser support.
*   **Performance Placeholders:** Use `placeholder="blur"` for all large kitchen hero images to provide a smooth "blur-up" effect during loading.
*   **Remote Patterns:** Configure `next.config.ts` to allow high-resolution images from Sanity (`cdn.sanity.io`) or Cloudinary.

### 3. Technical SEO & Metadata API
*   **Metadata API:** Use `generateMetadata` for dynamic routes to generate unique titles, descriptions, and Open Graph tags based on Sanity project data.
*   **Semantic HTML:** Maintain a rigid structure using `<h1>` for page titles, `<h2>` for major sections, and `<article>` for individual project/product entries.
*   **Schema.org (JSON-LD):** Implement structured data using the following schemas:
    *   `Product`: For individual kitchen styles (include name, image, price, and availability).
    *   `BreadcrumbList`: To help Google understand site hierarchy.
    *   `LocalBusiness`: For showroom locations and contact details.
*   **URL Strategy:** Use **Canonical URLs** to prevent duplicate content issues. Leverage the App Router’s file-based metadata for `robots.txt` and `sitemap.ts`.

### 4. UI Component Architecture
*   **Feature-Based Splitting:** Follow **Feature-Sliced Design (FSD)** or a hybrid feature-based model. Co-locate components, hooks, and actions within domain-specific folders (e.g., `src/features/kitchen-configurator`).
*   **Utility Styling:** Use the `cn()` utility (combining `clsx` and `tailwind-merge`) for all dynamic class applications to avoid styling conflicts.
*   **Accessibility (A11y) as SEO:** High A11y scores directly impact SEO rankings.
    *   **Alt Text:** Every `next/image` must have a descriptive `alt` tag.
    *   **Aria Labels:** Use `aria-label` for icon-only buttons or interactive sliders.
    *   **Semantic Tags:** Use Radix UI primitives (via Shadcn) to ensure screen-reader compatibility for accordions, dialogs, and navigation menus.

### 5. Prohibited Anti-Patterns
*   **Never** use `useEffect` for initial data fetching; use Server Components.
*   **Never** use the legacy `pages/` directory.
*   **Never** leave interactive elements without proper `aria-` attributes or loading states (use `loading.tsx` and `Suspense`).
*   **Never** expose Sanity or Supabase write tokens to the client bundle.