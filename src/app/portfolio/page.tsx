import { Suspense } from "react";
import LoaderBrand from "@/components/brands/loader-brand";
import PortfolioCatalog from "@/features/portfolio-catalog/portfolio-catalog";

export default function PortfolioPage() {
  return (
    <Suspense fallback={<LoaderBrand />}>
      <PortfolioCatalog />
    </Suspense>
  );
}
