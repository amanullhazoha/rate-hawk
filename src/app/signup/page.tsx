import FacebookIcon from "@/assets/icons/FacebookIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import LockIcon from "@/assets/icons/LockIcon";
import MailIcon from "@/assets/icons/MailIcon";
import UserIcon from "@/assets/icons/UserIcon";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import SocialButton from "@/components/buttons/SocialButton";
import InputGroup from "@/components/inputs/InputGroup";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="container w-full px-2.5 md:w-[80%] mx-auto pt-[55px]">
      {/* heading */}
      <div className="flex items-center justify-center gap-6">
        <span className="block w-[100px] h-[4px] bg-primary-color"></span>
        <h1 className="heading">Signup</h1>
        <span className="block w-[100px] h-[4px] bg-primary-color"></span>
      </div>

      {/* form */}
      <div className="flex items-center justify-between gap-10 md:my-[85px] my-12">
        <div className="lg:w-1/2  w-full">
          <form className="px-8 py-9 border border-border-primary rounded-[20px]">
            <div className="mb-4">
              <SocialButton icon={<FacebookIcon />}>
                Continue with Facebook
              </SocialButton>
            </div>

            <div className="mb-4">
              <SocialButton icon={<GoogleIcon />}>
                Continue with Google
              </SocialButton>
            </div>

            <div className="flex items-center gap-4">
              <span className="block w-full h-[1px] bg-y-50"></span>
              <span className="text-black-400 text-sm font-medium">OR</span>
              <span className="block w-full h-[1px] bg-y-50"></span>
            </div>

            <div className="flex flex-col gap-6">
              <InputGroup
                label="Username *"
                type="text"
                placeholder="name"
                name="username"
                icon={<UserIcon />}
              />

              <InputGroup
                label="Your email *"
                type="email"
                placeholder="example@example.com"
                name="email"
                icon={<MailIcon />}
              />

              <div className="flex max-md:flex-col items-center justify-between gap-3">
                <InputGroup
                  label="Password *"
                  type="password"
                  placeholder="XXXXXXXXXXXX"
                  name="password"
                  icon={<LockIcon />}
                />
                <InputGroup
                  label="Confirm Password *"
                  type="password"
                  placeholder="XXXXXXXXXXXX"
                  name="confirmPassword"
                  icon={<LockIcon />}
                />
              </div>

              <div className="flex items-center gap-2 ">
                <input
                  type="checkbox"
                  className="border border-text-blar rounded-[2px] w-4 h-4 checked:bg-y-50 checkbox"
                  name=""
                  id="aggreement"
                />
                <label htmlFor="aggreement" className="text-sm text-text-blar">
                  I agree to{" "}
                  <b className="text-black-600">term and conditions</b>
                </label>
              </div>
            </div>

            <div className="my-10">
              <ButtonPrimary>Create New Account</ButtonPrimary>
            </div>

            <div className="flex max-md:flex-col items-center justify-center gap-2 mt-10">
              <p className="text-text-blar">Already have an account! </p>
              <Link href="/login" className=" text-black-600 font-semibold">
                Login Here !
              </Link>
            </div>
          </form>
        </div>
        <div className="relative w-1/2 max-lg:hidden">
          <Image
            src="/images/login-bg.png"
            width={600}
            height={600}
            alt="Login Rafiki"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
