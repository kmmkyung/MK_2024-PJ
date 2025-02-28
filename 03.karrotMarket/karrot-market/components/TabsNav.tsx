'use client'

import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function TabsNav(){

  return (
  <nav className="fixed z-50">
    <div className="flex w-screen items-center justify-between px-5 h-[60px]">
      <Link href='/products'>🥕</Link>
      <ul className="flex items-center gap-2">
        <li><ThemeToggleButton/></li>
      </ul>
    </div>
  </nav>
  )
}