"use client";

import Table from "@/components/table/Table";
import { useGetOrderInfoMutation } from "../slice";
import { useEffect } from "react";

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
    label: "Order ID",
    path: "order_id",
    content: (row: any) => <td className="p-2">{row?.order_id}</td>,
  },
  {
    label: "Hotel Id",
    path: "hotel_data",
    content: (row: any) => <td className="p-2">{row?.hotel_data?.id}</td>,
  },
  {
    label: "Order Type",
    path: "order_type",
    content: (row: any) => <td className="p-2">{row?.order_type}</td>,
  },
  {
    label: "Amount Payable",
    path: "amount_payable",
    content: (row: any) => (
      <td className="p-2">
        {row?.amount_payable?.amount} {row?.amount_payable?.currency_code}
      </td>
    ),
  },
  {
    label: "Created At",
    path: "created_at",
    content: (row: any) => <td className="p-2">{row.created_at}</td>,
  },
  {
    label: "Checkout At",
    path: "checkout_at",
    content: (row: any) => <td className="p-2">{row.checkout_at}</td>,
  },
  {
    label: "Check-in At",
    path: "checkin_at",
    content: (row: any) => <td className="p-2">{row.checkin_at}</td>,
  },
  {
    label: "User Email",
    path: "user_data",
    content: (row: any) => <td className="p-2">{row?.user_data?.email}</td>,
  },
  {
    label: "Status",
    path: "status",
    content: (row: any) => <td className="p-2">{row?.status}</td>,
  },
];

const OrderInfoByRateHawkPage = () => {
  const [getOrderInfo, { isLoading, isError, data: orderInfo }] =
    useGetOrderInfoMutation();

  useEffect(() => {
    const payload = {
      ordering: {
        ordering_type: "desc",
        ordering_by: "created_at",
      },
      pagination: {
        page_size: "10",
        page_number: "1",
      },
      search: {
        created_at: {
          from_date: "2018-12-05T00:00",
        },
      },
      language: "en",
    };

    getOrderInfo(payload);
  }, []);

  return (
    <main className="max-md:px-2.5 max-md:py-6">
      <h2 className="text-2xl font-bold">Order Info By Rate Hawk</h2>
      <div className="mt-4">
        {!isLoading && !isError && orderInfo && (
          <Table
            columns={columns}
            className="min-w-[1000px]"
            items={orderInfo?.data?.data?.orders}
          />
        )}
      </div>
    </main>
  );
};

export default OrderInfoByRateHawkPage;
