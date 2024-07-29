"use client";

import React from "react";
import { useGetUserQuery } from "../slice";
import Table from "@/components/table/Table";
import Preloader from "@/components/loading/Preloader";

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
  const { data: user, isLoading, isError } = useGetUserQuery("");

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
      </div>
    </main>
  );
};

export default UserListPage;
