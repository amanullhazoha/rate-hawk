import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  disabled?: true | false;
  type?: "button" | "submit" | "reset" | undefined;
}

const ButtonPrimary = ({
  type,
  children,
  className,
  disabled = false,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "bg-primary-color font-semibold text-center w-full rounded-lg  py-[14px] lg:text-xl text-md text-black-600 border border-[#DBDBDB] font-secondary",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
