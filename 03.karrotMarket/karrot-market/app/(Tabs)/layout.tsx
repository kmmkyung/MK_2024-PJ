import TabBar from "@/components/TabBar";
import TabsNav from "@/components/TabsNav";

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <TabsNav/>
        {children}
      <TabBar className="block md:hidden"/>
    </>
  );
}
