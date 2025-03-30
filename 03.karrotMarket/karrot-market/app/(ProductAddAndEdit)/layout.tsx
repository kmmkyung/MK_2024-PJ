import NavProduct from "@/components/NavProduct";

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <NavProduct/>
      {children}
    </>
  );
}
