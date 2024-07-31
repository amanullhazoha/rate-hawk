import Link from "next/link";

const AdminNavList = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <div
      className="flex flex-col gap-2 border
     border-border-primary rounded-md shadow-md bg-white py-3"
    >
      <Link
        href="/admin/dashboard"
        className="px-6 py-1 hover:bg-border-primary"
      >
        Dashboard
      </Link>

      <Link href="/admin/order" className="px-6 py-1 hover:bg-border-primary">
        Order List
      </Link>

      <Link href="/admin/user" className="px-6 py-1 hover:bg-border-primary">
        User List
      </Link>

      <Link
        href="/admin/order-info"
        className="px-6 py-1 hover:bg-border-primary"
      >
        Order Info
      </Link>

      <Link
        href="/admin/transaction-history"
        className="px-6 py-1 hover:bg-border-primary"
      >
        Transaction
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
