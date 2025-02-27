import NoLoginNav from "@/components/NoLoginNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template:"%s | 🥕Karrot",
    default: "🥕Karrot Market"
  },
  description: "Sell and Buy all the things",
};

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <NoLoginNav/>
      {children}
    </>
  );
}
