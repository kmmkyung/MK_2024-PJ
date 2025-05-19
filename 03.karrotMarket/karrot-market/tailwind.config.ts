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
        gradient: 'fontColorGradient 5s linear infinite',
      },
      keyframes: {
        fontColorGradient: {
          "0%, 100%": { backgroundPosition: "-0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      }
    }
  },
  plugins: [
    formsPlugin,
  ],
} satisfies Config;
