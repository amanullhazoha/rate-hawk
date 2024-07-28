"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LockIcon from "@/assets/icons/LockIcon";
import UserIcon from "@/assets/icons/UserIcon";
import MailIcon from "@/assets/icons/MailIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InputGroup from "@/components/inputs/InputGroup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userSignupSchema } from "../schema/sign-up.schema";
import SocialButton from "@/components/buttons/SocialButton";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useUserSignUpMutation } from "../slice/sign-up.slice";

const SignUpPage = () => {
  const router = useRouter();
  const [userSignUp, { isLoading }] = useUserSignUpMutation();

  const handleUserSignUp = async (values: object) => {
    const data: any = await userSignUp(values);

    if (data?.error) {
      toast.error(data?.error?.data?.message);
    } else {
      toast.success("User sign up successfully.");

      if (data) {
        router.push("/email-verification");
      }
    }
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
              initialValues={{
                email: "",
                password: "",
                user_name: "",
                is_agree: false,
                confirmPassword: "",
              }}
              onSubmit={handleUserSignUp}
              validationSchema={userSignupSchema}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
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

                    <div className="flex max-md:flex-col justify-between gap-3">
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

                    <div>
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

                      <ErrorMessage
                        name="is_agree"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="my-10">
                    <ButtonPrimary disabled={isLoading}>
                      Create New Account
                    </ButtonPrimary>
                  </div>

                  <div className="flex max-md:flex-col items-center justify-center gap-2 mt-10">
                    <p className="text-text-blar">Already have an account! </p>

                    <Link
                      href="/login"
                      className=" text-black-600 font-semibold"
                    >
                      Login Here !
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
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
