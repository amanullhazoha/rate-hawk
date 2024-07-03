import { useEffect, useState } from "react";

const LanguageSelect = () => {
  const [language, setLanguage] = useState("EN");

  const handleSelectLanguage = (value: string) => {
    setLanguage(value);

    localStorage.setItem("lang", value);
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang");

    if (lang) {
      setLanguage(lang);
    } else {
      localStorage.setItem("lang", "EN");
    }
  }, []);

  return (
    <div className="relative group">
      <p className="px-2 py-1 border border-border-primary rounded-md text-base flex items-center gap-1 cursor-pointer w-[58px]">
        {language}
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

      <ul className="hidden absolute top-[40px] left-0 right-0 group-hover:block bg-white border border-border-primary px-1 py-1 z-50">
        <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectLanguage("EN")}
        >
          EN
        </li>

        <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectLanguage("BN")}
        >
          BN
        </li>

        <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectLanguage("IN")}
        >
          IN
        </li>
      </ul>
    </div>
  );
};

export default LanguageSelect;