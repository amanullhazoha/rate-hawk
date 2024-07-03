import { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageView } from "@/view/search-hotel";

export const metadata: Metadata = {
  title: "Search Result",
};

const SearchHotel = () => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <SearchPageView />
    </Suspense>
  );
};

export default SearchHotel;
