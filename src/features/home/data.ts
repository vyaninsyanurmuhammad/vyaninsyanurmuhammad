import { portfolioCatalogItems } from "@/features/portfolio-catalog/data";
import type { PortfolioCatalogItem } from "@/features/portfolio-catalog/types/catalog-item";

export type NavItem = { title: string; href: string };

export type WorkItem = {
  title: string;
  work: string;
  period: string;
  description: string;
  href: string;
  tools: string[];
};

export type ProjectItem = Omit<PortfolioCatalogItem, "slug" | "featured">;

export type ContactLink =
  | { type: "github"; href: string }
  | { type: "linkedin"; href: string }
  | { type: "instagram"; href: string }
  | { type: "x"; href: string }
  | { type: "discord"; href: string };

export const navigations: NavItem[] = [
  { title: "About Me", href: "#about" },
  { title: "Work Experience", href: "#work" },
  { title: "Project Experience", href: "#project" },
  { title: "Portfolio Catalog", href: "#catalog" },
];

export const works: WorkItem[] = [
  {
    title: "Front End Web Developer",
    work: "WIT.ID",
    period: "Sep 2024 – Present",
    description:
      "Developed and maintained a multi-platform ecosystem of dashboard-centric web applications — management dashboard, booking system, POS, kiosk, vending, and photobox — using Next.js (App Router), React 18, TypeScript, Tailwind CSS, and Shadcn/UI. Built complex UI workflows including data tables, filters, forms, analytics views, and real-time status monitoring. Implemented secure authentication flows, protected routes, and WebSocket-based real-time updates for multi-location monitoring. Owned features end-to-end with backend engineers, optimized Core Web Vitals (LCP, CLS, TBT), and drove refactoring initiatives on legacy codebases.",
    href: "https://wit.id/",
    tools: [
      "Next.js",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "WebSocket",
    ],
  },
  {
    title: "Intern Front End Web Developer",
    work: "Anti Gravity",
    period: "Jun 2024 – Aug 2024",
    description:
      "Built a gamified, form-heavy web application using Next.js, TypeScript, Tailwind CSS, and Shadcn/UI. Implemented interactive quiz flows, validation logic, and responsive layouts optimized for campaign traffic. Integrated REST APIs for business logic, result processing, and analytics tracking. Improved performance, browser compatibility, and accessibility across devices.",
    href: "https://antigravity.id/",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI"],
  },
  {
    title: "Assistant Lecturer – Serious Game",
    work: "Muhammadiyah University of Yogyakarta",
    period: "Mar 2023 – Jun 2023",
    description:
      "Assisted in delivering Serious Game course to 40+ students, facilitating discussions on game development and interactive technologies. Mentored students in programming fundamentals and problem-solving techniques for gamification web and mobile development.",
    href: "https://www.umy.ac.id/",
    tools: ["JavaScript", "Mentorship"],
  },
  {
    title: "Fullstack Web Developer",
    work: "PT. Blantika Alam Perkasa",
    period: "Sep 2022 – Feb 2023",
    description:
      "Developed a CMS-based company profile website using Laravel, Tailwind CSS, and MySQL, including REST API handling for dynamic content. Implemented responsive UI layouts and improved loading performance through optimized asset delivery. Deployed and maintained the application in production, ensuring stable and secure operation.",
    href: "https://www.linkedin.com/in/cassava-indonesia-5b323622a/?originalSubdomain=id",
    tools: ["Laravel", "PHP", "Tailwind CSS", "MySQL"],
  },
  {
    title: "Fullstack Web Developer",
    work: "CV. Creative Gama Studio",
    period: "Nov 2021 – Dec 2021",
    description:
      "Maintained and enhanced rental property platform using HTML, CSS, JavaScript, PHP, and MySQL. Troubleshot production bugs, improved UI consistency, and deployed updates via cPanel. Improved page loading time and stability through code cleanup and optimized queries.",
    href: "https://creativegamastudio.com/",
    tools: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "cPanel"],
  },
];

export const projects: ProjectItem[] = portfolioCatalogItems.map(
  ({ slug, featured, ...rest }) => rest
);

export const contacts: ContactLink[] = [
  { type: "github", href: "https://github.com/vyaninsyanurmuhamad" },
  {
    type: "linkedin",
    href: "https://www.linkedin.com/in/vyaninsyanurmuhamad/",
  },
  {
    type: "instagram",
    href: "https://www.instagram.com/vyaninsyanurmuhamad/",
  },
  { type: "x", href: "https://x.com/NurVyan" },
  { type: "discord", href: "https://discordapp.com/users/pororo8058" },
];
