import { Metadata } from "next";
import { LoginPageView } from "@/view/login";

export const metadata: Metadata = {
  title: "Login",
};
const Login = () => {
  return <LoginPageView />;
};

export default Login;
