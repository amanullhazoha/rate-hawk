"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import NumberOne from "@/assets/icons/NumberOne";
import NumberTwo from "@/assets/icons/NumberTwo";
import Direction from "@/assets/icons/Direction";
import { newsletterSchema } from "@/view/contact/schema";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useCreateNewsletterMutation } from "@/view/contact/slice";

const NewsLetterSection = () => {
  const [createNewsletter] = useCreateNewsletterMutation();

  const handleSubmit = async (values: object, resetForm: any) => {
    const data: any = await createNewsletter(values);

    if (data?.error) return toast.error(data?.error?.data?.message);

    toast.success("Newsletter add successfully.");
    resetForm();
  };

  return (
    <div className="bg-yellow-100 lg:py-[100px] md:py-20 py-14 ">
      <div className="max-w-[1152px] mx-auto  flex items-center justify-center gap-[124px]">
        <div className="lg:w-1/2 w-full max-lg:px-5">
          <h2 className="heading mb-3">Join our newsletter</h2>
          <p className="lg:text-lg text-sm font-medium text-black-400">
            Read and share new perspectives on just about any topic. Everyone’s
            welcome.
          </p>

          <div className="my-10">
            <div className="flex items-center gap-4 mb-3">
              <NumberOne />
              <p className="text-black-400 font-medium">Get more discount</p>
            </div>
            <div className="flex items-center gap-4">
              <NumberTwo />
              <p className="text-black-400 font-medium">
                Get premium magazines
              </p>
            </div>
          </div>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={newsletterSchema}
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, resetForm)
            }
          >
            {({ handleSubmit, values, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <div className="flex items-center justify-between md:p-3 p-2 md:pl-8 pl-5 bg-white border-[1.5px] border-semi-primary rounded-[50px] relative">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full h-full outline-none focus:outline-none border-none placeholder:text-text-light md:placeholder:text-lg md:text-lg text-md"
                    />

                    <button type="submit">
                      <svg
                        width="40"
                        height="41"
                        viewBox="0 0 40 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative z-10"
                      >
                        <rect
                          y="0.166718"
                          width="40"
                          height="40"
                          rx="20"
                          fill="#9E9012"
                        />
                        <path
                          d="M10 20.1667H30M30 20.1667L21.6667 11.8334M30 20.1667L21.6667 28.5001"
                          stroke="white"
                          stroke-width="1.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>

                    <div className="absolute left-full -translate-x-1/2 bottom-0 max-lg:hidden">
                      <Direction />
                    </div>
                  </div>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </Form>
            )}
          </Formik>
        </div>

        <div className="w-1/2 relative max-lg:hidden">
          <Image
            src="/images/contact.png"
            width={500}
            height={517}
            objectFit="cover"
            alt="Contact Refiqi"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
