import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Success",
};

const Success = () => {
  return (
    <div className="flex justify-center items-center h-80">
      <p className="text-green-500 text-base font-medium">
        Payment complete successfully
      </p>
    </div>
  );
};

export default Success;
