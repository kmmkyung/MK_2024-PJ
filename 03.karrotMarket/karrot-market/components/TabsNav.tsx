'use client'

import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";

export default function TabsNav(){
  const pathName = usePathname();

  return (
  <nav className="fixed z-50">
    <div className="flex w-screen items-center justify-between px-5 h-[60px]">
      <Link href='/products'>🥕</Link>
      <ul className="hidden md:flex items-center justify-center gap-10">
        <li className="px-2">
          <Link className={`text-ml ${pathName === '/products'? 'text-primary':'default-textColor'}`} href='/products'>SHOP</Link>
        </li>
        <li className="px-2">
          <Link className={`text-ml ${pathName === '/life'? 'text-primary':'default-textColor'}`} href='/life'>LIFE</Link>
        </li>
        <li className="px-2">
          <Link className={`text-ml ${pathName === '/chats'? 'text-primary':'default-textColor'}`} href='/chats'>CHATS</Link>
        </li>
        <li className="px-2">
          <Link className={`text-ml ${pathName === '/live'? 'text-primary':'default-textColor'}`} href='/live'>LIVE SHOP</Link>
        </li>
        <li className="px-2">
          <Link className={`text-ml ${pathName === '/profile'? 'text-primary':'default-textColor'}`} href='/profile'>PROFILE</Link>
        </li>
      </ul>
      <div className="flex items-center gap-2">
        <ThemeToggleButton/>
      </div>
    </div>
  </nav>
  )
}