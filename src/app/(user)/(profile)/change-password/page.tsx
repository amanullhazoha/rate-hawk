import { Metadata } from "next";
import { ChangePasswordPage } from "@/view/profile";

export const metadata: Metadata = {
  title: "Change Password",
};

const ChangePassword = () => {
  return <ChangePasswordPage />;
};

export default ChangePassword;
