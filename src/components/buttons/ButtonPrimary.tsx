import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ButtonPrimary = ({ children }: Props) => {
  return (
    <button className="bg-primary-color font-semibold text-center w-full rounded-lg  py-[14px] text-xl text-black-600 border border-[#DBDBDB] font-secondary">
      {children}
    </button>
  );
};

export default ButtonPrimary;
