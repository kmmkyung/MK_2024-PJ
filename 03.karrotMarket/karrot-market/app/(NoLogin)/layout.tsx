import NoLoginNav from "@/components/NoLoginNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🥕Karrot",
  description: "Karrot Marck",
};

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <NoLoginNav/>
      {children}
    </>
  );
}
