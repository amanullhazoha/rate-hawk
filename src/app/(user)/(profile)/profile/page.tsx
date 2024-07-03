import { Metadata } from "next";
import { ProfilePage } from "@/view/profile";

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = () => {
  return <ProfilePage />;
};

export default Profile;
