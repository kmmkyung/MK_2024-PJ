'use client'

import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";

export default function NavTabs(){
  const pathName = usePathname();
  const pathNameSplit = pathName.split('/')[1];

  return (
  <nav className="setting-nav top-0">
    <div className="flex w-full items-center justify-between px-5 h-[60px]">
      <Link href='/products'>🥕</Link>
      <ul className="hidden md:flex items-center justify-center gap-10">
        <li className="px-2">
          <Link className={`text-ml ${pathNameSplit === 'products'? 'text-primary':'default-textColor'}`} href='/products'>SHOP</Link>
        </li>
        <li className="px-2">
          <Link className={`text-ml ${pathNameSplit === 'search'? 'text-primary':'default-textColor'}`} href='/search'>SEARCH</Link>
        </li>
        <li className="px-2">
          <Link className={`text-ml ${pathNameSplit === 'life'? 'text-primary':'default-textColor'}`} href='/life'>LIFE</Link>
        </li>
        <li className="px-2">
          <Link className={`text-ml ${pathNameSplit === 'chats'? 'text-primary':'default-textColor'}`} href='/chats'>CHATS</Link>
        </li>
        <li className="px-2">
          <Link className={`text-ml ${pathNameSplit === 'profile'? 'text-primary':'default-textColor'}`} href='/profile'>PROFILE</Link>
        </li>
      </ul>
      <div className="flex items-center gap-2">
        <ThemeToggleButton/>
      </div>
    </div>
  </nav>
  )
}