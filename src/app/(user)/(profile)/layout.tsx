import ProfileLayout from "@/components/layoutSection/ProfileLayout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ProfileLayout>{children}</ProfileLayout>;
};

export default Layout;
