import { useState, useEffect } from "react";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const CurrencySelect = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [currency, setCurrency] = useState("USD");
  const { setQueryParams } = useSearchQueryParam();

  const handleSelectCurrency = (value: string) => {
    setCurrency(value);

    localStorage.setItem("currency", value);

    let url = searchParams.toString();

    url = value &&  setQueryParams(url, "currency", value);

    router.push(`${pathName}${url ? `?${url}` : ""}`);
  };

  useEffect(() => {
    const lang = localStorage.getItem("currency");

    if (lang) {
      setCurrency(lang);
    } else {
      localStorage.setItem("currency", "EN");
    }
  }, []);

  return (
    <div className="relative group">
      <p className="px-2 py-1 border border-border-primary rounded-md text-base flex items-center gap-1 cursor-pointer w-[70px] justify-between">
        {currency}
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.25 6L8.25 10L4.25 6"
            stroke="#211E03"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </p>

      <ul className="hidden rounded-md absolute top-[35px] left-0 right-0 group-hover:block bg-white border border-border-primary px-2 py-1 z-[99999]">
        <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectCurrency("USD")}
        >
          USD
        </li>

        <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectCurrency("EUR")}
        >
          EUR
        </li>

        <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectCurrency("GBP")}
        >
          GBP
        </li>
      </ul>
    </div>
  );
};

export default CurrencySelect;
