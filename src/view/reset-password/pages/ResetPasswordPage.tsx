"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Form } from "formik";
import LockIcon from "@/assets/icons/LockIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import InputGroup from "@/components/inputs/InputGroup";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useResetPasswordMutation } from "../slice/reset-password.slice";

const ResetPasswordPage = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async (values: object) => {
    const data = await resetPassword(values);

    console.log(data);
  };

  return (
    <main>
      <div className="container w-full px-2.5 md:w-[80%] mx-auto flex items-center justify-center py-10">
        <div className="flex w-full h-full items-center justify-between ">
          <div className="relative w-1/2 max-lg:hidden">
            <Image
              src="/images/reset-pass-bg.png"
              width={500}
              height={500}
              alt="Reset Password Rafiki"
            />
          </div>

          <div className="lg:w-1/2 w-full ">
            <Formik initialValues={{}} onSubmit={handleResetPassword}>
              {({ handleSubmit }) => (
                <Form className="" onSubmit={handleSubmit}>
                  <h1 className="heading">Reset Your Password</h1>

                  <div className="flex items-center justify-center gap-2 text-black-600 font-medium max-md:mb-8">
                    <ProfileIcon />
                    <p className="text-center">example@example.com</p>
                  </div>

                  <div>
                    <InputGroup
                      type="password"
                      name="password"
                      label="Password *"
                      icon={<LockIcon />}
                      placeholder="XXXXXXXXXXXX"
                    />

                    <div className="mt-6">
                      <InputGroup
                        type="password"
                        icon={<LockIcon />}
                        name="confirmPassword"
                        label="Confirm Password *"
                        placeholder="XXXXXXXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="my-10">
                    <ButtonPrimary>Submit</ButtonPrimary>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-6">
                    <p className="text-text-blar">
                      Don’t have an account yet?{" "}
                    </p>
                    <Link
                      href="/signup"
                      className=" text-black-600 font-semibold"
                    >
                      Sign Up
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
