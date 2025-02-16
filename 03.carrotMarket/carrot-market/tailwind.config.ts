import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";

export default {
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
      ringColor: {
        primary: "#f97316",
      }
    }
  },
  plugins: [
    formsPlugin,
  ],
} satisfies Config;
