"use client";

import { Formik, Form } from "formik";
import UserIcon from "@/assets/icons/UserIcon";
import MailIcon from "@/assets/icons/MailIcon";
import InputGroup from "@/components/inputs/InputGroup";
import InputTextArea from "@/components/inputs/InputTextarea";

const ProfilePage = () => {
  return (
    <div className="px-5 py-5">
      <div className="mb-8">
        <h3 className="text-4xl font-semibold text-black mb-8">
          Account information
        </h3>

        <p className="w-28 h-[1px] bg-border-primary"></p>
      </div>

      <Formik
        initialValues={{
          phone: "",
          gender: "",
          address: "",
          user_name: "",
          bath_date: "",
          about_you: "",
        }}
        onSubmit={() => console.log("hi")}
        // validationSchema={userSignupSchema}
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
                icon={<MailIcon />}
                placeholder="example@example.com"
              />

              <div className="flex max-md:flex-col justify-between gap-3">
                <InputGroup
                  type="password"
                  name="password"
                  label="Password *"
                  // icon={<LockIcon />}
                  placeholder="XXXXXXXXXXXX"
                />

                <InputGroup
                  type="date"
                  // icon={<LockIcon />}
                  name="confirmPassword"
                  label="Confirm Password *"
                  placeholder="XXXXXXXXXXXX"
                />
              </div>

              <InputGroup
                type="text"
                name="address"
                label="Address"
                icon={<MailIcon />}
                placeholder="example@example.com"
              />

              <InputGroup
                type="phone"
                name="phone"
                icon={<MailIcon />}
                label="Phone"
                placeholder="01715378419"
              />

              <InputTextArea
                name="about_you"
                label="About you"
                placeholder="I am"
              />
            </div>

            <div className="my-5">
              <button className="bg-primary-color font-medium text-center rounded-lg  py-2 px-5 text-md text-black-600 border border-[#DBDBDB] font-secondary">
                Update info
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfilePage;
