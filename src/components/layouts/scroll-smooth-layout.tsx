"use client";

import Lenis from "lenis";
import type React from "react";
import { useEffect, useRef } from "react";

export default function ScrollSmoothLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rafRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Constants to avoid magic numbers and improve readability
  const LENIS_DEFAULT_DURATION = 1.0;
  const LENIS_EASING_TARGET = 1.001;
  const LENIS_EASING_POWER = -10;

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: LENIS_DEFAULT_DURATION,
      easing: (t: number) =>
        Math.min(1, LENIS_EASING_TARGET - 2 ** (LENIS_EASING_POWER * t)),
      smoothWheel: true,
      orientation: "vertical",
    });
    lenisRef.current = lenis;

    // Mark html with lenis class for CSS compatibility (globals.css already handles this)
    document.documentElement.classList.add("lenis");

    // Dispatch a custom event so other hooks/components (like pointer glow) can sync with Lenis scroll
    const onLenisScroll = (e: { scroll: number }) => {
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", { detail: { scroll: e.scroll } })
      );
    };
    lenis.on("scroll", onLenisScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.off("scroll", onLenisScroll);
      document.documentElement.classList.remove("lenis");
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
