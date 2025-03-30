import NavNoLogin from "@/components/NavNoLogin";

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <NavNoLogin/>
      {children}
    </>
  );
}
