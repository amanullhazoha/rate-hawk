"use client";

import { useGetUserQuery } from "../slice";
import { useState, useEffect } from "react";
import Table from "@/components/table/Table";
import Preloader from "@/components/loading/Preloader";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useSearchParams, useRouter } from "next/navigation";
import GlobalPagination from "@/components/pagination/GlobalPagination";

const columns = [
  {
    label: "Name",
    path: "user_name",
    content: (row: any) => <td className="p-2 text">{row.user_name}</td>,
  },
  {
    label: "Email",
    path: "email",
    content: (row: any) => <td className="p-2 text-center">{row.email}</td>,
  },
  {
    label: "Status",
    path: "email_verify",
    content: (row: any) => (
      <td
        className={`p-2 capitalize text-center ${
          row.email_verify === "verified" ? "text-green-700" : " text-red-700"
        }`}
      >
        {row.email_verify}
      </td>
    ),
  },
  {
    label: "Gender",
    path: "gender",
    content: (row: any) => (
      <td className="p-2 capitalize text-center">{row.gender}</td>
    ),
  },
  {
    label: "Role",
    path: "role",
    content: (row: any) => (
      <td className="p-2 capitalize text-center">{row.role}</td>
    ),
  },
  {
    label: "Phone",
    path: "phone",
    content: (row: any) => <td className="p-2 text-center">{row.phone}</td>,
  },
];

const UserListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const activePage: string | null = searchParams.get("page");
  const skipQuery = !page;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery({ page }, { skip: skipQuery });

  const handlePagination = (value: number) => {
    let url: string | null = searchParams?.toString();

    url = setQueryParams(url, "page", value.toString());

    setPage(value);

    router.push(`/admin/user${url ? `?${url}` : ""}`);
  };

  useEffect(() => {
    if (activePage) {
      setPage(Number(activePage));
    }
  }, []);

  return (
    <main className="max-md:px-2.5 max-md:py-6">
      <h2 className="text-2xl font-bold">User List</h2>
      <div className="mt-4">
        {isLoading && !isError && (
          <div className="flex justify-center items-center h-40">
            <Preloader title="Page Loading.." />
          </div>
        )}

        {user && !isLoading && !isError && (
          <Table
            columns={columns}
            items={user?.data}
            className="min-w-[1050px]"
          />
        )}

        {!isLoading && !isError && user?.data?.pagination?.totalItems > 10 && (
          <GlobalPagination
            page={page}
            total_element={user?.data?.pagination?.totalItems}
            handlePagination={(value: number) => handlePagination(value)}
          />
        )}
      </div>
    </main>
  );
};

export default UserListPage;
