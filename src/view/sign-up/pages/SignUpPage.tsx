"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import LockIcon from "@/assets/icons/LockIcon";
import UserIcon from "@/assets/icons/UserIcon";
import MailIcon from "@/assets/icons/MailIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InputGroup from "@/components/inputs/InputGroup";
import SocialButton from "@/components/buttons/SocialButton";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useUserSignUpMutation } from "../slice/sign-up.slice";

const SignUpPage = () => {
  const [userSignUp, { isLoading }] = useUserSignUpMutation();

  const handleUserSignUp = async (values: object) => {
    const data = await userSignUp(values);

    console.log(data);
  };

  return (
    <div className="container w-full px-2.5 md:w-[80%] mx-auto pt-[55px]">
      <div className="flex items-center justify-center gap-6">
        <span className="block w-[100px] h-[4px] bg-primary-color"></span>
        <h1 className="heading">Signup</h1>
        <span className="block w-[100px] h-[4px] bg-primary-color"></span>
      </div>

      <div className="flex items-center justify-between gap-10 md:my-[85px] my-12">
        <div className="lg:w-1/2  w-full">
          <Formik
            initialValues={{
              email: "",
              password: "",
              user_name: "",
              is_agree: false,
              confirmPassword: "",
            }}
            onSubmit={handleUserSignUp}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="px-8 py-9 border border-border-primary rounded-[20px]"
              >
                <div className="mb-4">
                  <SocialButton icon={<FacebookIcon />}>
                    Continue with Facebook
                  </SocialButton>
                </div>

                <div className="mb-4">
                  <SocialButton icon={<GoogleIcon />}>
                    Continue with Google
                  </SocialButton>
                </div>

                <div className="flex items-center gap-4">
                  <span className="block w-full h-[1px] bg-y-50"></span>
                  <span className="text-black-400 text-sm font-medium">OR</span>
                  <span className="block w-full h-[1px] bg-y-50"></span>
                </div>

                <div className="flex flex-col gap-6">
                  <InputGroup
                    type="text"
                    name="user_name"
                    label="Username *"
                    placeholder="name"
                    icon={<UserIcon />}
                  />

                  <InputGroup
                    type="email"
                    name="email"
                    icon={<MailIcon />}
                    label="Your email *"
                    placeholder="example@example.com"
                  />

                  <div className="flex max-md:flex-col items-center justify-between gap-3">
                    <InputGroup
                      type="password"
                      name="password"
                      label="Password *"
                      icon={<LockIcon />}
                      placeholder="XXXXXXXXXXXX"
                    />

                    <InputGroup
                      type="password"
                      icon={<LockIcon />}
                      name="confirmPassword"
                      label="Confirm Password *"
                      placeholder="XXXXXXXXXXXX"
                    />
                  </div>

                  <div className="flex items-center gap-2 ">
                    <Field
                      name="is_agree"
                      id="aggreement"
                      type="checkbox"
                      className="border border-text-blar rounded-[2px] w-4 h-4 checked:bg-y-50 checkbox"
                    />

                    <label
                      htmlFor="aggreement"
                      className="text-sm text-text-blar"
                    >
                      I agree to{" "}
                      <b className="text-black-600">term and conditions</b>
                    </label>
                  </div>
                </div>

                <div className="my-10">
                  <ButtonPrimary>Create New Account</ButtonPrimary>
                </div>

                <div className="flex max-md:flex-col items-center justify-center gap-2 mt-10">
                  <p className="text-text-blar">Already have an account! </p>

                  <Link href="/login" className=" text-black-600 font-semibold">
                    Login Here !
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="relative w-1/2 max-lg:hidden">
          <Image
            src="/images/login-bg.png"
            width={600}
            height={600}
            alt="Login Rafiki"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
