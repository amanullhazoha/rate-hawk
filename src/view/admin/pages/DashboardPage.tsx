"use client";

import { useState, useEffect, useRef } from "react";
import Table from "@/components/table/Table";
import AdminCard from "@/components/card/AdminCard";
import { useGetDashboardDataQuery } from "../slice";
import Preloader from "@/components/loading/Preloader";
import HotelManageModal from "@/components/modal/HotelManageModal";

const columns = [
  {
    label: "Image",
    path: "imageUrl",
    content: (row: any) => (
      <td className="p-2">
        <img
          alt={row.name}
          className="w-10 h-10 rounded-lg"
          src={row?.images?.[0]?.replace("{size}", "1024x768")}
        />
      </td>
    ),
  },
  {
    label: "Hotel Name",
    path: "name",
    content: (row: any) => <td className="p-2">{row?.name}</td>,
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
    path: "name",
    content: (row: any) => <td className="p-2">{row?.region.name}</td>,
  },
  {
    label: "Country Code",
    path: "country_code",
    content: (row: any) => <td className="p-2">{row?.region?.country_code}</td>,
  },
  {
    label: "Check In Time",
    path: "check_in_time",
    content: (row: any) => <td className="p-2">{row?.check_in_time}</td>,
  },
  {
    label: "Check Out Time",
    path: "check_out_time",
    content: (row: any) => <td className="p-2">{row?.check_out_time}</td>,
  },
];

const DashboardPage = () => {
  const scrollPositionRef = useRef(0);
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, isError } = useGetDashboardDataQuery("");

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";

      scrollPositionRef.current = window.scrollY;

      document.body.style.top = `-${scrollPositionRef.current}px`;
    } else {
      document.body.style.overflow = "auto";

      window.scrollTo(0, scrollPositionRef.current);
    }

    return () => {
      document.body.style.overflow = "auto";

      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [openModal]);

  return (
    <main className="max-md:px-2.5 max-md:py-5">
      {isLoading && !isError && (
        <div className="flex justify-center items-center h-40">
          <Preloader title="Page Loading.." />
        </div>
      )}

      {data?.data && !isLoading && !isError && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <HotelManageModal
          handleClose={() => setOpenModal(false)}
          total_hotel={data?.data?.total_hotel}
        />
      )}
    </main>
  );
};

export default DashboardPage;
