"use client";

import { useState, useEffect } from "react";
import { useGetUserOrderListQuery } from "../slices";
import Preloader from "@/components/loading/Preloader";
import UserOrderCard from "@/components/card/UserOrderCard";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useSearchParams, useRouter } from "next/navigation";
import GlobalPagination from "@/components/pagination/GlobalPagination";

const MyBookingView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const activePage: string | null = searchParams.get("page");
  const skipQuery = !page;

  const { data, isLoading, isError } = useGetUserOrderListQuery(
    { page },
    { skip: skipQuery },
  );

  const handlePagination = (value: number) => {
    let url: string | null = searchParams?.toString();

    url = setQueryParams(url, "page", value.toString());

    setPage(value);

    router.push(`/my-booking${url ? `?${url}` : ""}`);
  };

  useEffect(() => {
    if (activePage) {
      setPage(Number(activePage));
    }
  }, []);

  return (
    <main className="bg-white">
      <div className="container mx-auto">
        <div className="w-full">
          <div className="mb-8">
            <h3 className="text-2xl lg:text-4xl font-semibold text-black mb-8">
              My booking lists
            </h3>

            <p className="w-28 h-[1px] bg-border-primary"></p>
          </div>

          {isLoading && !isError && (
            <div className="flex justify-center items-center h-20">
              <Preloader title="Page Loading.." />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-3">
            {data &&
              !isLoading &&
              !isError &&
              data?.data?.map((order: any) => (
                <UserOrderCard order={order} key={order?.order_id} />
              ))}
          </div>

          {!isLoading && !isError && data?.pagination?.totalItems > 8 && (
            <GlobalPagination
              limit={8}
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
      </div>
    </main>
  );
};

export default MyBookingView;
