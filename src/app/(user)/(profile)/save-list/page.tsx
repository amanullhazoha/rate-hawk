import { Metadata } from "next";
import { SaveListPageView } from "@/view/save-list";

export const metadata: Metadata = {
  title: "Save List",
};

const SaveListPage = () => {
  return <SaveListPageView />;
};

export default SaveListPage;
