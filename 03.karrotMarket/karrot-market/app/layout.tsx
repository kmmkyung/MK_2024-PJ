import { Roboto } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template:"%s | 🥕Karrot",
    default: "🥕Karrot Market"
  },
  description: "Sell and Buy all the things",
};

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  subsets: ["latin"],
  weight: '400',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} text-neutral-800 dark:text-neutral-200 dark:bg-neutral-900 antialiased overflow-y-scroll`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
