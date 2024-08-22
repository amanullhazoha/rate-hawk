"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import { useRouter } from "next/navigation";
import { parse, formatISO, getTime } from "date-fns";
import MapIcon from "@/assets/icons/MapIcon";
import { useSearchParams } from "next/navigation";
import product_image from "@/assets/images/product.jpg";
import { localTimeConverter } from "@/lib/localTimeConverter";
import { useOrderCancelMutation } from "@/view/my-booking/slices";

const responsive = {
  mobile: {
    breakpoint: { max: 20000, min: 0 },
    items: 1,
  },
};

const status: any = {
  pending: "bg-black-800 text-white",
  paid: "bg-green-600 text-white",
  failed: "bg-text-red text-white",
  cancelled: "bg-text-red text-white",
  completed: "bg-green-800 text-white",
};

const UserOrderCard = ({ order }: { order: any }) => {
  const searchParams = useSearchParams();
  const [userOrderCancel, { isLoading }] = useOrderCancelMutation();

  const currentISOTime = getTime(new Date());
  const cancelTime = order?.choose_room?.payment_options?.payment_types[0]
    ?.cancellation_penalties?.free_cancellation_before
    ? localTimeConverter(
        order?.choose_room?.payment_options?.payment_types[0]
          ?.cancellation_penalties?.free_cancellation_before,
      )
    : "";

  const isCancel = cancelTime
    ? currentISOTime <
      getTime(parse(cancelTime, "dd/MM/yyyy hh:mm a", new Date()))
    : false;

  const handleCancel = async (partner_order_id: string) => {
    const payload = {
      partner_order_id,
    };

    const data: any = await userOrderCancel(payload);

    if (!data?.error) {
      return toast.success("Order cancel successfully.");
    }

    toast.error(
      data?.error?.data?.message
        ? data?.error?.data?.message
        : "Order not cancel.",
    );
  };

  return (
    <div className="shadow-md p-2 rounded-md">
      <div className="rounded-[10px] relative">
        <div className="w-full">
          <Carousel responsive={responsive}>
            {order?.images?.length <= 0 ? (
              <>
                <div className="h-[200px] w-[200px]">
                  <Image
                    fill
                    src={product_image}
                    alt={order?.hotel_name}
                    className="h-full object-cover rounded-md"
                  />
                </div>
              </>
            ) : (
              order?.images?.map((image: string) => (
                <div className="h-[200px] w-full" key={image}>
                  <Image
                    fill
                    alt={order?.hotel_name}
                    src={image.replace("{size}", "200x200")}
                    className="h-full object-cover rounded-md"
                  />
                </div>
              ))
            )}
          </Carousel>

          <div className="absolute top-3 flex justify-end items-center left-0 right-0">
            <span
              onClick={() => {
                if (order?.status === "completed" && isCancel) {
                  handleCancel(order?.order_id);
                }
              }}
              className={`w-fit px-2 py-1 rounded-full flex  justify-center items-center mr-2 ${
                status[order?.status]
              } ${
                order?.status === "completed" && isCancel && "cursor-pointer"
              }`}
            >
              {order?.status}
            </span>
          </div>
        </div>
      </div>

      <Link
        href={`/hotel-detail/test_hotel${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`}
        // href={`/hotel-detail/${favorite?.hotel_id}${
        //   searchParams.toString() ? `?${searchParams.toString()}` : ""
        // }`}
      >
        <div className="mt-3.5">
          <p className="text-base font-semibold text-black-800 mb-2 truncate">
            {order?.hotel_name}
          </p>

          <div className="h-[1px] bg-text-light w-14 my-2"></div>

          <div className="flex justify-between items-center">
            <p className="flex gap-2 items-center text-text-blar text-sm font-medium">
              <MapIcon />
              {order?.region_name}
            </p>

            <div className="flex items-center gap-1">
              <span>{order?.total_night} Night</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="flex gap-2 items-center text-text-blar text-sm font-medium">
              {order?.kind}
            </p>

            <div className="flex items-center gap-1">
              <span>
                {order?.total_amount} {order?.currency_code}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserOrderCard;
