import { Metadata } from "next";
import { SignUpPage } from "@/view/sign-up";

export const metadata: Metadata = {
  title: "Sign Up",
};

const Signup = () => {
  return <SignUpPage />;
};

export default Signup;
