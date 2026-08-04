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
            <PortfolioCatalogCard {...item} />
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
