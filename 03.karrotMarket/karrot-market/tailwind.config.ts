import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";

export default {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#f97316",
        primaryHover: '#fb923c'
      },
      textColor: {
        primary: "#f97316",
        primaryHover: '#fb923c'
      },
      borderColor: {
        primary: "#f97316",
        primaryHover: '#fb923c'
      }
      ,
      ringColor: {
        primary: "#f97316",
      },
      animation : {
        loaderAn: 'loader 1s linear infinite',
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
      }
    }
  },
  plugins: [
    formsPlugin,
  ],
} satisfies Config;
