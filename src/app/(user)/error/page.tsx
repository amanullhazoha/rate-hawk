import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Failed",
};

const Error = () => {
  return (
    <div className="flex justify-center items-center h-80">
      <p className="text-red-500 text-base font-medium">Payment not success</p>
    </div>
  );
};

export default Error;
