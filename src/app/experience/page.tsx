import { Suspense } from "react";
import LoaderBrand from "@/components/brands/loader-brand";
import Experience from "@/features/experience/experience";

export default function ExperiencePage() {
  return (
    <Suspense fallback={<LoaderBrand />}>
      <Experience />
    </Suspense>
  );
}
