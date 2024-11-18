"use client";

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ArrowIcon from "@/assets/icons/ArrowIcon";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          {children}
          <ToastContainer style={{ zIndex: "10000000000" }} />

          <button
            onClick={scrollToTop}
            className="sticky left-[calc(100%-70px)] bottom-5 z-[10000000000] bg-yellow-400 px-3 py-3 rounded-full shadow-md rotate-[270deg]"
          >
            <ArrowIcon />
          </button>
        </body>
      </Provider>
    </html>
  );
}
