"use client";

import React from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LockIcon from "@/assets/icons/LockIcon";
import MailIcon from "@/assets/icons/MailIcon";
import InfoIcon from "@/assets/icons/InfoIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import SelectIcon from "@/assets/icons/SelectIcon";
import InputGroup from "@/components/inputs/InputGroup";
import { userLoginSchema } from "../schema/login.schema";
import { useUserLoginMutation } from "../slice/login.slice";
import SocialButton from "@/components/buttons/SocialButton";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

const CheckoutLoginPageView = ({ setLoginView }: { setLoginView: any }) => {
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
        // router.push("/");
        setLoginView(false);
      }
    }
  };

  return (
    <main>
      <div className="container w-full px-2.5 md:w-[80%] mx-auto ">
        <div className="flex items-center justify-between gap-10 md:my-[85px] my-12">
          <div className="lg:w-1/2 w-full">
            <div className="px-4 md:px-6 py-5 border border-border-primary rounded-[20px]">
              <div className="mb-4">
                <h3 className="text-[#3a3a3a] text-2xl font-medium mb-1.5">
                  Are you already a customer?
                </h3>
                <p className="text-base font-normal text-black">
                  Log into your account now.
                </p>
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
            </div>
          </div>

          <div className="relative w-full lg:w-1/2">
            <div className="px-4 md:px-5 py-8 border bg-[#f7f7f7] rounded-[20px]">
              <div className="mb-6">
                <h3 className="text-base font-medium text-black mb-0.5">
                  New customer?
                </h3>

                <p className="text-base font-medium text-black">
                  Create an account for the best hotel booking experience:
                </p>
              </div>

              <div className="flex flex-col gap-2 pb-32">
                <div className="flex gap-2.5 items-center">
                  <SelectIcon />

                  <p className="text-[#3a3a3a]">Best Price</p>
                </div>

                <div className="flex gap-2.5 items-center">
                  <SelectIcon />

                  <p className="text-[#3a3a3a]">24/7 Support</p>
                </div>

                <div className="flex gap-2.5 items-center">
                  <SelectIcon />

                  <p className="text-[#3a3a3a]">Many Places</p>
                </div>

                <div className="flex gap-2.5 items-center">
                  <SelectIcon />

                  <p className="text-[#3a3a3a]">Best Hotel</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-center">
                <InfoIcon />
                <p className="text-[#3a3a3a]">
                  The selected room need to select again.
                </p>
              </div>

              <Link href="/signup">
                <ButtonPrimary className="bg-[#3a3a3a] text-white mt-5">
                  Create an account
                </ButtonPrimary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutLoginPageView;
