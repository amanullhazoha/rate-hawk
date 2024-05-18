import FacebookIcon from '@/assets/icons/FacebookIcon';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import LockIcon from '@/assets/icons/LockIcon';
import MailIcon from '@/assets/icons/MailIcon';
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import SocialButton from '@/components/buttons/SocialButton';
import InputGroup from '@/components/inputs/InputGroup';
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
  return (
    <main>
      <div className="my-container pt-[55px]">
        {/* heading */}
        <div className="flex items-center justify-center gap-6">
          <span className="block w-[100px] h-[4px] bg-primary-color"></span>
          <h1 className="heading">Login</h1>
          <span className="block w-[100px] h-[4px] bg-primary-color"></span>
        </div>

        {/* form */}
        <div className="flex items-center justify-between gap-10 my-[85px]">
          <div className="w-1/2">
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
                  label="Email address"
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  icon={<MailIcon />}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-black-800">
                      Password
                    </label>
                    <Link
                      href="/forget-password"
                      className="text-black-400 text-sm font-medium underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <InputGroup
                    label=""
                    type="password"
                    placeholder="XXXXXXXXXXXX"
                    name="password"
                    icon={<LockIcon />}
                  />
                </div>
                <ButtonPrimary>Continue</ButtonPrimary>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                <p className="text-text-blar">New user? </p>
                <Link href="/signup" className=" text-black-600 font-semibold">
                  Create an account
                </Link>
              </div>
            </form>
          </div>
          <div className="relative w-1/2">
            <Image
              src="/images/login.png"
              width={600}
              height={600}
              alt="Login Rafiki"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
