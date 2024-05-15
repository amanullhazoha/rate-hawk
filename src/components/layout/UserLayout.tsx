import EmailIcon from "@/assets/icons/Email";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Link from "next/link";
import BlogImage from "@/assets/images/blog.jpg";
import Image from "next/image";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header>
        <div className="bg-black-800">
          <div className="container mx-auto flex justify-between items-center py-2.5">
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
                href="/"
                className="flex items-center gap-2 text-primary-color text-sm"
              >
                <EmailIcon />
                Login
              </Link>

              <div className="w-[1px] h-[16px] bg-primary-color"></div>

              <Link
                href="/"
                className="flex items-center gap-2 text-primary-color text-sm"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-yellow-50">
          <div className="container mx-auto flex justify-between items-center py-6">
            <div className="flex items-center gap-14">
              <Link href="/" className="text-[40px] text-black-600 font-bold">
                Logo
              </Link>

              <div className="flex items-center gap-12">
                <Link href="/" className="text-base text-black-800 font-normal">
                  Home
                  <p className="w-7 h-[3px] bg-primary-color"></p>
                </Link>
                <Link href="/">About Us</Link>
                <Link href="/">Blog & News</Link>
                <Link href="/">Contact</Link>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <div>USD</div>
                <div>ENG</div>
              </div>

              <SearchIcon />
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="bg-black-800">
        <div className="container mx-auto py-24 flex gap-[90px]">
          <div className="w-6/12 flex gap-[40px]">
            <div>
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
                  <FacebookIcon />
                </Link>

                <Link
                  href="/"
                  className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                >
                  <FacebookIcon />
                </Link>

                <Link
                  href="/"
                  className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                >
                  <FacebookIcon />
                </Link>

                <Link
                  href="/"
                  className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                >
                  <FacebookIcon />
                </Link>

                <Link
                  href="/"
                  className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
                >
                  <FacebookIcon />
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

          <div className="w-6/12 flex gap-[90px]">
            <div>
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

            <div>
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

        <div className="container mx-auto flex justify-between items-center py-5 border-t border-yellow-50">
          <p className="text-white text-base font-normal">
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
