import ProductNav from "@/components/ProductNav";

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <ProductNav/>
      {children}
    </>
  );
}
