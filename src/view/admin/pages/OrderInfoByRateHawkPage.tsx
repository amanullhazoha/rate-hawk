"use client";

import { useState, useEffect } from "react";
import Table from "@/components/table/Table";
import { useGetOrderInfoMutation } from "../slice";
import Preloader from "@/components/loading/Preloader";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useSearchParams, useRouter } from "next/navigation";
import GlobalPagination from "@/components/pagination/GlobalPagination";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const activePage: string | null = searchParams.get("page");

  const [getOrderInfo, { isLoading, isError, data: orderInfo }] =
    useGetOrderInfoMutation();

  const handlePagination = (value: number) => {
    let url: string | null = searchParams?.toString();

    url = setQueryParams(url, "page", value.toString());

    setPage(value);

    router.push(`/admin/order-info${url ? `?${url}` : ""}`);
  };

  useEffect(() => {
    if (activePage) {
      setPage(Number(activePage));
    }
  }, []);

  useEffect(() => {
    const payload = {
      ordering: {
        ordering_type: "desc",
        ordering_by: "created_at",
      },
      pagination: {
        page_size: "10",
        page_number: page.toString(),
      },
      search: {
        created_at: {
          from_date: "2018-12-05T00:00",
        },
      },
      language: "en",
    };

    getOrderInfo(payload);
  }, [page]);

  return (
    <main className="max-md:px-2.5 max-md:py-6">
      <h2 className="text-2xl font-bold">Order Info By Rate Hawk</h2>
      <div className="mt-4">
        {isLoading && !isError && (
          <div className="flex justify-center items-center h-40">
            <Preloader title="Page Loading.." />
          </div>
        )}

        {!isLoading && !isError && orderInfo && (
          <Table columns={columns} items={orderInfo?.data?.data?.orders} />
        )}

        {!isLoading && !isError && orderInfo?.data?.data?.total_orders > 10 && (
          <GlobalPagination
            limit={8}
            page={page}
            total_element={orderInfo?.data?.data?.total_orders}
            handlePagination={(value: number) => handlePagination(value)}
          />
        )}

        {orderInfo?.data?.data?.total_orders <= 0 && !isLoading && !isError && (
          <div className="flex justify-center items-center h-20">
            <h3>Data Not Found</h3>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderInfoByRateHawkPage;
