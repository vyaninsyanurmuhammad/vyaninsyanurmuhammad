import type { PortfolioCatalogItem } from "./types/catalog-item";

export const PORTFOLIO_PREVIEW_LIMIT = 3;

export const portfolioCatalogItems: PortfolioCatalogItem[] = [
  {
    slug: "bni-rise-community-dashboard",
    image: "/bni-rise-community-dashboard.png",
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
    image: "/habitat-ecosystem-smart-venue.png",
    title: "Habitat Ecosystem",
    description:
      "Developed a digital ecosystem for smart venue operations with six interconnected platforms: smart kiosk, photobox, vending machine, POS, management dashboard, and customer booking. Implemented real-time multi-location monitoring enabling venue operators to track operations across different sites. Created responsive interfaces ensuring consistent UX across all touchpoints and device types.",
    href: ["https://habitat.id/"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Bootstrap", "Shadcn/UI"],
    featured: true,
  },
  {
    slug: "gavra-trading-education-platform",
    image: "/gavra-trading-education-platform.png",
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
  {
    slug: "meere-everyday-essentials",
    image: "/meere-everyday-essentials.png",
    title: "Meere — Everyday Essentials",
    description:
      "Built a modern e-commerce storefront for everyday essentials with an editorial, minimalist layout. Delivered product listing grids with size selectors, wishlist actions, promotional sale sections, and shop-the-look compositions. Designed responsive shopping flows across new arrivals, featured categories, and newsletter signup — balancing clarity, conversion, and refined visual hierarchy.",
    href: ["https://e-commerce-collection-ecommerce-1.vercel.app/"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    featured: false,
  },
  {
    slug: "amara-considered-clothing",
    image: "/amara-considered-clothing.png",
    title: "Amara — Considered Clothing",
    description:
      "Crafted a premium fashion e-commerce experience with hero carousels, trending product rails, and curated collection grids. Implemented countdown sale banners, best-seller filters, brand marquee, journal previews, and trust blocks for returns, shipping, and support. Focused on elevated typography, seasonal storytelling, and polished UI patterns that communicate quiet luxury across the full shopping journey.",
    href: ["https://e-commerce-collection-ecommerce-2.vercel.app/"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
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
