import NavLinkPageGo from "@/components/NavLinkPageGo";

export default async function layout({children }: Readonly<{children: React.ReactNode;}>) {

  return (
    <>
      <NavLinkPageGo/>
      {children}
    </>
  );
}
