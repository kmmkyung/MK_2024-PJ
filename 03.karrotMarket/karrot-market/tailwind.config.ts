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
      ringColor: {
        primary: "#f97316",
      },
      animation : {
        homeGrayChat: 'homeGrayChat 1s 1s linear forwards',
        homeOrangeChat: 'homeOrangeChat 1s 0.8s linear forwards'
      },
      keyframes: {
        homeGrayChat: {
          "0%": {visibility:'hidden', opacity:'0', transform:'translateX(-15%)'},
          "100%": {visibility:'visible', opacity:'1', transform:'translateX(0%)'}
        },
        homeOrangeChat: {
          "0%": {opacity:'0', transform:'translateX(15%)'},
          "100%": {visibility:'visible', opacity:'1', transform:'translateX(0%)'}
        },
      }
    }
  },
  plugins: [
    formsPlugin,
  ],
} satisfies Config;
