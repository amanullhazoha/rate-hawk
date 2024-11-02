"use client";

import Link from "next/link";
import Image from "next/image";
import ProfileNav from "../nav/ProfileNav";
import Preloader from "../loading/Preloader";
import { usePathname } from "next/navigation";
import EmailIcon from "@/assets/icons/EmailIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import LanguageSelect from "../buttons/LanguageSelect";
import CurrencySelect from "../buttons/CurrencySelect";
import logo from "@/assets/images/travelmeester-logo.png";
import { useEffect, useRef, useState, Suspense } from "react";
import WhatsappIcon from "@/assets/icons/social/WhatsappIcon";
import LoggedInUserIcon from "@/assets/icons/LoggedInUserIcon";
import InstagramIcon from "@/assets/icons/social/InstagramIcon";
import { useGetLoggedInProfileQuery } from "@/view/login/slice/login.slice";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { data, isError } = useGetLoggedInProfileQuery("");

  const pathName = usePathname();

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
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Preloader title="Page Loading.." />
        </div>
      }
    >
      <header className="sticky top-0 z-[99999999]">
        {/* <div
          className={`bg-black-800 ${
            data?.data && !isError ? "hidden" : "block"
          }`}
        >
          <div className="container max-md:px-2.5 mx-auto justify-end items-center py-2.5 flex">
            <div className="flex items-center gap-7">
              <Link
                href="/login"
                className="flex items-center gap-2 text-primary-color text-sm"
              >
                <ProfileIcon />
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
        </div> */}

        <div className="bg-white border-b border-yellow-50">
          <div className="container max-md:px-2.5 mx-auto flex justify-between items-center py-3 md:py-6">
            <div className="flex items-center gap-[82px]">
              <Link href="/" className="text-[40px] text-black-600 font-bold">
                <Image
                  src={logo}
                  alt="logo"
                  className="w-[72px] md:w-[92px] h-auto"
                />
              </Link>

              <div className="hidden md:flex items-center gap-12">
                <Link href="/" className="text-base text-black-800 font-normal">
                  Home
                  {pathName === "/" && (
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
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <CurrencySelect />
                <LanguageSelect />
              </div>

              <div className="relative">
                <button type="button" onClick={() => setOpenMenu(true)}>
                  <LoggedInUserIcon className="w-[50px] h-[50px]" />
                </button>

                {openMenu && (
                  <div
                    ref={menuRef}
                    className="absolute top-[50px] right-0 min-w-40 z-50"
                  >
                    <ProfileNav
                      user={data?.data && !isError ? true : false}
                      setOpenMenu={setOpenMenu}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-568px)]">{children}</main>

      <footer className="bg-black-800 z-[1000000] relative">
        <div className="container max-md:px-2.5 mx-auto py-10 md:py-24 grid gap-10 lg:gap-[90px] grid-col-1 lg:grid-cols-3">
          <div className="flex gap-10 flex-col md:flex-row">
            <div className="w-full ">
              <Link
                href="/"
                className="text-[32px] font-semibold text-semi-primary"
              >
                <Image
                  src={logo}
                  alt="logo"
                  className="w-14 h-auto bg-white px-2 py-2"
                />
              </Link>

              {/* <p className="text-base text-white font-normal mt-4">
                Quisque imperdiet sapien porttito the bibendum sellentesque the
                commodo erat acar accumsa lobortis, enim diam the nesuen.
              </p> */}

              <div className="mt-9 flex items-center gap-4">
                {/* <Link
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
                </Link> */}

                <a
                  href="https://www.instagram.com/travelmeester.nl?igsh=MWZ3ZHAxbHg1cmRncg%3D%3D&utm_source=qr"
                  target="_blank"
                  className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                >
                  <InstagramIcon className="w-6 h-6 text-white" />
                </a>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/31623963831?text=Hello!"
                  className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                >
                  <WhatsappIcon className="w-6 h-6 text-white" />
                </a>

                {/* <Link
                  href="/"
                  className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                >
                  <PinterestIcon className="w-6 h-6 text-white" />
                </Link> */}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-6 min-w-[125px]">
              Page
              <p className="w-[50px] h-[3px] bg-primary-color mt-1"></p>
            </h3>

            <div className="flex flex-col gap-2 text-white text-base font-medium">
              <Link href="/">Home</Link>
              <Link href="/contact">Contact</Link>
              {/* <Link href="/about-us">About Us</Link> */}
              {/* <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms & Conditions</Link> */}
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
                {/* <p className="flex gap-3 items-center">
                  <WhatsappIcon className="w-5 h-5 text-[#8A7E0F]" />
                  <a href="tel:+31623963831">+31623963831</a>
                </p> */}

                <p className="flex gap-3 items-center">
                  <EmailIcon />

                  <a href="mailto:info@travelmeester.nl">
                    info@travelmeester.nl
                  </a>
                </p>

                {/* <p className="flex gap-3 items-center">
                  <LocationIcon />
                  USA, FLORIDA
                </p> */}
              </div>
            </div>

            {/* <div className="w-full md:w-1/2">
              <h3 className="text-white text-lg font-medium mb-6">
                Popular Place
                <p className="w-[50px] h-[3px] bg-primary-color mt-1"></p>
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <Image src={BlogImage} alt="image" />

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
            </div> */}
          </div>
        </div>

        <div className="container max-md:px-2.5 mx-auto flex justify-between items-center py-5 border-t border-yellow-50 flex-col md:flex-row gap-4">
          <p className="text-white text-base font-normal max-md:text-center">
            Copyright &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="text-yellow-200">
              Travel Meester
            </Link>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-white font-semibold">
            {/* <Link href="/">Privacy Policy</Link>
            <div className="w-[1px] h-4 bg-white"></div> */}
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            {/* <div className="w-[1px] h-4 bg-white"></div>
            <Link href="/">FAQ</Link> */}
          </div>
        </div>
      </footer>
    </Suspense>
  );
};

export default UserLayout;
