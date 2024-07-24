import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/view/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pure-black": "#000",
        "black-400": "#5C5B43",
        "black-600": "#313025",
        "black-800": "#211E03",
        "text-blar": "#6B7280",
        "text-light": "#B8B8B8",
        "primary-color": "#FBE200",
        "semi-primary": "#9E9012",
        "yellow-bg": "#F6F0B1",
        "yellow-50": "#D3D2AA",
        "yellow-100": "#FEFFD8",
        "red-bg-900": "#FEE2E2",
        "sky-bg": "#DCFCE7",
        "text-blue": "#3C5BBB",
        "text-red": "#AB3E3E",
        "y-50": "#D3D2AA",
        "border-primary": "#C9CFDA",
        "bg-primary": "#F3F4F6",
      },
      spacing: {},
      boxShadow: {
        "shadow-primary": "0px 4px 15px 0px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Manrope", "sans-serif"],
      },
      keyframes: {
        loading: {
          "0%": { width: "0%" },
          "100%": { width: "80%" },
        },
      },
      animation: {
        loading: "loading 2s forwards cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
    screens: {
      sm: "450px",
      md: "720px",
      lg: "980px",
      xl: "1160px",
      "2xl": "1400px",
      "max-sm": { max: "374px" },
      "max-md": { max: "767px" },
      "max-lg": { max: "1023px" },
      "max-xl": { max: "1199px" },
      "max-2xl": { max: "1439px" },
    },
  },
  plugins: [],
};
export default config;
