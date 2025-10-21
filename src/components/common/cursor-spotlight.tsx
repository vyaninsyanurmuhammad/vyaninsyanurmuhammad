"use client";
import { useRef } from "react";
import useFollowPointerHook from "@/hooks/use-follow-pointer";
import { cn } from "@/lib/utils";

export type CursorSpotlightProps = {
  /**
   * Ukuran radius spotlight dalam pixel
   * @default 600
   */
  size?: number;
  /**
   * Warna RGB spotlight (tanpa alpha)
   * @default "192, 255, 0" (lime)
   */
  color?: string;
  /**
   * Opacity spotlight (0-1)
   * @default 0.15
   */
  opacity?: number;
  /**
   * Persentase transparansi pada tepi spotlight
   * @default "80%"
   */
  fadeEdge?: string;
  /**
   * Class name tambahan untuk styling
   */
  className?: string;
};

export default function CursorSpotlight({
  size = 600,
  color = "192, 255, 0",
  opacity = 0.15,
  fadeEdge = "80%",
  className,
}: CursorSpotlightProps) {
  const ref = useRef(null);
  const { x, y } = useFollowPointerHook();

  return (
    <div
      className={cn(
        "-z-0 pointer-events-none absolute inset-0 hidden text-white md:block",
        className
      )}
      ref={ref}
      style={{
        backgroundImage: `radial-gradient(${size}px at ${x}px ${y}px, rgba(${color}, ${opacity}), transparent ${fadeEdge})`,
      }}
    />
  );
}
