"use client";

import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import UserIcon from "@/assets/icons/UserIcon";
import MailIcon from "@/assets/icons/MailIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import {
  useGetLoggedInProfileQuery,
  useUserProfileUpdateMutation,
} from "../slice";
import Preloader from "@/components/loading/Preloader";
import LocationIcon from "@/assets/icons/LocationIcon";
import InputGroup from "@/components/inputs/InputGroup";
import SelectInput from "@/components/inputs/SelectInput";
import InputTextArea from "@/components/inputs/InputTextarea";
import { userProfileUpdateSchema } from "../schema/profile.schema";

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetLoggedInProfileQuery("");
  const [userProfileUpdate] = useUserProfileUpdateMutation();

  const handleSubmit = async (values: any) => {
    const data: any = await userProfileUpdate(values);

    if (data?.error) {
      return toast.error(data?.error?.data);
    }

    toast.success("User Profile Update successfully.");
  };

  return (
    <div className="bg-white w-full md:w-[500px]">
      <div className="mb-8">
        <h3 className="text-2xl lg:text-4xl font-semibold text-black mb-8">
          Account information
        </h3>

        <p className="w-28 h-[1px] bg-border-primary"></p>
      </div>

      {isLoading && (
        <div className="w-full flex justify-center items-center h-40">
          <Preloader title="Hotel Detail Page Loading" />
        </div>
      )}

      {!isLoading && !isError && data && (
        <Formik
          initialValues={{
            email: data?.data?.email ? data?.data?.email : "",
            phone: data?.data?.phone ? data?.data?.phone : "",
            gender: data?.data?.gender ? data?.data?.gender : "",
            address: data?.data?.address ? data?.data?.address : "",
            user_name: data?.data?.user_name ? data?.data?.user_name : "",
            bath_date: data?.data?.bath_date ? data?.data?.bath_date : "",
            about_you: data?.data?.about_you ? data?.data?.about_you : "",
          }}
          onSubmit={handleSubmit}
          validationSchema={userProfileUpdateSchema}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <InputGroup
                  type="text"
                  label="Name"
                  name="user_name"
                  placeholder="name"
                  icon={<UserIcon />}
                />

                <InputGroup
                  type="email"
                  name="email"
                  label="Email"
                  disabled={true}
                  icon={<MailIcon />}
                  placeholder="example@example.com"
                />

                <SelectInput
                  name="gender"
                  label="Gender"
                  items={[
                    { id: "male", title: "Male" },
                    { id: "female", title: "Female" },
                  ]}
                />

                <InputGroup
                  type="date"
                  name="bath_date"
                  label="Birth of Date"
                  placeholder=""
                />

                <InputGroup
                  type="text"
                  name="address"
                  label="Address"
                  icon={<LocationIcon fill="#6B7280" />}
                  placeholder="example@example.com"
                />

                <InputGroup
                  type="phone"
                  name="phone"
                  label="Phone"
                  icon={<PhoneIcon fill="#6B7280" />}
                  placeholder="01715378419"
                />

                <InputTextArea
                  name="about_you"
                  label="About you"
                  placeholder="I am"
                />
              </div>

              <div className="mt-5">
                <button className="bg-primary-color font-medium text-center rounded-lg  py-2 px-5 text-md text-black-600 border border-[#DBDBDB] font-secondary">
                  Update info
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ProfilePage;
