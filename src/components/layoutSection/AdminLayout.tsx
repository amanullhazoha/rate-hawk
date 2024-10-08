"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Preloader from "../loading/Preloader";
import AdminNavList from "../nav/AdminNavList";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import UserListIcon from "@/assets/icons/UserListIcon";
import OrderListIcon from "@/assets/icons/OrderListIcon";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@/assets/icons/DashboardIcon";
import logo from "@/assets/images/travelmeester-logo.png";
import { useUserLogoutMutation } from "@/view/login/slice/login.slice";
import { useCallback, useEffect, useRef, useState, Suspense } from "react";

const AdminLink = ({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: any;
}) => {
  const activePath = usePathname();

  return (
    <Link
      href={href}
      className={`text-text-secondary-hover font-medium flex gap-3 items-center hover:bg-border-secondary px-2 py-1 rounded-md ${
        activePath === href && "bg-black-400 text-white"
      }`}
    >
      {children}

      <span>{title}</span>
    </Link>
  );
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const activePath = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [openNav, setOpenNav] = useState(false);
  const [userLogout, { isLoading, isError }] = useUserLogoutMutation();

  const handleLogout = async () => {
    const data: any = await userLogout("");

    if (!data?.error) {
      localStorage.removeItem("access_token");

      router.push("/login");
      setOpenNav(false);
      return toast.success("User logout successfully.");
    }

    toast.error(data?.error?.data);
  };

  const handleClickOutside = useCallback((event: any) => {
    if (navRef.current && navRef?.current?.contains(event.target)) {
      return setOpenNav(true);
    }

    return setOpenNav(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Preloader title="Page Loading.." />
        </div>
      }
    >
      <div className="max-w-[1600px] mx-auto md:hidden">
        <header className="bg-primary-color py-4 px-[6px] sticky top-0 z-[99999999]">
          <div className="w-full flex justify-between items-center mx-auto">
            <div className="md:w-44 relative w-[88px]">
              <Link href="/" className="text-[40px] text-black-600 font-bold">
                <Image
                  src={logo}
                  alt="logo"
                  className="w-[60px] md:w-[80px] h-auto"
                />
              </Link>
            </div>

            <div className="p-2">
              <svg
                className="cursor-pointer"
                onClick={() => setOpenNav((prev) => !prev)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="menu-02">
                  <path
                    id="Icon"
                    d="M3 12H15M3 6H21M3 18H21"
                    stroke="#344054"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>

          {openNav && (
            <div
              ref={navRef}
              className="absolute top-[55px] right-2.5 min-w-40 z-50"
            >
              <AdminNavList handleLogout={handleLogout} />
            </div>
          )}
        </header>

        {children}
      </div>

      <div className="max-w-[1600px] mx-auto hidden md:flex">
        <aside className="w-[310px] h-screen flex flex-col justify-between px-6 py-4 bg-primary-color shadow-md sticky top-0 left-0 bottom-0">
          <div>
            <div className="md:h-16 md:w-44 relative w-[88px] h-8 mb-6">
              <Link href="/" className="text-[40px] text-black-600 font-bold">
                <Image
                  src={logo}
                  alt="logo"
                  className="w-[60px] md:w-[70px] h-auto"
                />
              </Link>
            </div>

            <div className="flex flex-col gap-5">
              <AdminLink href="/admin/dashboard" title="Dashboard">
                <DashboardIcon
                  fill={activePath === "/admin/dashboard" ? "#fff" : ""}
                />
              </AdminLink>

              <AdminLink href="/admin/order" title="Order List">
                <OrderListIcon
                  fill={activePath === "/admin/order" ? "#fff" : ""}
                />
              </AdminLink>

              <AdminLink href="/admin/user" title="User List">
                <UserListIcon
                  fill={activePath === "/admin/user" ? "#fff" : ""}
                />
              </AdminLink>

              <AdminLink href="/admin/order-info" title="Order Info">
                <OrderListIcon
                  fill={activePath === "/admin/order-info" ? "#fff" : ""}
                />
              </AdminLink>

              <AdminLink href="/admin/transaction-history" title="Transaction">
                <OrderListIcon
                  fill={
                    activePath === "/admin/transaction-history" ? "#fff" : ""
                  }
                />
              </AdminLink>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="button"
              className="text-text-secondary-hover font-semibold flex gap-3 items-center hover:bg-border-secondary p-1 rounded-md"
              onClick={handleLogout}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </aside>

        <div className="w-[1200px]">
          <div className="bg-white shadow-md py-3 px-4 flex justify-between items-center sticky top-0">
            <h3 className="text-black font-medium text-xl">Admin Panel</h3>

            <UserListIcon className="w-10 h-10" />
          </div>

          <div className="w-full py-10 px-6 bg-gray-bg overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminLayout;
