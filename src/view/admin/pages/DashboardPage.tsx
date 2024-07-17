"use client";

import { useState } from "react";
import Table from "@/components/table/Table";
import AdminCard from "@/components/card/AdminCard";
import HotelManageModal from "@/components/modal/HotelManageModal";

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
  {
    id: 5,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 6,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 7,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 8,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 9,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 10,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 11,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 12,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 13,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 14,
    productName: "3PCS Double Sided Nail File",
    pricePerItem: 111,
    quantity: 1,
    totalPrice: 111,
    media: "Bank",
    status: "Completed",
    imageUrl:
      "https://i.postimg.cc/vTGcmWqp/02-A4-F9-A4-15-EB-440-D-B625-1-BD13040-EEE3.png",
  },
  {
    id: 15,
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
    label: "Image",
    path: "imageUrl",
    content: (row: any) => (
      <td className="p-2">
        <img
          src={row.imageUrl}
          alt={row.productName}
          className="w-10 h-10 rounded-lg"
        />
      </td>
    ),
  },
  {
    label: "Hotel Name",
    path: "productName",
    content: (row: any) => <td className="p-2">{row.productName}</td>,
  },
  {
    label: "Price",
    path: "pricePerItem",
    content: (row: any) => <td className="p-2">{row.pricePerItem} ৳</td>,
  },
  {
    label: "Start Date",
    path: "quantity",
    content: (row: any) => <td className="p-2">{row.quantity}</td>,
  },
  {
    label: "End Date",
    path: "quantity",
    content: (row: any) => <td className="p-2">{row.quantity}</td>,
  },
  {
    label: "Created Date",
    path: "totalPrice",
    content: (row: any) => <td className="p-2">{row.totalPrice} ৳</td>,
  },
  {
    label: "User Name",
    path: "media",
    content: (row: any) => <td className="p-2">{row.media}</td>,
  },
  {
    label: "Status",
    path: "status",
    content: (row: any) => <td className="p-2">{row.status}</td>,
  },
];

const DashboardPage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <main>
      <div className="grid grid-cols-4 gap-4">
        <AdminCard title="Total Earning" value="5784 Tk" />
        <AdminCard title="Total User" value="578" />
        <AdminCard title="Total Order" value="200" />
        <AdminCard title="Total Hotel" value="18000" />
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <p className="text-black font-medium text-lg">Hotel List</p>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="bg-yellow-400 text-sm px-2.5 py-1 rounded-md"
          >
            Manage Hotel
          </button>
        </div>

        <div className="">
          <Table
            columns={columns}
            items={transactionItems}
            className="min-w-[1000px]"
          />
        </div>
      </div>

      {openModal && (
        <HotelManageModal handleClose={() => setOpenModal(false)} />
      )}
    </main>
  );
};

export default DashboardPage;
