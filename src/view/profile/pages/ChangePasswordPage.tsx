"use client";

import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import LockIcon from "@/assets/icons/LockIcon";
import InputGroup from "@/components/inputs/InputGroup";
import { useUserPasswordChangeMutation } from "../slice";
import { userChangePasswordSchema } from "../schema/profile.schema";
import { useRouter } from "next/navigation";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [userPasswordChange, { isLoading }] = useUserPasswordChangeMutation();

  const handleChangePassword = async (values: any) => {
    const data = await userPasswordChange(values);

    if (!data?.error) {
      router.push("/profile");

      return toast.success("Password change successfully.");
    }

    toast.error("Password not change.");
  };

  return (
    <div className="px-5 py-5">
      <div className="mb-8">
        <h3 className="text-4xl font-semibold text-black mb-8">
          Update your password
        </h3>

        <p className="w-28 h-[1px] bg-border-primary"></p>
      </div>

      <Formik
        initialValues={{
          new_password: "",
          old_password: "",
          confirm_password: "",
        }}
        onSubmit={handleChangePassword}
        validationSchema={userChangePasswordSchema}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <InputGroup
                type="password"
                name="old_password"
                icon={<LockIcon />}
                label="Current password"
                placeholder="XXXXXXXXXXXX"
              />

              <InputGroup
                type="password"
                name="new_password"
                icon={<LockIcon />}
                label="New password"
                placeholder="XXXXXXXXXXXX"
              />

              <InputGroup
                type="password"
                icon={<LockIcon />}
                name="confirm_password"
                label="Confirm password"
                placeholder="XXXXXXXXXXXX"
              />
            </div>

            <div className="my-5">
              <button className="bg-primary-color font-medium text-center rounded-lg  py-2 px-5 text-md text-black-600 border border-[#DBDBDB] font-secondary">
                Update password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordPage;
