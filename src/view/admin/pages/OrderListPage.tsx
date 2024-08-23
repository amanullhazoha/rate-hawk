"use client";

import { useState, useEffect } from "react";
import Table from "@/components/table/Table";
import Preloader from "@/components/loading/Preloader";
import { useGetUserOrderListForAdminQuery } from "../slice";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useSearchParams, useRouter } from "next/navigation";
import GlobalPagination from "@/components/pagination/GlobalPagination";

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
    label: "Total Commission",
    path: "total_commission",
    content: (row: any) => <td className="p-2">{row?.total_commission}</td>,
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const activePage: string | null = searchParams.get("page");
  const skipQuery = !page;

  const { data, isLoading, isError } = useGetUserOrderListForAdminQuery(
    { page },
    { skip: skipQuery },
  );

  const handlePagination = (value: number) => {
    let url: string | null = searchParams?.toString();

    url = setQueryParams(url, "page", value.toString());

    setPage(value);

    router.push(`/admin/order${url ? `?${url}` : ""}`);
  };

  useEffect(() => {
    if (activePage) {
      setPage(Number(activePage));
    }
  }, []);

  return (
    <main className="max-md:px-2.5 max-md:py-6">
      <h2 className="text-2xl font-bold">Order List</h2>
      <div className="mt-4">
        {isLoading && !isError && (
          <div className="flex justify-center items-center h-40">
            <Preloader title="Page Loading.." />
          </div>
        )}

        {data?.data && !isLoading && !isError && (
          <Table columns={columns} items={data?.data} />
        )}

        {!isLoading && !isError && data?.pagination?.totalItems > 10 && (
          <GlobalPagination
            limit={10}
            page={page}
            total_element={data?.pagination?.totalItems}
            handlePagination={(value: number) => handlePagination(value)}
          />
        )}

        {data?.pagination?.totalItems <= 0 && !isLoading && !isError && (
          <div className="flex justify-center items-center h-20">
            <h3>Data Not Found</h3>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderListPage;
