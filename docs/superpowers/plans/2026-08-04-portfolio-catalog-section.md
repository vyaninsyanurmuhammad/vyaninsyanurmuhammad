# Portfolio Catalog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visual Portfolio Catalog section on the home page (grid preview) with a CTA button that navigates to a dedicated `/portfolio` page showing the full catalog.

**Architecture:** Extract portfolio items into a shared `portfolio-catalog` feature module as the single source of truth. Reuse existing project content from `home/data.ts` but enrich it with `slug` and `featured` fields. Home renders a preview grid (limited count) via a new `PortfolioCatalogPreview` component; `/portfolio` renders the full grid via `PortfolioCatalogPage`. Both share `PortfolioCatalogCard` for consistent card UI with Next.js `Image`, tool badges, and external links.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (`Button`, `Dialog`), Lucide icons, Biome/Ultracite linter, existing design tokens (`bg-[#0E1200]`, `lime-400/500/600`, `slate-100/400`).

## Global Constraints

- Follow Ultracite/Biome rules: no `<img>`, use `next/image`; buttons need `type="button"`; anchors with `target="_blank"` need `rel="noopener"`; no array index keys; use `import type` for types; no `console`; no TypeScript enums.
- Match existing home page visual language: dark background, lime accent hover states, `font-mono` badges, `CursorSpotlight` on standalone pages.
- Do not remove the existing **Project Experience** list section — catalog is an additive visual grid section.
- Home preview shows **3 items max** (all current projects are featured).
- Full catalog lives at route **`/portfolio`**.
- Home nav adds **Portfolio Catalog** → `#catalog`.
- CTA copy: **View Full Catalog** with `ArrowRight` icon (same pattern as "See My ATS Resume").
- No new npm dependencies.
- No test framework exists in this repo — verify with `npx ultracite check`, `npm run build`, and manual browser QA.

---

## File Map

| File | Responsibility |
|---|---|
| `src/features/portfolio-catalog/types/catalog-item.ts` | `PortfolioCatalogItem` type |
| `src/features/portfolio-catalog/data.ts` | Single source of truth for all catalog items |
| `src/features/portfolio-catalog/components/portfolio-catalog-card.tsx` | Reusable catalog card (image, title, tools, link) |
| `src/features/portfolio-catalog/components/portfolio-catalog-preview.tsx` | Home section: grid preview + CTA button |
| `src/features/portfolio-catalog/portfolio-catalog.tsx` | Full catalog page client component |
| `src/app/portfolio/page.tsx` | Next.js route wrapper with `Suspense` + `LoaderBrand` |
| `src/features/home/data.ts` | Re-export `projects` from catalog data (backward compat) |
| `src/features/home/home.tsx` | Insert preview section, nav item, scroll-spy key `catalog` |
| `next.config.ts` | Allow remote image host `gavrainvest.co.id` |

---

### Task 1: Portfolio Catalog Types & Data

**Files:**
- Create: `src/features/portfolio-catalog/types/catalog-item.ts`
- Create: `src/features/portfolio-catalog/data.ts`
- Modify: `src/features/home/data.ts`

**Interfaces:**
- Consumes: existing `ProjectItem` shape from `src/features/home/data.ts`
- Produces:
  ```typescript
  export type PortfolioCatalogItem = {
    slug: string;
    image: string;
    title: string;
    description: string;
    href: string[];
    tools: string[];
    featured: boolean;
  };
  export const portfolioCatalogItems: PortfolioCatalogItem[];
  export const PORTFOLIO_PREVIEW_LIMIT = 3;
  export const getFeaturedCatalogItems: () => PortfolioCatalogItem[];
  export const getCatalogItemBySlug: (slug: string) => PortfolioCatalogItem | undefined;
  ```

- [ ] **Step 1: Create type file**

Create `src/features/portfolio-catalog/types/catalog-item.ts`:

```typescript
export type PortfolioCatalogItem = {
  slug: string;
  image: string;
  title: string;
  description: string;
  href: string[];
  tools: string[];
  featured: boolean;
};
```

- [ ] **Step 2: Create catalog data file**

Create `src/features/portfolio-catalog/data.ts`:

```typescript
import type { PortfolioCatalogItem } from "./types/catalog-item";

export const PORTFOLIO_PREVIEW_LIMIT = 3;

export const portfolioCatalogItems: PortfolioCatalogItem[] = [
  {
    slug: "bni-rise-community-dashboard",
    image: "/bni-rise-community-dashboard.jpg",
    title: "BNI Rise Community Dashboard",
    description:
      "Developed a full-stack community management platform supporting member directories, event management, and analytics. Designed RESTful APIs and relational database schemas using Prisma ORM. Implemented authentication and role-based access control (RBAC) for admin and member features. Delivered analytics dashboards serving 500+ active users.",
    href: ["https://bnirise.com/"],
    tools: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "Express.js",
      "Prisma",
      "MySQL",
    ],
    featured: true,
  },
  {
    slug: "habitat-ecosystem",
    image: "/habitat-ecosystem-smart-venue.jpg",
    title: "Habitat Ecosystem",
    description:
      "Developed a digital ecosystem for smart venue operations with six interconnected platforms: smart kiosk, photobox, vending machine, POS, management dashboard, and customer booking. Implemented real-time multi-location monitoring enabling venue operators to track operations across different sites. Created responsive interfaces ensuring consistent UX across all touchpoints and device types.",
    href: ["https://habitat.id/"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Bootstrap", "Shadcn/UI"],
    featured: true,
  },
  {
    slug: "gavra-trading-education-platform",
    image: "https://gavrainvest.co.id/og-image.jpg",
    title: "Gavra – Trading Education Platform",
    description:
      "Developed scalable trading education platform connecting educators with learners in a community-driven environment. Built comprehensive dashboard for course management including content upload, student enrollment, and product management. Implemented user analytics system providing insights on engagement, course completion rates, and learning patterns.",
    href: ["https://gavrainvest.co.id/"],
    tools: ["Next.js", "React.js", "TypeScript", "Zustand", "Tailwind CSS"],
    featured: true,
  },
  {
    slug: "la-live-bold-personality-test",
    image: "/la-live-bold-personality-test.jpg",
    title: "LA – Live Bold Personality Test",
    description:
      "Gamified event website with interactive quiz-based personality test. Added engaging animations and smooth transitions, plus answer analysis for personalized recommendations and analytics tracking.",
    href: ["https://www.livebold.id/"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI"],
    featured: false,
  },
];

export const getFeaturedCatalogItems = (): PortfolioCatalogItem[] =>
  portfolioCatalogItems
    .filter((item) => item.featured)
    .slice(0, PORTFOLIO_PREVIEW_LIMIT);

export const getCatalogItemBySlug = (
  slug: string
): PortfolioCatalogItem | undefined =>
  portfolioCatalogItems.find((item) => item.slug === slug);
```

> **Note:** Gavra image uses `/og-image.jpg` fallback path. If that URL 404s at build/runtime, replace with a local asset in `public/gavra-trading-platform.jpg` and update the `image` field. The full catalog page shows all 4 items; home preview shows only the 3 featured ones.

- [ ] **Step 3: Point home data at catalog source**

Modify `src/features/home/data.ts` — replace inline `projects` array with re-export:

```typescript
import {
  portfolioCatalogItems,
  type PortfolioCatalogItem,
} from "@/features/portfolio-catalog/data";

export type ProjectItem = Omit<PortfolioCatalogItem, "slug" | "featured">;

export const projects: ProjectItem[] = portfolioCatalogItems.map(
  ({ slug, featured, ...rest }) => rest
);
```

Keep all other exports (`works`, `navigations`, `contacts`) unchanged.

- [ ] **Step 4: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors related to `portfolio-catalog` or `home/data.ts`

- [ ] **Step 5: Commit**

```bash
git add src/features/portfolio-catalog/types/catalog-item.ts \
        src/features/portfolio-catalog/data.ts \
        src/features/home/data.ts
git commit -m "feat: add shared portfolio catalog data module"
```

---

### Task 2: Portfolio Catalog Card Component

**Files:**
- Create: `src/features/portfolio-catalog/components/portfolio-catalog-card.tsx`

**Interfaces:**
- Consumes: `PortfolioCatalogItem` fields passed as props
- Produces:
  ```typescript
  type PortfolioCatalogCardProps = {
    slug: string;
    image: string;
    title: string;
    description: string;
    href: string[];
    tools: string[];
    variant?: "preview" | "full";
  };
  export default function PortfolioCatalogCard(props: PortfolioCatalogCardProps): JSX.Element;
  ```

- [ ] **Step 1: Create card component**

Create `src/features/portfolio-catalog/components/portfolio-catalog-card.tsx`:

```tsx
"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PortfolioCatalogCardProps = {
  slug: string;
  image: string;
  title: string;
  description: string;
  href: string[];
  tools: string[];
  variant?: "preview" | "full";
};

const PortfolioCatalogCard = ({
  slug,
  image,
  title,
  description,
  href,
  tools,
  variant = "full",
}: PortfolioCatalogCardProps) => {
  const [isLinkDialogOpen, setLinkDialogOpen] = useState(false);
  const isPreview = variant === "preview";
  const truncatedDescription = isPreview
    ? `${description.slice(0, 140)}…`
    : description;

  const onCardClick = () => {
    if (href.length < 2) {
      window.open(href[0], "_blank", "noopener,noreferrer");
      return;
    }
    setLinkDialogOpen(true);
  };

  return (
    <>
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 transition-colors hover:border-lime-400/30 hover:bg-zinc-900/70"
        data-slug={slug}
      >
        <button
          aria-label={`Open ${title}`}
          className="flex h-full cursor-pointer flex-col text-left"
          onClick={onCardClick}
          type="button"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
            <Image
              alt={title}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={image}
            />
          </div>

          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-white group-hover:text-lime-400">
                {title}
              </h3>
              <ArrowUpRight
                aria-hidden
                className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 group-hover:scale-110 group-hover:text-lime-400"
              />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              {truncatedDescription}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  className="rounded-full bg-lime-400/10 px-3 py-1 font-mono text-slate-100 text-xs group-hover:bg-lime-400/20 group-hover:text-lime-400"
                  key={`${slug}-${tool}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </button>
      </article>

      <Dialog onOpenChange={setLinkDialogOpen} open={isLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Links</DialogTitle>
            <DialogDescription>Select a project link to open.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {href.map((url) => (
              <Link
                className="break-all text-lime-600 underline"
                href={url}
                key={`${slug}-${url}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {url}
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PortfolioCatalogCard;
```

- [ ] **Step 2: Lint the new file**

Run: `npx ultracite check src/features/portfolio-catalog/components/portfolio-catalog-card.tsx`
Expected: PASS (fix any formatting with `npx ultracite fix` if needed)

- [ ] **Step 3: Commit**

```bash
git add src/features/portfolio-catalog/components/portfolio-catalog-card.tsx
git commit -m "feat: add reusable portfolio catalog card component"
```

---

### Task 3: Home Preview Section + Navigation

**Files:**
- Create: `src/features/portfolio-catalog/components/portfolio-catalog-preview.tsx`
- Modify: `src/features/home/data.ts` (navigations)
- Modify: `src/features/home/home.tsx`

**Interfaces:**
- Consumes: `getFeaturedCatalogItems()` from Task 1, `PortfolioCatalogCard` from Task 2
- Produces:
  ```typescript
  export default function PortfolioCatalogPreview(): JSX.Element;
  ```

- [ ] **Step 1: Create preview section component**

Create `src/features/portfolio-catalog/components/portfolio-catalog-preview.tsx`:

```tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFeaturedCatalogItems } from "../data";
import PortfolioCatalogCard from "./portfolio-catalog-card";

const PortfolioCatalogPreview = () => {
  const featuredItems = getFeaturedCatalogItems();

  return (
    <section
      aria-labelledby="portfolio-catalog-heading"
      className="flex scroll-mt-24 flex-col gap-8"
      id="catalog"
    >
      <div className="flex flex-col gap-2">
        <p
          className="after: after:-bottom-1 relative w-fit font-semibold text-lg text-white uppercase"
          id="portfolio-catalog-heading"
        >
          Portfolio Catalog
        </p>
        <p className="max-w-2xl text-slate-400 text-sm">
          Selected projects in a visual catalog. Open the full page to browse
          every item.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredItems.map((item) => (
          <li className="h-full" key={item.slug}>
            <PortfolioCatalogCard {...item} variant="preview" />
          </li>
        ))}
      </ul>

      <Link href="/portfolio">
        <Button
          className="group w-fit cursor-pointer rounded-full bg-lime-700 hover:bg-lime-700/80"
          type="button"
        >
          View Full Catalog
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </Link>
    </section>
  );
};

export default PortfolioCatalogPreview;
```

- [ ] **Step 2: Add nav item in home data**

Modify `src/features/home/data.ts` — append to `navigations`:

```typescript
export const navigations: NavItem[] = [
  { title: "About Me", href: "#about" },
  { title: "Work Experience", href: "#work" },
  { title: "Project Experience", href: "#project" },
  { title: "Portfolio Catalog", href: "#catalog" },
];
```

- [ ] **Step 3: Wire preview into home page**

Modify `src/features/home/home.tsx`:

1. Add import:
   ```typescript
   import PortfolioCatalogPreview from "@/features/portfolio-catalog/components/portfolio-catalog-preview";
   ```

2. Add ref after `projectsRef`:
   ```typescript
   const catalogRef = useRef<HTMLElement | null>(null);
   ```

3. Extend `Key` union and `validKeys` array with `"catalog"`.

4. Add to `sections` array:
   ```typescript
   { el: catalogRef.current, key: "catalog" },
   ```

5. Extend `isActive` state union with `"catalog"`.

6. Add GSAP `sectionIds` entry: `"catalog"`.

7. Add sticky sidebar copy for `isActive === "catalog"` (mirror project section style):
   ```tsx
   {isActive === "catalog" && (
     <motion.p
       animate={{ opacity: 1 }}
       className="relative z-10 text-start font-semibold text-6xl text-white uppercase leading-[0.8] xl:text-6xl 2xl:text-7xl"
       exit={{ opacity: 0 }}
       initial={{ opacity: 0 }}
     >
       Project
       <br />
       <span className="text-lime-500">Catalog</span>
     </motion.p>
   )}
   ```

8. Insert section in JSX **after** the `#project` section and **before** the footer grid:
   ```tsx
   <div
     className="pt-16 md:pt-20"
     ref={catalogRef}
   >
     <PortfolioCatalogPreview />
   </div>
   ```

- [ ] **Step 4: Lint & format**

Run: `npx ultracite fix src/features/home/home.tsx src/features/home/data.ts src/features/portfolio-catalog/components/portfolio-catalog-preview.tsx`
Expected: PASS

- [ ] **Step 5: Manual verify on dev server**

Run: `npm run dev`
Check:
- Sidebar nav shows **Portfolio Catalog**
- Clicking nav scrolls to `#catalog`
- Grid shows 3 featured cards
- **View Full Catalog** button is visible (link goes to `/portfolio` — page not built yet, 404 expected)

- [ ] **Step 6: Commit**

```bash
git add src/features/portfolio-catalog/components/portfolio-catalog-preview.tsx \
        src/features/home/data.ts \
        src/features/home/home.tsx
git commit -m "feat: add portfolio catalog preview section on home"
```

---

### Task 4: Full Catalog Page (`/portfolio`)

**Files:**
- Create: `src/features/portfolio-catalog/portfolio-catalog.tsx`
- Create: `src/app/portfolio/page.tsx`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: `portfolioCatalogItems` from Task 1, `PortfolioCatalogCard` from Task 2
- Produces:
  ```typescript
  export default function PortfolioCatalog(): JSX.Element;
  ```

- [ ] **Step 1: Configure remote images**

Modify `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gavrainvest.co.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Create full catalog feature component**

Create `src/features/portfolio-catalog/portfolio-catalog.tsx`:

```tsx
"use client";

import Link from "next/link";
import CursorSpotlight from "@/components/common/cursor-spotlight";
import BrandIcon from "@/components/icons/brand-icon";
import { Button } from "@/components/ui/button";
import { portfolioCatalogItems } from "./data";
import PortfolioCatalogCard from "./components/portfolio-catalog-card";

export default function PortfolioCatalog() {
  return (
    <main className="relative min-h-svh w-full font-sans">
      <CursorSpotlight />

      <div className="container mx-auto flex min-h-svh flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <BrandIcon className="aspect-square text-lime-500" />
            <div>
              <p className="font-mono text-slate-400 text-xs uppercase">
                Portfolio
              </p>
              <h1 className="font-bold text-3xl text-white md:text-4xl">
                Full Catalog
              </h1>
            </div>
          </div>

          <Link href="/">
            <Button
              className="cursor-pointer rounded-full"
              type="button"
              variant="outline"
            >
              Back to Home
            </Button>
          </Link>
        </header>

        <p className="max-w-3xl text-slate-400">
          Complete collection of shipped projects — dashboards, platforms, and
          campaign experiences built with Next.js, TypeScript, and modern
          frontend tooling.
        </p>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioCatalogItems.map((item) => (
            <li className="h-full" key={item.slug}>
              <PortfolioCatalogCard {...item} variant="full" />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Create route page**

Create `src/app/portfolio/page.tsx`:

```tsx
import { Suspense } from "react";
import LoaderBrand from "@/components/brands/loader-brand";
import PortfolioCatalog from "@/features/portfolio-catalog/portfolio-catalog";

export default function PortfolioPage() {
  return (
    <Suspense fallback={<LoaderBrand />}>
      <PortfolioCatalog />
    </Suspense>
  );
}
```

- [ ] **Step 4: Production build verify**

Run: `npm run build`
Expected: PASS with no Image domain errors

If Gavra remote image fails, add local fallback:
```bash
# Place a screenshot at public/gavra-trading-platform.jpg
# Update data.ts image field to "/gavra-trading-platform.jpg"
```

- [ ] **Step 5: Manual QA checklist**

| Check | Expected |
|---|---|
| Home → View Full Catalog | Navigates to `/portfolio` |
| `/portfolio` grid | Shows all 4 catalog items |
| Card click (single href) | Opens project in new tab |
| Card image | Renders without broken layout |
| Back to Home | Returns to `/` |
| Keyboard | Cards focusable; Enter opens link dialog or external URL |
| Mobile | Grid collapses to 1 column |

- [ ] **Step 6: Final lint**

Run: `npx ultracite check src/features/portfolio-catalog/ src/app/portfolio/ next.config.ts`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/features/portfolio-catalog/portfolio-catalog.tsx \
        src/app/portfolio/page.tsx \
        next.config.ts
git commit -m "feat: add full portfolio catalog page at /portfolio"
```

---

## Self-Review

### Spec coverage

| Requirement | Task |
|---|---|
| Portfolio catalog section on home | Task 3 |
| Button navigates to full page | Task 3 (CTA) + Task 4 (page) |
| Full catalog display | Task 4 |
| Consistent with existing design | Tasks 2–4 (lime/zinc tokens, existing patterns) |
| Shared data (no duplication) | Task 1 |
| Nav link to section | Task 3 |

### Placeholder scan

No TBD/TODO/similar-to-task placeholders found.

### Type consistency

- `PortfolioCatalogItem` defined once in Task 1; used by card, preview, and full page.
- `slug` used as React key throughout (not array index).
- `ProjectItem` remains backward-compatible for existing `ProjectArchiveCard` usage.

### Known follow-ups (out of scope)

- Add missing image assets to `public/` (`bni-rise-community-dashboard.jpg`, `habitat-ecosystem-smart-venue.jpg`, `la-live-bold-personality-test.jpg`).
- Per-item detail route `/portfolio/[slug]` (not requested).
- Filter/search on catalog page (not requested — YAGNI).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-04-portfolio-catalog-section.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
