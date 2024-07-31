"use client";

import { useState, useEffect } from "react";
import Table from "@/components/table/Table";
import { useGetAllTransactionQuery } from "../slice";
import Preloader from "@/components/loading/Preloader";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useSearchParams, useRouter } from "next/navigation";
import GlobalPagination from "@/components/pagination/GlobalPagination";

const columns = [
  {
    label: "ID",
    path: "_id",
    content: (row: any) => <td className="p-2">{row._id}</td>,
  },
  {
    label: "Order ID",
    path: "order_id",
    content: (row: any) => <td className="p-2">{row.order_id}</td>,
  },
  {
    label: "Amount",
    path: "amount",
    content: (row: any) => (
      <td className="p-2 uppercase">
        {row.amount} {row.currency}
      </td>
    ),
  },
  {
    label: "Customer Name",
    path: "customer_name",
    content: (row: any) => <td className="p-2">{row.customer_name}</td>,
  },
  {
    label: "Customer Email",
    path: "customer_email",
    content: (row: any) => <td className="p-2">{row.customer_email}</td>,
  },
  {
    label: "Payment Status",
    path: "payment_status",
    content: (row: any) => <td className="p-2">{row.payment_status}</td>,
  },
  {
    label: "Payment Method",
    path: "payment_method",
    content: (row: any) => <td className="p-2">{row.payment_method}</td>,
  },
];

const TransactionHistoryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const activePage: string | null = searchParams.get("page");
  const skipQuery = !page;

  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetAllTransactionQuery({ page }, { skip: skipQuery });

  const handlePagination = (value: number) => {
    let url: string | null = searchParams?.toString();

    url = setQueryParams(url, "page", value.toString());

    setPage(value);

    router.push(`/admin/transaction-history${url ? `?${url}` : ""}`);
  };

  useEffect(() => {
    if (activePage) {
      setPage(Number(activePage));
    }
  }, []);

  console.log(transactions);

  return (
    <main className="max-md:px-2.5 max-md:py-6">
      <h2 className="text-2xl font-bold">Transaction History</h2>

      <div className="mt-4">
        {isLoading && !isError && (
          <div className="flex justify-center items-center h-40">
            <Preloader title="Page Loading.." />
          </div>
        )}

        {transactions && !isLoading && !isError && (
          <Table columns={columns} items={transactions?.data} />
        )}

        {!isLoading &&
          !isError &&
          transactions?.pagination?.totalItems > 10 && (
            <GlobalPagination
              limit={10}
              page={page}
              total_element={transactions?.pagination?.totalItems}
              handlePagination={(value: number) => handlePagination(value)}
            />
          )}
      </div>
    </main>
  );
};

export default TransactionHistoryPage;
