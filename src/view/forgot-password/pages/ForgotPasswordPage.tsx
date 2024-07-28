"use client";

import Image from "next/image";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import MailIcon from "@/assets/icons/MailIcon";
import InputGroup from "@/components/inputs/InputGroup";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useForgotPasswordMutation } from "../slice/forgot-password.slice";

const ForgetPasswordPage = () => {
  const router = useRouter();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPassword = async (values: object) => {
    const data: any = await forgotPassword(values);

    if (data?.error) {
      toast.error(data?.error?.data?.message);
    } else {
      toast.success("Send reset password link successfully.");

      if (data) {
        router.push("/reset-verification");
      }
    }
  };

  return (
    <main>
      <div className="container w-full px-2.5 md:w-[80%] mx-auto flex items-center justify-center py-10">
        <div className="flex w-full h-full items-center justify-between">
          <div className="relative w-1/2 max-md:hidden">
            <Image
              src="/images/forgot-pass-bg.png"
              width={500}
              height={500}
              alt="Login Rafiki"
            />
          </div>

          <div className="md:w-1/2 w-full">
            <div className="max-w-[500px] flex items-center justify-center md:justify-end">
              <Formik
                initialValues={{ email: "" }}
                onSubmit={handleForgotPassword}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <h1 className="text-3xl lg:text-5xl font-semibold text-black-800">
                      Forgot Password?
                    </h1>

                    <div className="max-w-[327px]">
                      <p className="text-base md:text-lg font-medium text-black-400 pt-2">
                        Enter the email address associated with your account.
                      </p>
                    </div>

                    <div className="mt-8 mb-6">
                      <InputGroup
                        type="email"
                        name="email"
                        icon={<MailIcon />}
                        label="Email address"
                        placeholder="example@example.com"
                      />
                    </div>

                    <ButtonPrimary disabled={isLoading}>Next</ButtonPrimary>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgetPasswordPage;
