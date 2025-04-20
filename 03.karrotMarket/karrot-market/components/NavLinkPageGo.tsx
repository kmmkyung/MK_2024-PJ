"use client"

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinkPageGo(){
  const pathName = usePathname();
  let pageLink = pathName.split("/")[1];
  if(pageLink === 'product'){pageLink = 'products';}
  else if(pageLink === 'post'){pageLink = 'life';}
    
  return (
  <nav className="setting-nav">
    <div className="flex w-screen items-center justify-between px-5 h-[60px]">
      <Link className="default-textColor" href={`/${pageLink}`}>
        <ChevronLeftIcon className="size-6 p-2 box-content"/>
      </Link>
      <ThemeToggleButton/>
    </div>
  </nav>
  )
}