"use client";

import Link from "next/link";
import Image from "next/image";
import ProfileNav from "../nav/ProfileNav";
import EmailIcon from "@/assets/icons/Email";
import { usePathname } from "next/navigation";
import BlogImage from "@/assets/images/blog.jpg";
import SearchIcon from "@/assets/icons/SearchIcon";
import { useEffect, useRef, useState } from "react";
import TwitterIcon from "@/assets/icons/social/TwitterIcon";
import LinkedInIcon from "@/assets/icons/social/LinkedInIcon";
import FacebookIcon from "@/assets/icons/social/FacebookIcon";
import InstagramIcon from "@/assets/icons/social/InstagramIcon";
import PinterestIcon from "@/assets/icons/social/PinterestIcon";
import LoggedInUserIcon from "@/assets/icons/LoggedInUserIcon";
import { useGetLoggedInProfileQuery } from "@/view/profile/slice";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const access_token = localStorage.getItem("access_token");

  const pathName = usePathname();
  const { data, isLoading, isError } = useGetLoggedInProfileQuery("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <>
      <header>
        <div className="bg-black-800">
          <div className="container max-md:px-2.5 mx-auto justify-between items-center py-2.5 hidden md:flex">
            <div className="flex items-center gap-7">
              <Link
                href="/"
                className="flex items-center gap-2 text-primary-color text-sm"
              >
                <EmailIcon />
                tourer@info.com
              </Link>

              <Link
                href="/"
                className="flex items-center gap-2 text-primary-color text-sm"
              >
                <EmailIcon />
                0123 456 789
              </Link>
            </div>

            <div className="flex items-center gap-7">
              <Link
                href="/login"
                className="flex items-center gap-2 text-primary-color text-sm"
              >
                <EmailIcon />
                Login
              </Link>

              <div className="w-[1px] h-[16px] bg-primary-color"></div>

              <Link
                href="/signup"
                className="flex items-center gap-2 text-primary-color text-sm"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-yellow-50">
          <div className="container max-md:px-2.5 mx-auto flex justify-between items-center py-6">
            <div className="flex items-center gap-14">
              <Link href="/" className="text-[40px] text-black-600 font-bold">
                Logo
              </Link>

              <div className="hidden md:flex items-center gap-12">
                <Link href="/" className="text-base text-black-800 font-normal">
                  Home
                  {pathName === "/" && (
                    <p className="w-7 h-[3px] bg-primary-color"></p>
                  )}
                </Link>

                <Link href="/about-us">
                  About Us
                  {pathName === "/about-us" && (
                    <p className="w-7 h-[3px] bg-primary-color"></p>
                  )}
                </Link>

                <Link href="/blog">
                  Blog & News
                  {pathName === "/blog" && (
                    <p className="w-7 h-[3px] bg-primary-color"></p>
                  )}
                </Link>
                <Link href="/contact">
                  Contact
                  {pathName === "/contact" && (
                    <p className="w-7 h-[3px] bg-primary-color"></p>
                  )}
                </Link>
              </div>

              <div className="hidden md:hidden flex-col gap-3 absolute left-0 top-0 bottom-0 bg-yellow-bg px-6 py-10 border-r w-[50%]">
                <Link href="/" className="text-[40px] text-black-600 font-bold">
                  Logo
                </Link>

                <Link href="/" className="text-base text-black-800 font-normal">
                  Home
                  {pathName === "/" && (
                    <p className="w-7 h-[3px] bg-primary-color"></p>
                  )}
                </Link>

                <Link href="/about-us">
                  About Us
                  {pathName === "/about-us" && (
                    <p className="w-7 h-[3px] bg-primary-color"></p>
                  )}
                </Link>

                <Link href="/contact">
                  Contact
                  {pathName === "/contact" && (
                    <p className="w-7 h-[3px] bg-primary-color"></p>
                  )}
                </Link>
              </div>
            </div>

            {/* <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <div>USD</div>
                <div>ENG</div>
              </div>

              <SearchIcon />
            </div> */}
            <div className="flex items-center gap-5">
              {!access_token && <Link href="/login">Login</Link>}

              {/* {access_token && (
                <Link href="/my-booking">
                  <LoggedInUserIcon className="w-[50px] h-[50px]" />
                </Link>
              )} */}

              {access_token && (
                <div className="relative">
                  <button type="button" onClick={() => setOpenMenu(true)}>
                    <LoggedInUserIcon className="w-[50px] h-[50px]" />
                  </button>

                  {openMenu && (
                    <div
                      ref={menuRef}
                      className="absolute top-[50px] right-0 min-w-40 z-50"
                    >
                      <ProfileNav />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-690px)]">{children}</main>

      <footer className="bg-black-800">
        <div className="container max-md:px-2.5 mx-auto py-24 grid gap-10 lg:gap-[90px] grid-col-1 lg:grid-cols-2">
          <div className="flex gap-10 flex-col md:flex-row">
            <div className="w-full md:w-1/2 lg:w-4/6">
              <Link
                href="/"
                className="text-[32px] font-semibold text-semi-primary"
              >
                Logo
              </Link>

              <p className="text-base text-white font-normal mt-4">
                Quisque imperdiet sapien porttito the bibendum sellentesque the
                commodo erat acar accumsa lobortis, enim diam the nesuen.
              </p>

              <div className="mt-9 flex items-center gap-4">
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
            </div>

            <div>
              <h3 className="text-white text-lg font-medium mb-6 min-w-[125px]">
                COMPANY
                <p className="w-[50px] h-[3px] bg-primary-color mt-1"></p>
              </h3>

              <div className="flex flex-col gap-2 text-white text-base font-medium">
                <Link href="/">About Us</Link>
                <Link href="/">Testimonials</Link>
                <Link href="/">Rewards</Link>
                <Link href="/">Work with Us</Link>
                <Link href="/">Meet the Team</Link>
                <Link href="/">Blog</Link>
              </div>
            </div>
          </div>

          <div className="flex md:gap-[90px] gap-10 flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <h3 className="text-white text-lg font-medium mb-6">
                CONTACT US
                <p className="w-[50px] h-[3px] bg-primary-color mt-1"></p>
              </h3>

              <div className="flex flex-col gap-3.5 text-white text-base font-medium">
                <p>Feel free to contact and reach us !!</p>
                <p className="flex gap-3 items-center">
                  <EmailIcon />
                  +012 345 6789
                </p>

                <p className="flex gap-3 items-center">
                  <EmailIcon />
                  travelta.mail@info.com
                </p>

                <p className="flex gap-3 items-center">
                  <EmailIcon />
                  USA, FLORIDA
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h3 className="text-white text-lg font-medium mb-6">
                RECENT POST
                <p className="w-[50px] h-[3px] bg-primary-color mt-1"></p>
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <Image src={BlogImage} alt="iamge" />

                  <div className="flex flex-col justify-between text-white">
                    <h4 className="text-base font-medium">
                      Journey is Measured in New Friends
                    </h4>
                    <p className="text-xs font-medium">August 16, 2023</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Image src={BlogImage} alt="iamge" />

                  <div className="flex flex-col justify-between text-white">
                    <h4 className="text-base font-medium">
                      Travel With Friends is Best
                    </h4>
                    <p className="text-xs font-medium">April 16, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container max-md:px-2.5 mx-auto flex justify-between items-center py-5 border-t border-yellow-50 flex-col md:flex-row gap-4">
          <p className="text-white text-base font-normal max-md:text-center">
            Copyright &copy; 2022 [name]. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-white font-semibold">
            <Link href="/">Privacy Policy</Link>
            <div className="w-[1px] h-4 bg-white"></div>
            <Link href="/">Terms & Conditions</Link>
            <div className="w-[1px] h-4 bg-white"></div>
            <Link href="/">FAQ</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default UserLayout;
