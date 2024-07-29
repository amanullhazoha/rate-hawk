import { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordPage } from "@/view/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPassword = () => {
  return <ResetPasswordPage />;
};

export default ResetPassword;
