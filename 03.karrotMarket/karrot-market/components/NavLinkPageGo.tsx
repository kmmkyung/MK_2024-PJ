"use client"

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import ThemeToggleButton from "./ThemeToggleButton";
import { usePathname, useRouter } from "next/navigation";

export default function NavLinkPageGo(){
  const router = useRouter();
  const pathName = usePathname();

  function handleBack() {
    const cameFromSearch = sessionStorage.getItem('cameFromSearch') === 'true';
  
    if (cameFromSearch) {
      router.back();
      sessionStorage.removeItem('cameFromSearch');
    } else {
      // 그 외에는 fallback
      let fallback = '/';
      const link = pathName.split('/')[1];
      if (link === 'product') fallback = '/products';
      else if (link === 'post') fallback = '/life';
      else fallback = `/${link}`;
      router.push(fallback);
    }
  }

  return (
  <nav className="setting-nav top-0">
    <div className="flex w-full items-center justify-between px-5 h-[60px]">
    <button onClick={handleBack} className="default-textColor">
      <ChevronLeftIcon className="size-6 p-2 box-content"/>
      </button>
      <ThemeToggleButton/>
    </div>
  </nav>
  )
}