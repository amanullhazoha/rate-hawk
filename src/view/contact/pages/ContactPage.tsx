"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import MailIcon from "@/assets/icons/MailIcon";
import UserIcon from "@/assets/icons/UserIcon";
import { createContactSchema } from "../schema";
import EmailIcon from "@/assets/icons/EmailIcon";
import Direction from "@/assets/icons/Direction";
import NumberOne from "@/assets/icons/NumberOne";
import NumberTwo from "@/assets/icons/NumberTwo";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import SocialIcon from "@/assets/icons/SocialIcon";
import { useCreateContactMutation } from "../slice";
import LocationIcon from "@/assets/icons/LocationIcon";
import InputGroup from "@/components/inputs/InputGroup";
import TwitterIcon from "@/assets/icons/social/TwitterIcon";
import LinkedInIcon from "@/assets/icons/social/LinkedInIcon";
import FacebookIcon from "@/assets/icons/social/FacebookIcon";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import InstagramIcon from "@/assets/icons/social/InstagramIcon";
import PinterestIcon from "@/assets/icons/social/PinterestIcon";
import InputTextArea from "@/components/inputs/InputTextarea";
import WhatsappIcon from "@/assets/icons/social/WhatsappIcon";

const ContactPage = () => {
  const [crateContact, { isLoading, isError }] = useCreateContactMutation();

  const handleSubmit = async (values: object, resetForm: any) => {
    const data: any = await crateContact(values);

    if (data?.error) {
      toast.error(data?.error?.data?.message);
    } else {
      resetForm();
      toast.success("Send contact message successfully.");
    }
  };

  return (
    <div>
      <div className="container w-full px-2.5 md:w-[90%] mx-auto">
        <div className="flex items-center justify-center gap-6 mt-10">
          <span className="block md:w-[100px] w-[80px] h-[4px] bg-primary-color"></span>
          <h1 className="heading">Contact</h1>
          <span className="block md:w-[100px] w-[80px] h-[4px] bg-primary-color"></span>
        </div>

        <div className="flex max-lg:flex-col mb-[57px] justify-between gap-10 lg:mt-[129px] md:mt-20 mt-12 w-full">
          <div className="lg:w-1/2 w-full ">
            <div className="py-8 px-5 flex flex-col gap-8 border border-border-primary rounded-xl lg:mt-[32px]">
              {/* <div>
                <div className="flex items-center gap-2">
                  <div>
                    <LocationIcon />
                  </div>
                  <div>
                    <h3 className="uppercase text-sm text-black-800 font-semibold tracking-[0.28px]">
                      ADDRESS
                    </h3>
                  </div>
                </div>
                <div>
                  <p className="text-text-blar leading-[25.6px] pt-2">
                    Photo booth tattooed prism, portland taiyaki hoodie neutra
                    typewriter
                  </p>
                </div>
              </div> */}

              <div>
                <div className="flex items-center gap-2">
                  <div>
                    <EmailIcon />
                  </div>
                  <div>
                    <h3 className="uppercase text-sm text-black-800 font-semibold tracking-[0.28px]">
                      EMAIL
                    </h3>
                  </div>
                </div>
                <div>
                  <p className="text-text-blar leading-[25.6px] pt-2">
                    <a href="mailto:info@travelmeester.nl">
                      info@travelmeester.nl
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <div>
                    <WhatsappIcon className="text-[#9E9012] w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="uppercase text-sm text-black-800 font-semibold tracking-[0.28px]">
                      PHONE
                    </h3>
                  </div>
                </div>
                <div>
                  <p className="text-text-blar leading-[25.6px] pt-2">
                    <a href="tel:+31623963831">+31623963831</a>
                  </p>
                </div>
              </div>

              {/* <div>
                <div className="flex items-center gap-2">
                  <div>
                    <SocialIcon />
                  </div>
                  <div>
                    <h3 className="uppercase text-sm text-black-800 font-semibold tracking-[0.28px]">
                      SOCIAL
                    </h3>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-4">
                  <Link
                    href="/"
                    className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                  >
                    <FacebookIcon className="w-6 h-6 text-white" />
                  </Link>

                  <Link
                    href="/"
                    className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                  >
                    <TwitterIcon className="w-6 h-6 text-white" />
                  </Link>

                  <Link
                    href="/"
                    className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                  >
                    <InstagramIcon className="w-6 h-6 text-white" />
                  </Link>

                  <Link
                    href="/"
                    className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                  >
                    <LinkedInIcon className="w-6 h-6 text-white" />
                  </Link>

                  <Link
                    href="/"
                    className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                  >
                    <PinterestIcon className="w-6 h-6 text-white" />
                  </Link>
                </div>
              </div> */}
            </div>
          </div>

          <Formik
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, resetForm)
            }
            initialValues={{
              email: "",
              message: "",
              user_name: "",
            }}
            validationSchema={createContactSchema}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="lg:w-1/2 w-full">
                <div className="flex flex-col gap-6 w-full">
                  <InputGroup
                    type="text"
                    name="user_name"
                    label="Full name"
                    icon={<UserIcon />}
                    placeholder="Example Doe"
                  />

                  <InputGroup
                    type="email"
                    name="email"
                    icon={<MailIcon />}
                    label="Email address"
                    placeholder="example@example.com"
                  />

                  <InputTextArea
                    rows={9}
                    name="message"
                    label="Message"
                    placeholder="Write message"
                  />

                  <ButtonPrimary
                    disabled={isLoading}
                    className="lg:max-w-[286px]  md:!text-xl text-md"
                  >
                    Send Message
                  </ButtonPrimary>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="w-full h-[250px] mt-14 lg:mb-40 mb-20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7734.729592200921!2d90.49457063171886!3d23.807706059292467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1716144598009!5m2!1sen!2sbd"
            // width="600"
            // height="450"
            className="w-full h-full border-none rounded-lg"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
