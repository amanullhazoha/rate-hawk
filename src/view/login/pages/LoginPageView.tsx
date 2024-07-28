"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LockIcon from "@/assets/icons/LockIcon";
import MailIcon from "@/assets/icons/MailIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InputGroup from "@/components/inputs/InputGroup";
import { userLoginSchema } from "../schema/login.schema";
import { useUserLoginMutation } from "../slice/login.slice";
import SocialButton from "@/components/buttons/SocialButton";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

const LoginPageView = () => {
  const router = useRouter();
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const handleLogin = async (values: object) => {
    const data: any = await userLogin(values);

    if (data?.error) {
      toast.error(data?.error?.data?.message);
    } else {
      localStorage.setItem("access_token", data?.data?.access_token);

      toast.success("User Login Successfully.");

      if (data) {
        router.push("/");
      }
    }
  };

  return (
    <main>
      <div className="container w-full px-2.5 md:w-[80%] mx-auto pt-[55px]">
        <div className="flex items-center justify-center gap-6">
          <span className="block w-[100px] h-[4px] bg-primary-color"></span>
          <h1 className="heading">Login</h1>
          <span className="block w-[100px] h-[4px] bg-primary-color"></span>
        </div>

        <div className="flex items-center justify-between gap-10 md:my-[85px] my-12">
          <div className="lg:w-1/2 w-full">
            <div className="px-4 md:px-8 py-9 border border-border-primary rounded-[20px]">
              <div className="mb-4">
                <SocialButton
                  icon={<FacebookIcon />}
                  authLink={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/facebook-login`}
                >
                  Continue with Facebook
                </SocialButton>
              </div>

              <div className="mb-4">
                <SocialButton
                  icon={<GoogleIcon />}
                  authLink={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/google-login`}
                >
                  Continue with Google
                </SocialButton>
              </div>

              <div className="flex items-center gap-4">
                <span className="block w-full h-[1px] bg-y-50"></span>
                <span className="text-black-400 text-sm font-medium">OR</span>
                <span className="block w-full h-[1px] bg-y-50"></span>
              </div>

              <Formik
                onSubmit={handleLogin}
                validationSchema={userLoginSchema}
                initialValues={{ email: "", password: "" }}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                      <InputGroup
                        type="email"
                        name="email"
                        icon={<MailIcon />}
                        label="Email address"
                        placeholder="example@example.com"
                      />

                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="text-black-800">
                            Password
                          </label>

                          <Link
                            href="/forget-password"
                            className="text-black-400 text-sm font-medium underline"
                          >
                            Forgot password?
                          </Link>
                        </div>

                        <InputGroup
                          label=""
                          type="password"
                          name="password"
                          icon={<LockIcon />}
                          placeholder="XXXXXXXXXXXX"
                        />
                      </div>

                      <ButtonPrimary type="submit" disabled={isLoading}>
                        Continue
                      </ButtonPrimary>
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="flex items-center justify-center gap-2 mt-6">
                <p className="text-text-blar">New user? </p>
                <Link href="/signup" className=" text-black-600 font-semibold">
                  Create an account
                </Link>
              </div>
            </div>
          </div>

          <div className="relative w-1/2 max-lg:hidden">
            <Image
              width={600}
              height={600}
              alt="Login Rafiki"
              src="/images/login.png"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPageView;
