"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DiscordIcon from "@/components/icons/discord-icon";
import GitHubIcon from "@/components/icons/github-icon";
import InstagramIcon from "@/components/icons/instagram-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import useFollowPointerHook from "@/hooks/use-follow-pointer";
import { cn } from "@/lib/utils";
import ProjectArchiveCard from "./components/project-archive-card";
import WorkCard from "./components/work-card";
import { contacts as contactLinks, navigations, projects, works } from "./data";

export default function Home() {
  const ref = useRef(null);
  const container = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef(null);
  const jobsRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const certificatesRef = useRef(null);

  const [isActive, setIsActive] = useState<
    | "about"
    | "work"
    | "project"
    | "education"
    | "skills"
    | "certificates"
    | false
  >("about");

  const { x, y } = useFollowPointerHook();

  useEffect(() => {
    // Ensure plugin on client
    gsap.registerPlugin(ScrollTrigger);

    // Force initial active section to 'about' so it's highlighted on first paint
    setIsActive("about");

    const aboutElement = aboutRef.current;
    const projectsElement = projectsRef.current;
    const jobsElement = jobsRef.current;
    const educationElement = educationRef.current;
    const skillsElement = skillsRef.current;
    const certificatesElement = certificatesRef.current;

    const triggers: ScrollTrigger[] = [];

    const makeTrigger = (
      el: Element | null,
      set: () => void,
      start = "top center",
      end = "bottom center"
    ) => {
      if (!el) {
        return;
      }
      const t = ScrollTrigger.create({
        trigger: el,
        start, // valid "triggerPos viewportPos" format
        end,
        markers: false,
        onEnter: set,
        onEnterBack: set,
        invalidateOnRefresh: true,
      });
      triggers.push(t);
    };

    // Make 'about' considered active while it's anywhere broadly in view
    // This avoids needing a tiny scroll to cross "top top".
    makeTrigger(
      aboutElement,
      () => setIsActive("about"),
      "top bottom-=20%",
      "bottom top+=20%"
    );

    // Other sections use a consistent, simple window to become active
    makeTrigger(jobsElement, () => setIsActive("work"));
    makeTrigger(projectsElement, () => setIsActive("project"));
    makeTrigger(educationElement, () => setIsActive("education"));
    makeTrigger(skillsElement, () => setIsActive("skills"));
    makeTrigger(certificatesElement, () => setIsActive("certificates"));

    // Recalculate after layout/paint so initial state is correct
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      for (const t of triggers) {
        t.kill();
      }
      ScrollTrigger.refresh();
    };
  }, []);

  const iconMap = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    instagram: InstagramIcon,
    x: XIcon,
    discord: DiscordIcon,
  } as const;

  const contacts = contactLinks.map((c) => {
    const Icon = iconMap[c.type];
    return { href: c.href, icon: <Icon className="h-8 w-8" /> };
  });

  return (
    <main className="relative min-h-svh w-full">
      <div
        className="-z-0 pointer-events-none absolute inset-0 hidden text-white md:block"
        ref={ref}
        style={{
          backgroundImage: `radial-gradient(600px at ${x}px ${y}px, rgba(192, 255, 0, 0.15), transparent 80%)`,
        }}
      />
      <div
        className="container mx-auto flex min-h-svh flex-col gap-20 px-2.5 md:grid md:grid-cols-2"
        ref={container}
      >
        <div className="top-0 z-0 flex max-h-svh min-h-svh flex-col items-start justify-between py-16 md:sticky md:py-24">
          <div className="h-full w-full md:hidden">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-5xl text-slate-100">
                  Hello, I&apos;m Vyan
                </h1>
                <span className="font-medium text-slate-100 text-xl">
                  A Software Developer from Pati, Indonesia.
                </span>
              </div>
              <p className="w-full max-w-96 text-slate-400 text-xl">
                I Craft digital masterpieces: pixel-perfect, captivating, and
                seamlessly accessible.
              </p>
            </div>
          </div>
          <div className="hidden h-full w-full md:block">
            <AnimatePresence>
              {isActive === "about" && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-6"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-5xl text-slate-100">
                      Hello, I&apos;m Vyan
                    </h1>
                    <span className="font-medium text-slate-100 text-xl">
                      A Software Developer from Pati, Indonesia.
                    </span>
                  </div>
                  <p className="w-full max-w-96 text-slate-400 text-xl">
                    I Craft digital masterpieces: pixel-perfect, captivating,
                    and seamlessly accessible.
                  </p>
                </motion.div>
              )}
              {isActive === "work" && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="relative flex h-fit w-full flex-col gap-6"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <div className="relative h-80 w-full">
                    <Image
                      alt="job-experience"
                      className="!w-[80%]"
                      fill
                      sizes="100%"
                      src={"/job-experience.svg"}
                      style={{ filter: "invert(100%)" }}
                    />
                  </div>

                  <p className="text-slate-400 text-xl">
                    "Design is not just what it looks like and feels like.
                    <br />
                    Design is how it works" -{" "}
                    <span className="text-lime-400 text-xl">Steve Jobs</span>
                  </p>
                </motion.div>
              )}
              {isActive === "project" && (
                <motion.p
                  animate={{ opacity: 1 }}
                  className="relative z-10 text-start font-semibold text-6xl text-white uppercase leading-[0.8] xl:text-6xl 2xl:text-7xl"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  Making
                  <br />
                  <span className="text-lime-500">
                    Good
                    <br />
                    Shit
                  </span>
                  <br />
                  Since
                  <br />
                  2021
                </motion.p>
              )}
              {isActive === "education" && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-6"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <p className="text-slate-400 text-xl">
                    Education background highlighting key achievements and
                    coursework.
                  </p>
                </motion.div>
              )}
              {isActive === "skills" && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-6"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <p className="text-slate-400 text-xl">
                    Technical skills and expertise in various programming
                    languages and frameworks.
                  </p>
                </motion.div>
              )}
              {isActive === "certificates" && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-6"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <p className="text-slate-400 text-xl">
                    Certificates earned to validate professional knowledge and
                    abilities.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-8">
            <div className="group/list flex flex-col gap-1">
              {navigations.map((data, index) => (
                <Link
                  className={cn(
                    "group hover:!opacity-100 flex items-center gap-2 group-hover/list:opacity-50",
                    isActive === data.href.replace("#", "") && "active"
                  )}
                  href={data.href}
                  key={`${index}-${data.title}`}
                >
                  <AnimatePresence>
                    {isActive === data.href.replace("#", "") && (
                      <motion.div
                        animate={{ width: "48px", animation: "ease-in-out" }}
                        className="h-0.5 bg-lime-400"
                        exit={{ width: 0 }}
                        initial={{ width: 0 }}
                        transition={{
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <p className="text-slate-100 text-sm uppercase group-[.active]:text-lime-400">
                    {data.title}
                  </p>
                </Link>
              ))}
            </div>
            <div className="group/list flex items-center gap-4 text-slate-100">
              {contacts.map((data, index) => (
                <motion.div
                  className="group hover:!opacity-100 relative h-8 w-8 group-hover/list:opacity-50"
                  key={`${index}-${data.href}`}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.15,
                  }}
                >
                  <div className="-inset-2 absolute z-0 rounded-xl bg-lime-400/10 opacity-0 backdrop-blur-md duration-200 group-hover:opacity-100" />
                  <Link
                    className="absolute z-10"
                    href={data.href}
                    target="_blank"
                  >
                    {data.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-full w-full pt-0 pb-24 md:pt-24">
          <div className="flex flex-col pt-16 md:pt-20">
            <section
              className="flex scroll-mt-24 flex-col gap-4"
              id="about"
              ref={aboutRef}
            >
              <p className="text-slate-400">
                Front End Developer with 2+ years experience building responsive
                web apps using Next.js, TypeScript, and modern JavaScript
                frameworks. Strong at translating design into functional,
                accessible interfaces with clean code, performance focus, and
                full‑stack awareness.
              </p>
              <p className="text-slate-400">
                Proven to ship in fast-paced environments: integrating
                analytics, state management, and component systems (Shadcn/UI).
                Passionate about crafting delightful, pixel‑perfect experiences
                that work seamlessly across devices.
              </p>
              <p className="text-slate-400">
                Comfortable across the stack: React.js, Next.js, Nest.js,
                Express.js, Laravel, Flutter, Firebase, and MySQL. Continuously
                learning and iterating to deliver high‑quality outcomes.
              </p>
            </section>
            <section
              className="flex scroll-mt-24 flex-col gap-8 pt-16 md:pt-20"
              id="work"
              ref={jobsRef}
            >
              <p className="after: after:-bottom-1 relative w-fit font-semibold text-lg text-white uppercase">
                Work Experience
              </p>
              <ul className="group/list flex flex-col gap-0">
                {works.map(
                  ({ title, work, description, href, tools }, index) => {
                    const isLast = index === works.length - 1;

                    return (
                      <li
                        className="hover:!opacity-100 flex flex-row group-hover/list:opacity-50"
                        key={`${index}-${title}`}
                      >
                        <WorkCard
                          description={description}
                          href={href}
                          isLast={isLast}
                          title={title}
                          tools={tools}
                          work={work}
                        />
                      </li>
                    );
                  }
                )}
              </ul>
            </section>
            <section
              className="flex scroll-mt-24 flex-col gap-8 pt-16 md:pt-20"
              id="project"
              ref={projectsRef}
            >
              <p className="after: after:-bottom-1 relative w-fit font-semibold text-lg text-white uppercase">
                Project Experience
              </p>
              <ul className="group/list flex flex-col gap-8">
                {projects.map(
                  ({ title, description, href, tools, image }, index) => (
                    <li className="h-fit w-full" key={`${index}-${title}`}>
                      <ProjectArchiveCard
                        description={description}
                        href={href}
                        image={image}
                        index={index}
                        title={title}
                        tools={tools}
                      />
                    </li>
                  )
                )}
              </ul>
              <Link
                className="group flex flex-row items-center justify-start gap-2 text-slate-100 hover:text-lime-400"
                href="https://drive.google.com/file/d/1NZcKwzV2YaLcIZbN45QAOK7IiezVWG5c/view?usp=sharing"
              >
                <span>See My ATS Resume</span>
                <ArrowRight className="h-4 w-4 text-slate-100 group-hover:scale-125 group-hover:stroke-2 group-hover:text-lime-400" />
              </Link>
            </section>

            <div className="grid grid-cols-6 gap-2 pt-16 opacity-50 md:pt-20">
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="relative h-6 w-full">
                  <Image
                    alt="brand-white"
                    fill
                    sizes="100%"
                    src={"/brand-white.svg"}
                  />
                </div>
              </div>
              <p className="col-span-5 text-sm text-white">
                Developed by vyaninsyanurmuhammad in Visual Studio Code. Built
                with Next.js and Tailwind CSS, deployed with Vercel. All text is
                set in the Outfit typeface.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
