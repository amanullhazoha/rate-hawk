"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import LockIcon from "@/assets/icons/LockIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import InputGroup from "@/components/inputs/InputGroup";
import { useSearchParams, useRouter } from "next/navigation";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { resetPasswordSchema } from "../schema/reset-password.schema";
import { useResetPasswordMutation } from "../slice/reset-password.slice";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async (values: object) => {
    const payload = {
      ...values,
      email: searchParams.get("email"),
      token: searchParams.get("token"),
    };

    if (!payload.email) return toast.error("Email is not exist.");
    if (!payload.token) return toast.error("Token is not exist.");

    const data: any = await resetPassword(payload);

    if (data?.error) {
      toast.error(data?.error?.data?.message);
    } else {
      toast.success("Password reset successfully.");

      if (data) {
        router.push("/login");
      }
    }
  };

  return (
    <main>
      <div className="container w-full px-2.5 md:w-[80%] mx-auto flex items-center justify-center py-10">
        <div className="flex w-full h-full items-center justify-between ">
          <div className="relative w-1/2 max-md:hidden">
            <Image
              src="/images/reset-pass-bg.png"
              width={500}
              height={500}
              alt="Reset Password Rafiki"
            />
          </div>

          <div className="md:w-1/2 w-full ">
            <Formik
              onSubmit={handleResetPassword}
              validationSchema={resetPasswordSchema}
              initialValues={{ password: "", confirmPassword: "" }}
            >
              {({ handleSubmit }) => (
                <Form className="" onSubmit={handleSubmit}>
                  <h1 className="text-3xl lg:text-5xl font-semibold text-black-800">
                    Reset Your Password
                  </h1>

                  <div className="flex items-center justify-center gap-2 text-black-600 font-medium max-md:mb-4 mt-2">
                    <ProfileIcon className="w-10 h-10" />
                    <p className="text-center">{searchParams.get("email")}</p>
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
                    <ButtonPrimary disabled={isLoading}>Submit</ButtonPrimary>
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
