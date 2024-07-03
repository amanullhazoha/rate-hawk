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

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          {children}
          <ToastContainer />
        </body>
      </Provider>
    </html>
  );
}
