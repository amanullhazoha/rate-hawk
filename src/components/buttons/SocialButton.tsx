import clsx from 'clsx';
import React from 'react';

interface Props {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SocialButton = ({ icon, children, className, onClick }: Props) => {
  return (
    <button
      className={clsx(
        'bg-yellow-bg flex items-center justify-between py-3 px-4 w-full rounded-lg',
        className
      )}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className="text-base font-medium text-black">{children}</div>
      <div></div>
    </button>
  );
};

export default SocialButton;
