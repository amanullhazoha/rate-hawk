"use client";

import Link from "next/link";
import Image from "next/image";
import team from "@/assets/images/team.jpg";
import { usePathname } from "next/navigation";
import StarIcon from "@/assets/icons/StarIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import TwitterIcon from "@/assets/icons/social/TwitterIcon";
import FacebookIcon from "@/assets/icons/social/FacebookIcon";
import LinkedInIcon from "@/assets/icons/social/LinkedInIcon";
import InstagramIcon from "@/assets/icons/social/InstagramIcon";
import PinterestIcon from "@/assets/icons/social/PinterestIcon";
import { useGetLoggedInProfileQuery } from "@/view/login/slice/login.slice";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const { data, isLoading, isError } = useGetLoggedInProfileQuery("");

  return (
    <main className="bg-white py-20">
      <div className="container mx-auto px-2.5">
        <div className="w-full md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-14">
          <div className="w-full col-span-1 p-14 border border-border-primary rounded-[20px] mb-8 h-fit">
            <div className="flex items-center flex-col gap-4 pb-6">
              <Image
                src={team}
                alt="image"
                className="w-[128px] h-[128px] rounded-full border border-primary-color"
              />

              <p className="text-black-800 text-3xl font-semibold">
                {data?.data?.user_name}
              </p>

              <p className="flex items-center gap-1">
                <StarIcon />
                <span className="text-sm font-medium text-black-800">4.5</span>
                <span className="text-sm text-normal text-text-blar">
                  (112)
                </span>
              </p>
            </div>

            <p className="text-base font-normal text-text-blar text-center">
              {data?.data?.about_you}
            </p>

            <div className="mt-9 flex items-center justify-center gap-2">
              <Link
                href="/"
                className="w-8 h-8 rounded-full flex justify-center items-center bg-black-400"
              >
                <FacebookIcon className="w-6 h-6 text-white" />
              </Link>

              <Link
                href="/"
                className="w-8 h-8 rounded-full flex justify-center items-center bg-black-400"
              >
                <TwitterIcon className="w-6 h-6 text-white" />
              </Link>

              <Link
                href="/"
                className="w-8 h-8 rounded-full flex justify-center items-center bg-black-400"
              >
                <InstagramIcon className="w-6 h-6 text-white" />
              </Link>

              <Link
                href="/"
                className="w-8 h-8 rounded-full flex justify-center items-center bg-black-400"
              >
                <LinkedInIcon className="w-6 h-6 text-white" />
              </Link>

              <Link
                href="/"
                className="w-8 h-8 rounded-full flex justify-center items-center bg-black-400"
              >
                <PinterestIcon className="w-6 h-6 text-white" />
              </Link>
            </div>

            <p className="w-20 h-[1px] bg-border-primary mt-8 mb-8 mx-auto"></p>

            <div className="flex justify-center flex-col gap-4 pl-4">
              <div className="flex items-center gap-4">
                <HomeIcon />
                <span className="text-base font-normal text-black-400">
                  {data?.data?.address}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <HomeIcon />
                <span className="text-base font-normal text-black-400">
                  Speaking English
                </span>
              </div>

              <div className="flex items-center gap-4">
                <HomeIcon />
                <span className="text-base font-normal text-black-400">
                  Joined in March 2020
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            {/* <div className="flex gap-6 pb-4 border-b border-border-primary mb-5"> */}
            <div className="flex gap-6 pb-4 border-b border-border-primary mb-5 overflow-auto w-[full] md:w-fit">
              <Link
                href="/profile"
                className={`px-6 py-2 rounded-full font-medium ${
                  pathName === "/profile"
                    ? "bg-yellow-500 text-white"
                    : "text-black-400"
                }`}
              >
                Profile
              </Link>

              <Link
                href="/my-booking"
                className={`px-6 py-2 rounded-full font-medium ${
                  pathName === "/my-booking"
                    ? "bg-yellow-500 text-white"
                    : "text-black-400"
                }`}
              >
                My Booking
              </Link>

              <Link
                href="/save-list"
                className={`px-6 py-2 rounded-full font-medium ${
                  pathName === "/save-list"
                    ? "bg-yellow-500 text-white"
                    : "text-black-400"
                }`}
              >
                Save List
              </Link>

              <Link
                href="/change-password"
                className={`px-6 py-2 rounded-full font-medium ${
                  pathName === "/change-password"
                    ? "bg-yellow-500 text-white"
                    : "text-black-400"
                }`}
              >
                Change Password
              </Link>
            </div>

            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileLayout;
