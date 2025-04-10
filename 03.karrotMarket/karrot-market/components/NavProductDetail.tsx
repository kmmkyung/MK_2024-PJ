import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";

export default function NavProductDetail(){
  return (
  <nav className="setting-nav">
    <div className="flex w-screen items-center justify-between px-5 h-[60px]">
      <Link className="default-textColor" href="/products">
        <ChevronLeftIcon className="size-6 p-2 box-content"/>
      </Link>
      <ThemeToggleButton/>
    </div>
  </nav>
  )
}