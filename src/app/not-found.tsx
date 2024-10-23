import UserLayout from "@/components/layoutSection/UserLayout";
import Link from "next/link";

const NotFound = () => {
  return (
    <UserLayout>
      <div className="container mx-auto flex flex-col gap-2 justify-center items-center w-full h-full py-40">
        <p className="text-lg font-medium text-emerald-950">
          This page not found
        </p>

        <Link href="/" className="text-blue-400 font-medium underline">
          Back to Home
        </Link>
      </div>
    </UserLayout>
  );
};

export default NotFound;
