import Link from "next/link";

const ProfileNav = () => {
  return (
    <div
      className="flex flex-col gap-2 border
     border-border-primary rounded-md shadow-md bg-white py-3"
    >
      <Link href="/" className="px-3 py-1">
        Home
      </Link>

      <Link href="/" className="px-3 py-1">
        Profile
      </Link>

      <Link href="/" className="px-3 py-1">
        Blog & News
      </Link>

      <Link href="/" className="px-3 py-1">
        About Us
      </Link>

      <Link href="/" className="px-3 py-1">
        Contact
      </Link>

      <Link href="/" className="px-3 py-1">
        Log out
      </Link>
    </div>
  );
};

export default ProfileNav;
