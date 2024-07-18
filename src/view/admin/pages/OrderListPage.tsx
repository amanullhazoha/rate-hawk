"use client";

import Table from "@/components/table/Table";
import { useGetUserOrderListForAdminQuery } from "../slice";

const columns = [
  {
    label: "Image",
    path: "images",
    content: (row: any) => (
      <td className="p-2">
        <img
          alt={row?.name}
          className="w-10 h-10 rounded-lg"
          src={row?.images[0]?.replace("{size}", "1024x768")}
        />
      </td>
    ),
  },
  {
    label: "User Name",
    path: "user_name",
    content: (row: any) => <td className="p-2">Amanullha</td>,
  },
  {
    label: "Hotel Name",
    path: "hotel_name",
    content: (row: any) => <td className="p-2">{row?.hotel_name}</td>,
  },
  {
    label: "kind",
    path: "kind",
    content: (row: any) => <td className="p-2">{row?.kind}</td>,
  },
  {
    label: "Star",
    path: "star_rating",
    content: (row: any) => <td className="p-2">{row?.star_rating}</td>,
  },
  {
    label: "Region",
    path: "region_name",
    content: (row: any) => <td className="p-2">{row?.region_name}</td>,
  },
  {
    label: "Guests",
    path: "guests",
    content: (row: any) => <td className="p-2">{row?.guests}</td>,
  },
  {
    label: "Total Amount",
    path: "total_amount",
    content: (row: any) => <td className="p-2">{row?.total_amount}</td>,
  },
  {
    label: "Total Night",
    path: "total_night",
    content: (row: any) => <td className="p-2">{row?.total_night}</td>,
  },
  {
    label: "Check In",
    path: "check_in",
    content: (row: any) => <td className="p-2">{row?.check_in}</td>,
  },
  {
    label: "Check Out",
    path: "check_out",
    content: (row: any) => <td className="p-2">{row?.check_out}</td>,
  },
];

const OrderListPage = () => {
  const { data, isLoading, isError } = useGetUserOrderListForAdminQuery("");

  console.log(data);

  return (
    <main>
      {isLoading && !isError && (
        <div className="flex justify-center items-center py-10">
          <h3>loading...</h3>
        </div>
      )}

      {data?.data && !isLoading && !isError && (
        <>
          <h2 className="text-2xl font-bold">Order List</h2>
          <div className="mt-4">
            <Table
              columns={columns}
              items={data?.data}
              className="min-w-[1000px]"
            />
          </div>
        </>
      )}
    </main>
  );
};

export default OrderListPage;
