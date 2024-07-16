"use client";

import React from "react";
import Table from "@/components/table/Table";
import { useGetUserQuery } from "../slice";

const transactionItems = [
  {
    id: 1,
    productName: "Magic Hair Rap Bath Salon Towel",
    pricePerItem: 103,
    quantity: 2,
    totalPrice: 206,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 2,
    productName: "Unilever Pureit Classic Microfibre Mesh",
    pricePerItem: 199,
    quantity: 1,
    totalPrice: 199,
    media: "Bkash",
    status: "Pending",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 3,
    productName: "High-quality Silicone Shampoo Brush",
    pricePerItem: 105,
    quantity: 3,
    totalPrice: 315,
    media: "Cash",
    status: "Failed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 4,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
];

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
    <main>
      <h2 className="text-2xl font-bold">User List</h2>
      <div className="mt-4">
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
