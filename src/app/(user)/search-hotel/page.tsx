import { Suspense } from "react";
import { SearchPageView } from "@/view/search-hotel";

const SearchHotel = () => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <SearchPageView />
    </Suspense>
  );
};

export default SearchHotel;
