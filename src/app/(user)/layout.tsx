import UserLayout from "@/components/layoutSection/UserLayout";
import { Suspense } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-20">loading....</div>
      }
    >
      <UserLayout>{children}</UserLayout>;
    </Suspense>
  );
};

export default Layout;
