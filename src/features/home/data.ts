export type NavItem = { title: string; href: string };

export type WorkItem = {
  title: string;
  work: string;
  description: string;
  href: string;
  tools: string[];
};

export type ProjectItem = {
  image: string;
  title: string;
  description: string;
  href: string[]; // bisa 1 atau lebih link
  tools: string[];
};

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
];

export const works: WorkItem[] = [
  {
    title: "Front End Web Developer",
    work: "WIT.ID",
    description:
      "Sep 2024 – Present. Built a multi-platform digital ecosystem for smart venues (smart kiosk, photobox, vending, POS, dashboard, booking) using Next.js, TypeScript, and Tailwind CSS. Shipped Gavra Trading Platform with community features, course management, and analytics (Next.js + Jotai). Maintained Royal Medika Pharmalab by fixing critical bugs and adding event management (registration & attendance). Built BNI Rise Community Dashboard for 100+ members with directory, events, and engagement analytics.",
    href: "https://wit.id/",
    tools: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "Jotai",
      "Analytics",
    ],
  },
  {
    title: "Intern Front End Web Developer",
    work: "Anti Gravity",
    description:
      "Jun 2024 – Aug 2024. Built a gamified event website with interactive quiz personality test using Next.js, TypeScript, and Tailwind CSS. Delivered responsive UX with smooth interactions to boost brand engagement and awareness.",
    href: "https://antigravity.id/",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI"],
  },
  {
    title: "Assistant Lecturer of Serious Game",
    work: "Muhammadiyah University of Yogyakarta",
    description:
      "Mar 2023 – Jun 2023. Assisted delivery of Serious Game course to 40+ students; facilitated discussions on game development & interactive tech; mentored JavaScript and problem-solving.",
    href: "https://www.umy.ac.id/",
    tools: ["JavaScript", "Mentorship"],
  },
  {
    title: "Fullstack Web Developer",
    work: "PT. Blantika Alam Perkasa",
    description:
      "Sep 2022 – Feb 2023. Developed company profile website with CMS using Laravel, Tailwind CSS, and MySQL; deployed to Hostinger, stabilizing and establishing digital presence.",
    href: "https://www.linkedin.com/in/cassava-indonesia-5b323622a/?originalSubdomain=id",
    tools: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Hostinger"],
  },
  {
    title: "Fullstack Web Developer",
    work: "CV. Creative Gama Studio",
    description:
      "Nov 2021 – Dec 2021. Maintained rental property website with HTML, CSS, JS, PHP, MySQL; deployed updates to cPanel improving stability and UX.",
    href: "https://creativegamastudio.com/",
    tools: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "cPanel"],
  },
];

export const projects: ProjectItem[] = [
  {
    image: "/habitat-ecosystem-smart-venue.jpg",
    title: "Habitat Ecosystem",
    description:
      "Developed digital ecosystem for smart venue operations with six interconnected platforms (smart kiosk, photobox, vending, POS, dashboard, booking). Implemented real-time multi-location monitoring and responsive interfaces for consistent UX across devices.",
    href: ["https://habitat.id/"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI"],
  },
  {
    image: "https://gavrainvest.co.id/",
    title: "Gavra - Trading Education Platform",
    description:
      "Built scalable platform connecting educators and learners with community features. Implemented dashboard for course management (content, enrollment, products) and analytics for engagement and completion.",
    href: ["#"],
    tools: ["Next.js", "React.js", "TypeScript", "Redux", "Tailwind CSS"],
  },
  {
    image: "/bni-rise-community-dashboard.jpg",
    title: "BNI Rise Community Dashboard",
    description:
      "Developed community management platform with member directory (search + filtering), event scheduling & registration, and engagement analytics for 500+ members.",
    href: ["https://bnirise.com/"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI"],
  },
  {
    image: "/la-live-bold-personality-test.jpg",
    title: "LA - Live Bold Personality Test",
    description:
      "Gamified event website with interactive quiz-based personality test. Added engaging animations and smooth transitions, plus answer analysis for personalized recommendations and analytics tracking.",
    href: ["https://www.livebold.id/"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI"],
  },
];

export const contacts: ContactLink[] = [
  { type: "github", href: "https://github.com/vyaninsyanurmuhammad" },
  {
    type: "linkedin",
    href: "https://www.linkedin.com/in/vyaninsyanurmuhammad/",
  },
  {
    type: "instagram",
    href: "https://www.instagram.com/vyaninsyanurmuhammad/",
  },
  { type: "x", href: "https://x.com/NurVyan" },
  { type: "discord", href: "https://discordapp.com/users/pororo8058" },
];
