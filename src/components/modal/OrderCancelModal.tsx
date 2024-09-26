"use client";

import { useEffect, useRef } from "react";

const OrderCancelModal = ({
  handleClose,
  handleCancel,
}: {
  handleClose: () => void;
  handleCancel: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Disable page scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div className="bg-black bg-opacity-10 absolute top-0 left-0 right-0 bottom-0 z-[10000000000] flex items-center justify-center">
      <div className="container mx-auto px-1.5 flex justify-center">
        <div
          ref={modalRef}
          className="px-4 py-4 bg-white rounded-[10px] shadow-modal w-[400px] min-h-[180px] flex flex-col justify-between"
        >
          <div className="flex items-center justify-center mb-4">
            <h3 className="text-lg font-semibold text-text-tertiary text-center">
              Are you sure to cancel this order!
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="py-2.5 w-full rounded-lg bg-green-700 text-white text-base font-medium"
            >
              No
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="py-2.5 w-full rounded-lg bg-red-500 text-white text-base font-medium"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCancelModal;

