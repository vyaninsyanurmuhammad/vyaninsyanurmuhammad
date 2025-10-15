import { Suspense } from "react";
import Home from "@/features/home/home";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
