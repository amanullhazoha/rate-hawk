"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import { useParams } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { RoomIcon } from "@/assets/ameniteIcon";
import product from "@/assets/images/product.jpg";
import { useGetUserOrderByIdQuery } from "@/view/search-hotel/slice/search-hotel.slice";
import { useCreateStripePaymentMutation } from "@/view/hotel-detail/slice/hotel-detail.slice";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_API_STRIPE_PUBLIC_KEY as string,
);

const responsive = {
  mobile: {
    breakpoint: { max: 20000, min: 0 },
    items: 1,
  },
};

interface Guest {
  first_name: string;
  last_name: string;
}

const checkGuestNameError = (nameList: any, error: any, setError: any) => {
  const newError = error?.length > 0 ? [...error] : [];

  nameList.forEach((item: any, index: number) => {
    if (!item?.first_name) {
      newError[index] = {
        ...newError[index],
        first_name: "First name is required.",
      };
    } else if (!item?.last_name) {
      newError[index] = {
        ...newError[index],
        last_name: "Last name is required.",
      };
    } else {
      newError[index] = null;
    }
  });

  setError(newError);
};

const ReservePage = () => {
  const params: any = useParams();
  const order_id: string = params.order_id;
  const [guestName, setGuestName] = useState<Guest[]>([]);
  const [guestNameError, setGuestNameError] = useState<Guest[]>([]);

  const handleChange = (index: number, name: string, newValue: any) => {
    const updatedArray: any = guestName?.length > 0 ? guestName : [];

    updatedArray[index] = { ...updatedArray[index], [name]: newValue };

    checkGuestNameError(updatedArray, guestNameError, setGuestNameError);

    setGuestName(updatedArray);
  };

  const {
    data: order,
    isLoading,
    isError,
  } = useGetUserOrderByIdQuery({ order_id });

  const [
    createStripePayment,
    { isLoading: isPaymentLoading, data: paymentData },
  ] = useCreateStripePaymentMutation();

  const handleReserved = async () => {
    if (guestNameError.length >= order?.data?.guests) {
      if (
        guestNameError.every((value) => value === undefined || value === null)
      ) {
        const payload = {
          residency: "nl",
          order_id: params?.order_id,
          adults: order?.data?.guests,
          checkIn: order?.data?.check_in,
          checkOut: order?.data?.check_out,
          hotel_name: order?.data?.hotel_name,
          currency: order?.data?.currency_code,
          star_rating: order?.data?.star_rating,
          guestsName: JSON.stringify(guestName),
          total_night: order?.data?.total_night,
          children: order?.data?.children?.length,
          total_amount: Number(order?.data?.total_amount),
        };

        const data: any = await createStripePayment(payload);

        if (data?.data?.id) {
          const stripe = await stripePromise;

          if (stripe) {
            await stripe.redirectToCheckout({ sessionId: data?.data?.id });
          }
        }
      } else {
        return toast.error("Please input all guest name.");
      }
    } else {
      return toast.error("Please input all guest name.");
    }
  };

  console.log(guestNameError, guestName, order);

  return (
    <main className="bg-white pt-10 pb-10">
      <div className="container mx-auto px-2.5">
        {order && !isLoading && !isError ? (
          <div className="w-full md:w-[90%] mx-auto">
            <h2 className="text-xl font-medium text-black mb-4">
              Hotel information
            </h2>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-8">
                {Array.from(
                  { length: order?.data?.guests },
                  (_, i) => i + 1,
                ).map((item, index) => (
                  <div className="mb-6" key={index}>
                    <h3 className="text-base font-medium text-black mb-2">
                      Input {item} No Guest Name
                    </h3>

                    <div className="grid grid-cols-2 gap-6 border border-border-primary px-4 py-4">
                      <div>
                        <label className="text-text-blar font-medium">
                          First Name
                        </label>

                        <div>
                          <input
                            type="text"
                            value={
                              guestName?.length >= item + 1
                                ? guestName[item]?.first_name
                                : ""
                            }
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleChange(item, "first_name", e.target.value)
                            }
                            className="outline-none focus:outline-none placeholder:text-blar placeholder:text-sm bg-transparent border border-border-primary rounded-lg w-full px-2 py-1 mt-1"
                          />

                          {guestNameError?.length >= item + 1 && (
                            <div className="text-sm text-red-500">
                              {guestNameError[item]?.first_name}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-text-blar font-medium">
                          Last Name
                        </label>

                        <div>
                          <input
                            type="text"
                            value={
                              guestName?.length >= item + 1
                                ? guestName[item]?.last_name
                                : ""
                            }
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleChange(item, "last_name", e.target.value)
                            }
                            className="outline-none focus:outline-none placeholder:text-blar placeholder:text-sm bg-transparent border border-border-primary rounded-lg w-full px-2 py-1 mt-1"
                          />

                          {guestNameError?.length >= item + 1 && (
                            <div className="text-sm text-red-500">
                              {guestNameError[item]?.last_name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  className={`p-3.5 rounded-md bg-bg-primary grid grid-cols-3 gap-4`}
                >
                  <div className="w-full md:w-[200px] col-span-3 md:col-span-1">
                    <Carousel responsive={responsive}>
                      {order?.data?.images?.length <= 0 ? (
                        <>
                          <div className="h-[200px] w-[200px]">
                            <Image
                              fill
                              src={product}
                              alt="Room"
                              className="h-full object-cover rounded-md"
                            />
                          </div>
                        </>
                      ) : (
                        order?.data?.images?.map((image: string) => (
                          <div className="h-[200px] w-[200px]" key={image}>
                            <Image
                              fill
                              alt={order?.data?.hotel_name}
                              src={image.replace("{size}", "1024x768")}
                              className="h-full object-cover rounded-md"
                            />
                          </div>
                        ))
                      )}
                    </Carousel>
                  </div>

                  <div className="col-span-3 md:col-span-2 md:ml-3 mt-2">
                    <div className="flex flex-col gap-4 md:gap-2 justify-between h-full">
                      <div>
                        <h4 className="text-lg font-medium text-black">
                          {order?.data?.hotel_name}
                        </h4>

                        <div className="flex items-center flex-wrap gap-4 mt-2">
                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 balcony</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 bathroom</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 bedding</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 bedrooms</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 capacity</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 class</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 club</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 family</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">2 floor</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">3 quality</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">2 capacity</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 sex</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <RoomIcon />

                            <p className="text-sm font-medium">1 view</p>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex items-center justify-end">
                        <div>
                          <p className="text-xl font-medium text-black">
                            {order?.data?.currency_code}{" "}
                            {order?.data?.total_amount}
                            <sub className="text-sm font-normal text-black-400">
                              {" "}
                              /night
                            </sub>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 px-4 py-4 border border-border-primary shadow-md rounded-md h-fit">
                <div className="w-full flex flex-col gap-3">
                  <div>
                    <p className="text-text-blar text-base">
                      Check In - Check Out
                    </p>

                    <p className="text-black text-lg font-semibold">
                      {order?.data?.check_in} - {order?.data?.check_out}
                    </p>
                  </div>

                  <div>
                    <p className="text-text-blar text-base">Guests</p>

                    <p className="text-black text-lg font-semibold">
                      {order?.data?.guests} Guests
                    </p>
                  </div>

                  <div>
                    <p className="text-text-blar text-base">Children</p>

                    <p className="text-black text-lg font-semibold">
                      {order?.data?.children?.length} Children&apos;s
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center border-b border-border-primary pb-2 mt-3">
                      <p className="text-text-blar text-base">
                        {order?.data?.total_night} Night
                      </p>

                      <p className="text-text-blar text-base">
                        {order?.data?.currency_code} {order?.data?.total_amount}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <p className="text-black font-medium text-base">Total</p>

                      <p className="text-black font-medium text-base">
                        {order?.data?.currency_code} {order?.data?.total_amount}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReserved}
                    className="bg-yellow-400 px-1 py-1 text-base w-full text-center rounded-md"
                  >
                    Booked
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-10">
            <p>loading....</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ReservePage;
