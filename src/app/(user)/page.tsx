import { Suspense } from "react";
import { Metadata } from "next";
import { HomePageView } from "@/view/home";
import Preloader from "@/components/loading/Preloader";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-20">
          <Preloader title="Home Page Loading.." />
        </div>
      }
    >
      <HomePageView />
    </Suspense>
  );
}
