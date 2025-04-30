"use client"

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import ThemeToggleButton from "./ThemeToggleButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavLinkPageGo(){
  const router = useRouter();
  const pathName = usePathname();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    // 히스토리가 존재하는지 여부 확인
    if (window.history.length > 1) {
      setHasHistory(true);
    }
  }, []);

  function handleBack(){
    if (hasHistory && pathName !== 'product/add' && pathName !== 'post/add') router.back();
    else {
      let fallback = '/';
      const link = pathName.split("/")[1];
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