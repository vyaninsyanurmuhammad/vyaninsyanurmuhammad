"use client";

import React, { useEffect } from "react";

const LOADING_DELAY_MS = 10_000; // 1 second loading time

export type DelayLayoutProps = {
  children?: React.ReactNode;
};

export default function DelayLayout({ children }: DelayLayoutProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Simulate short loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
