'use client'

import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function NoLoginNav(){
  const pathName = usePathname();

  return (
  <nav className="fixed z-50">
    <div className="flex w-screen items-center justify-between px-5 h-[60px]">
      {pathName ==='/' ? 
      <p className="sm:text-lg text-sm pointer-events-none bg-lime-500 px-3 py-1 rounded-2xl dark:text-black">🐰 Click the screen on desktop!</p>
      :
      <Link href='/'>
        <HomeIcon className="fill-black dark:fill-white size-6 hover:text-primary transition-colors"/>
      </Link>
      }
      <ul className="flex items-center gap-2">
        <li><ThemeToggleButton/></li>
      </ul>
    </div>
  </nav>
  )
}