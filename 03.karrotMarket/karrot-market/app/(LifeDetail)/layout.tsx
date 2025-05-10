import NavLinkPageGo from "@/components/NavLinkPageGo";

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <NavLinkPageGo/>
      {children}
    </>
  );
}
