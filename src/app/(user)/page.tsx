import { Suspense } from "react";
import { HomePageView } from "@/view/home";

export default function Home() {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <HomePageView />
    </Suspense>
  );
}
