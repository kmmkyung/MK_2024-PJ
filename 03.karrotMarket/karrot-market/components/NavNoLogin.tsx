'use client'

import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function NoLoginNav(){
  const pathName = usePathname();

  return (
  <nav className="setting-nav">
    <div className="flex w-full items-center justify-between px-5 h-[60px]">
      {pathName ==='/' ? 
      <p className="text-sm pointer-events-none bg-lime-500 px-3 py-1 rounded-2xl dark:text-black">🐰 Click the screen on desktop!</p>
      :
      <Link href='/'>
        <HomeIcon className="text-black dark:text-white size-6 hover:text-primary transition-colors"/>
      </Link>
      }
      <div className="flex items-center gap-2">
        <ThemeToggleButton/>
      </div>
    </div>
  </nav>
  )
}