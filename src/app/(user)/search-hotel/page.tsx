import { Metadata } from "next";
import { SearchPageView } from "@/view/search-hotel";

export const metadata: Metadata = {
  title: "Search Result",
};

const SearchHotel = () => {
  return <SearchPageView />;
};

export default SearchHotel;
