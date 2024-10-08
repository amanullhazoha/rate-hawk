import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserLogoutMutation } from "@/view/login/slice/login.slice";

const ProfileNav = ({
  user,
  setOpenMenu,
}: {
  user: boolean;
  setOpenMenu: (value: any) => void;
}) => {
  const router = useRouter();
  const [userLogout, { isLoading, isError }] = useUserLogoutMutation();

  const handleLogout = async () => {
    const data: any = await userLogout("");

    if (!data?.error) {
      localStorage.removeItem("access_token");

      router.push("/login");
      setOpenMenu(false);
      return toast.success("User logout successfully.");
    }

    toast.error(data?.error?.data);
  };

  return (
    <div
      className="flex flex-col gap-2 border
     border-border-primary rounded-md shadow-md bg-white py-3"
    >
      <Link href="/" className="px-6 py-1 hover:bg-border-primary">
        Home
      </Link>

      {user && (
        <Link href="/profile" className="px-6 py-1 hover:bg-border-primary">
          Profile
        </Link>
      )}

      {user && (
        <Link href="/my-booking" className="px-6 py-1 hover:bg-border-primary">
          My Booking
        </Link>
      )}

      {user && (
        <Link href="/save-list" className="px-6 py-1 hover:bg-border-primary">
          Save List
        </Link>
      )}

      <Link href="/contact" className="px-6 py-1 hover:bg-border-primary">
        Contact
      </Link>

      {!user && (
        <Link href="/signup" className="px-6 py-1 hover:bg-border-primary">
          Register
        </Link>
      )}

      {!user && (
        <Link href="/login" className="px-6 py-1 hover:bg-border-primary">
          Login
        </Link>
      )}

      {user && (
        <div className="w-full">
          <button
            type="button"
            className="px-6 py-1 w-full text-left hover:bg-border-primary"
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
