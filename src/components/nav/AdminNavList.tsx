import Link from "next/link";

const AdminNavList = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <div
      className="flex flex-col gap-2 border
     border-border-primary rounded-md shadow-md bg-white py-3"
    >
      <Link href="/" className="px-6 py-1 hover:bg-border-primary">
        Home
      </Link>

      <Link href="/profile" className="px-6 py-1 hover:bg-border-primary">
        Profile
      </Link>

      <Link href="/my-booking" className="px-6 py-1 hover:bg-border-primary">
        My Booking
      </Link>

      <Link href="/save-list" className="px-6 py-1 hover:bg-border-primary">
        Save List
      </Link>

      <Link href="/contact" className="px-6 py-1 hover:bg-border-primary">
        Contact
      </Link>

      <div className="w-full">
        <button
          type="button"
          className="px-6 py-1 w-full text-left hover:bg-border-primary"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AdminNavList;
