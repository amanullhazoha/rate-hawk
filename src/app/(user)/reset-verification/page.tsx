import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Verification",
};

const ResetVerification = () => {
  return (
    <div className="flex items-center justify-center py-20 overflow-auto">
      <div className="w-full max-md:px-4 max-w-[500px] mx-auto">
        <div className="text-center">
          <h1 className="heading-text text-center text-[26px] font-medium text-primary-color">
            Verify Reset Password Link
          </h1>
          <p className="text-black-400 pt-[6px] text-base">
            Please verify your reset password link to complete reset password.
            Check your inbox for a reset password link
          </p>
        </div>

        <Link
          href={"/forget-password"}
          className="flex items-center justify-center"
        >
          <button className="mt-5 flex items-center justify-center gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 12H4M4 12L10 6M4 12L10 18"
                  stroke="#808284"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>

            <div className="text-pure-black">Back</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResetVerification;
