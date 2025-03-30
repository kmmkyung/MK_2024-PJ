import TabBar from "@/components/TabBar";
import NavTabs from "@/components/NavTabs";

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <NavTabs/>
        {children}
      <TabBar className="block md:hidden"/>
    </>
  );
}
