import { Metadata } from "next";
import { AdminLoginPageView } from "@/view/login";

export const metadata: Metadata = {
  title: "Login",
};
const Login = () => {
  return <AdminLoginPageView />;
};

export default Login;
