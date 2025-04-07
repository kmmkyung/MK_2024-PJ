import NavProductDetail from "@/components/NavProductDetail";

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <NavProductDetail/>
      {children}
    </>
  );
}
