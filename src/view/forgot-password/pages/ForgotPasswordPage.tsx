import MailIcon from "@/assets/icons/MailIcon";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import InputGroup from "@/components/inputs/InputGroup";
import Image from "next/image";

const ForgetPasswordPage = () => {
  return (
    <main>
      <div className="container w-full px-2.5 md:w-[80%] mx-auto flex items-center justify-center py-10 md:py-0">
        <div className="flex  w-full h-full items-center justify-between">
          <div className="relative w-1/2 max-lg:hidden">
            <Image
              src="/images/forgot-pass-bg.png"
              width={500}
              height={500}
              alt="Login Rafiki"
            />
          </div>

          <div className="md:w-1/2 w-full">
            <div className="max-w-[500px] flex items-center justify-end">
              <div>
                <h1 className="heading">Forgot Password?</h1>
                <div className="max-w-[327px]">
                  <p className="text-lg font-medium text-black-400 pt-2">
                    Enter the email address associated with your account.
                  </p>
                </div>

                <div className="mt-8">
                  <InputGroup
                    label="Email address"
                    type="email"
                    placeholder="example@example.com"
                    name="email"
                    icon={<MailIcon />}
                  />
                </div>

                <button className="text-sm text-semi-primary font-medium py-6">
                  Try another way
                </button>

                <ButtonPrimary>Next</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgetPasswordPage;
