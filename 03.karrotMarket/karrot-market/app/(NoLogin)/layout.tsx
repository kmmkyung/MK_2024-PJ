import NavNoLogin from "@/components/NavNoLogin";

export default function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div>
      <NavNoLogin/>
      {children}
    </div>
  );
}
