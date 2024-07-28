import { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordPage } from "@/view/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
};

export default ResetPassword;
