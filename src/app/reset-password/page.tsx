import LockIcon from "@/assets/icons/LockIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import InputGroup from "@/components/inputs/InputGroup";
import Image from "next/image";
import Link from "next/link";

const ResetPassword = () => {
  return (
    <main>
      <div className="container w-full px-2.5 md:w-[80%] mx-auto flex items-center justify-center py-10">
        <div className="flex w-full h-full items-center justify-between ">
          <div className="relative w-1/2 max-lg:hidden">
            <Image
              src="/images/reset-pass-bg.png"
              width={500}
              height={500}
              alt="Reset Password Rafiki"
            />
          </div>

          <div className="lg:w-1/2 w-full ">
            <div className="">
              <h1 className="heading">Reset Your Password</h1>

              <div className="flex items-center justify-center gap-2 text-black-600 font-medium max-md:mb-8">
                <ProfileIcon />
                <p className="text-center">example@example.com</p>
              </div>

              <div>
                <InputGroup
                  label="Password *"
                  type="password"
                  placeholder="XXXXXXXXXXXX"
                  name="password"
                  icon={<LockIcon />}
                />
                <div className="mt-6">
                  <InputGroup
                    label="Confirm Password *"
                    type="password"
                    placeholder="XXXXXXXXXXXX"
                    name="confirmPassword"
                    icon={<LockIcon />}
                  />
                </div>
              </div>

              <div className="my-10">
                <ButtonPrimary>Submit</ButtonPrimary>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                <p className="text-text-blar">Don’t have an account yet? </p>
                <Link href="/signup" className=" text-black-600 font-semibold">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
