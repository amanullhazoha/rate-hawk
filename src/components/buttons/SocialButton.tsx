import clsx from "clsx";
import React from "react";

interface Props {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  authLink?: string;
  onClick?: () => void;
}

const SocialButton = ({
  icon,
  children,
  className,
  onClick,
  authLink,
}: Props) => {
  return (
    <a
      href={authLink}
      className={clsx(
        "bg-yellow-bg flex items-center justify-between py-3 px-4 w-full rounded-lg",
        className,
      )}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className="md:text-base text-sm font-medium text-black">
        {children}
      </div>
      <div></div>
    </a>
  );
};

export default SocialButton;
