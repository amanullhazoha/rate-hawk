"use client";

import { useState } from "react";
import Table from "@/components/table/Table";
import AdminCard from "@/components/card/AdminCard";
import { useGetDashboardDataQuery } from "../slice";
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
          alt={row.name}
          className="w-10 h-10 rounded-lg"
          src={row?.images[0]?.replace("{size}", "1024x768")}
        />
      </td>
    ),
  },
  {
    label: "Hotel Name",
    path: "name",
    content: (row: any) => <td className="p-2">{row.name}</td>,
  },
  {
    label: "kind",
    path: "kind",
    content: (row: any) => <td className="p-2">{row.kind}</td>,
  },
  {
    label: "Star",
    path: "star_rating",
    content: (row: any) => <td className="p-2">{row.star_rating}</td>,
  },
  {
    label: "Region",
    path: "name",
    content: (row: any) => <td className="p-2">{row.region.name}</td>,
  },
  {
    label: "Country Code",
    path: "country_code",
    content: (row: any) => <td className="p-2">{row?.region?.country_code}</td>,
  },
  {
    label: "Check In Time",
    path: "check_in_time",
    content: (row: any) => <td className="p-2">{row.check_in_time}</td>,
  },
  {
    label: "Check Out Time",
    path: "check_out_time",
    content: (row: any) => <td className="p-2">{row.check_out_time}</td>,
  },
];

const DashboardPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, isError } = useGetDashboardDataQuery("");

  return (
    <main>
      {isLoading && !isError && (
        <div className="flex justify-center items-center py-10">
          <h3>loading...</h3>
        </div>
      )}

      {data?.data && !isLoading && !isError && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <AdminCard title="Total Order" value={data?.data?.total_order} />
            <AdminCard title="Total Hotel" value={data?.data?.total_hotel} />
            <AdminCard title="Total User" value={data?.data?.total_user} />
            <AdminCard
              title="Total Transaction"
              value={data?.data?.total_transaction}
            />
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
                items={data?.data?.hotels}
                className="min-w-[1000px]"
              />
            </div>
          </div>
        </>
      )}

      {openModal && (
        <HotelManageModal handleClose={() => setOpenModal(false)} />
      )}
    </main>
  );
};

export default DashboardPage;
