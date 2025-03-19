import NoLoginNav from "@/components/NoLoginNav";

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <NoLoginNav/>
      {children}
    </>
  );
}
