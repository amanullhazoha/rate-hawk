import Script from "next/script";
import { useEffect, useState } from "react";

const LanguageSelect = () => {
  const [language, setLanguage] = useState("EN");

  function googleTranslateElementInit() {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,bn,nl,de",
      },
      "google_translate_element"
    );
  }

  const handleSelectLanguage = (lang: string) => {
    setLanguage(lang);

    console.log(lang);
    localStorage.setItem("lang", lang);

    const element: any = document.querySelector(".goog-te-combo");
    element.value = lang.toLowerCase();
    element.dispatchEvent(new Event("change"));
  };

  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  useEffect(() => {
    const lang = localStorage.getItem("lang");

    if (lang) {
      setLanguage(lang);
    }
  }, []);

  return (
    <div className="relative group notranslate">
      <div
        id="google_translate_element"
        style={{ visibility: "hidden", width: "1px", height: "1px" }}
      ></div>

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

      <ul className="hidden rounded-md absolute top-[35px] left-0 right-0 group-hover:block bg-white border border-border-primary px-2 py-1 z-[99999]">
        <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectLanguage("EN")}
        >
          EN
        </li>

        {/* <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectLanguage("BN")}
        >
          BN
        </li> */}

        <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectLanguage("NL")}
        >
          NL
        </li>

        <li
          className="cursor-pointer mb-1"
          onClick={() => handleSelectLanguage("DE")}
        >
          DE
        </li>
      </ul>

      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
        async={true}
      />
    </div>
  );
};

export default LanguageSelect;
