import TabBar from "@/components/TabBar";
import TabsNav from "@/components/TabsNav";
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
      <TabsNav/>
        {children}
      <TabBar className="block md:hidden"/>
    </>
  );
}
