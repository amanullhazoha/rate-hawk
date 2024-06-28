import UserLayout from "@/components/layoutSection/UserLayout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <UserLayout>{children}</UserLayout>;
};

export default Layout;
