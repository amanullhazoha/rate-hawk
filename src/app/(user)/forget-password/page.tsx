import { Metadata } from "next";
import { ForgetPasswordPage } from "@/view/forgot-password";

export const metadata: Metadata = {
  title: "Forgot Password",
};
const ForgotPassword = () => {
  return <ForgetPasswordPage />;
};

export default ForgotPassword;
