import { Suspense } from "react";
import { ResetPasswordPage } from "@/view/reset-password";

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
};

export default ResetPassword;
