import { Metadata } from "next";
import { ContactPage } from "@/view/contact";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact = () => {
  return <ContactPage />;
};

export default Contact;
