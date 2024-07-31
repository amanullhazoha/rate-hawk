"use client";

import { useState, useEffect } from "react";
import { useGetUserAllSaveListQuery } from "../slice";
import Preloader from "@/components/loading/Preloader";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useSearchParams, useRouter } from "next/navigation";
import GlobalPagination from "@/components/pagination/GlobalPagination";
import FavoriteProductCard from "@/components/card/FavoriteProductCard";

const SaveListPageView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const activePage: string | null = searchParams.get("page");
  const skipQuery = !page;

  const { data, isLoading, isError } = useGetUserAllSaveListQuery(
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

  console.log(data);

  return (
    <main className="bg-white">
      <div className="container mx-auto">
        <div className="w-full">
          <div className="mb-8">
            <h3 className="text-2xl lg:text-4xl font-semibold text-black mb-8">
              Save lists
            </h3>

            <p className="w-28 h-[1px] bg-border-primary"></p>
          </div>

          {isLoading && !isError && (
            <div className="flex justify-center items-center h-20">
              <Preloader title="Page Loading.." />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data &&
              !isLoading &&
              !isError &&
              data?.data?.map((favorite: any) => (
                <>
                  <FavoriteProductCard favorite={favorite} />
                </>
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

          {data?.data?.length <= 0 && !isLoading && !isError && (
            <div className="flex justify-center items-center h-20">
              <h3>Data Not Found</h3>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SaveListPageView;
