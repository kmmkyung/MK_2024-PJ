import { Roboto } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import type { Metadata } from "next";
// import BodyClassSetter from "@/components/BodyClassSetter";

export const metadata: Metadata = {
  title: {
    template:"%s | 🥕Karrot",
    default: "🥕Karrot Market"
  },
  description: "Sell and Buy all the things",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"]
});

export default async function RootLayout({children}:Readonly<{children: React.ReactNode}>) {

  return (
    <html lang="en">
      <body className={`${roboto.className} text-neutral-800 dark:text-neutral-200 dark:bg-neutral-900 antialiased`}>
        {/* <BodyClassSetter/> */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
