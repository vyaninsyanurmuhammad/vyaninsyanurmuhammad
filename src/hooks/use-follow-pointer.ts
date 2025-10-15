"use client";

import { useEffect, useRef, useState } from "react";

export default function useFollowPointerHook() {
  // x,y in document coordinates so we can place gradients on an absolute container that scrolls with the page
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const lastClient = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      lastClient.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY + window.scrollY });
    };

    const onScroll = () => {
      // keep glow anchored to the same viewport pointer position while the page scrolls
      setPos({
        x: lastClient.current.x,
        y: lastClient.current.y + window.scrollY,
      });
    };

    // listen on the window for stability across nested elements
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove as EventListener);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return pos;
}
