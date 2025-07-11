"use client"

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import ThemeToggleButton from "./ThemeToggleButton";
import { usePathname, useRouter } from "next/navigation";

export default function NavLinkPageGo(){
  const router = useRouter();
  const pathName = usePathname();
  
  function handleBack() {
    const cameFromSearch = sessionStorage.getItem('cameFromSearch') === 'true';
    const cameFromProfileItem = sessionStorage.getItem('cameFromProfileItem') === 'true';
    const userProfileFrom = sessionStorage.getItem('userProfileFrom');
    if (cameFromSearch || cameFromProfileItem) {
      router.back();
      if(cameFromSearch){
        sessionStorage.removeItem('cameFromSearch');
      }
      else {
        sessionStorage.removeItem('cameFromProfileItem');
      }
    }
    else if (userProfileFrom) {
      router.push(userProfileFrom);
      sessionStorage.removeItem('userProfileFrom');
    }
    else {
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