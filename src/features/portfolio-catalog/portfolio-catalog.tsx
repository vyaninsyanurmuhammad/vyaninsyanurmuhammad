"use client";

import Link from "next/link";
import CursorSpotlight from "@/components/common/cursor-spotlight";
import BrandIcon from "@/components/icons/brand-icon";
import { Button } from "@/components/ui/button";
import PortfolioCatalogCard from "./components/portfolio-catalog-card";
import { portfolioCatalogItems } from "./data";

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
              <PortfolioCatalogCard {...item} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
