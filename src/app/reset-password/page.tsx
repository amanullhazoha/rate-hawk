import LockIcon from '@/assets/icons/LockIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import InputGroup from '@/components/inputs/InputGroup';
import Image from 'next/image';
import Link from 'next/link';

const ResetPassword = () => {
  return (
    <main>
      <div className="my-container  h-screen w-full flex items-center justify-center">
        <div className="flex w-full h-full items-center justify-between">
          <div className="relative w-1/2">
            <Image
              src="/images/reset-pass-bg.png"
              width={500}
              height={500}
              alt="Reset Password Rafiki"
            />
          </div>

          <div className="w-1/2">
            <div className="">
              <h1 className="heading">Reset Your Password</h1>

              <div className="flex items-center justify-center gap-2 text-black-600 font-medium">
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
