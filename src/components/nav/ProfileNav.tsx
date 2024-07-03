import Link from "next/link";
import { toast } from "react-toastify";
import { useUserLogoutMutation } from "@/view/login/slice/login.slice";

const ProfileNav = ({ user }: { user: boolean }) => {
  const [userLogout, { isLoading, isError }] = useUserLogoutMutation();

  const handleLogout = async () => {
    const data: any = await userLogout("");

    if (!data?.error) {
      localStorage.removeItem("access_token");

      return toast.success("User logout successfully.");
    }

    toast.error(data?.error?.data);
  };

  return (
    <div
      className="flex flex-col gap-2 border
     border-border-primary rounded-md shadow-md bg-white py-3"
    >
      <Link href="/" className="px-3 py-1">
        Home
      </Link>

      {user && (
        <Link href="/profile" className="px-3 py-1">
          Profile
        </Link>
      )}

      {user && (
        <Link href="/my-booking" className="px-3 py-1">
          My Booking
        </Link>
      )}

      {user && (
        <Link href="/save-list" className="px-3 py-1">
          Save List
        </Link>
      )}

      <Link href="/contact" className="px-3 py-1">
        Contact
      </Link>

      {user && (
        <div className="w-full">
          <button
            type="button"
            className="px-3 py-1 w-full text-left"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileNav;
