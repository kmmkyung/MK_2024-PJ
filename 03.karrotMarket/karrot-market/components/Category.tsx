"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const categories = [
  "Furniture",
  "Electronics",
  "Home_Garden",
  "Baby_Kids",
  "Fashion",
  "Health_Beauty",
  "Hobbies",
  "Books_Music",
  "Pet",
  "Other",
];

export default function Category() {
  const searchParams = useSearchParams();  
  const category = searchParams?.get("category");
  const categoryAmpersand = categories.map((ele)=> ele.replace('_','&'))
  const pcCategory = useRef<HTMLDivElement>(null);
  const mobileCategory = useRef<HTMLDivElement>(null);
  const [ mobileCategoryOn , setMobileCategoryOn ] = useState(false);
  const [ nowCategory , setNowCategory ] = useState('ALL');

  useEffect(()=>{
    function updateDisplay(){
      if(window.innerWidth < 1150){
        mobileCategory.current!.style.display='block'
        pcCategory.current!.style.display='none'
      }
      else {
        mobileCategory.current!.style.display='none'
        pcCategory.current!.style.display='block'
      }
    }
    updateDisplay()
    window.addEventListener("resize", updateDisplay);
    return () => window.removeEventListener("resize", updateDisplay);
  },[])

  useEffect(() => {
    const categoryIndex = categories.indexOf(category || "");     
    if (categoryIndex !== -1) {
      setNowCategory(categoryAmpersand[categoryIndex]);
    } else {
      setNowCategory("ALL");
    }
  }, [category, categoryAmpersand]);

  function setMobileCategoryClick() {
    const newCategoryState = !mobileCategoryOn;
    setMobileCategoryOn(newCategoryState);
  
    if (mobileCategory.current) {
      const ulElement = mobileCategory.current.querySelector("ul");  
      if (newCategoryState) {
        ulElement!.style.height = `${ulElement!.scrollHeight}px`;
        ulElement!.style.overflow = "auto";
      } else {
        ulElement!.style.height = "0px";
        ulElement!.style.overflow = "hidden";
      }
    }
  }

  return (
    <>
    <div ref={pcCategory} className="absolute top-[60] z-10 h-[55] w-full bg-neutral-50 dark:bg-neutral-950">
      <ul className="pc-category flex items-center justify-center overflow-x-hidden gap-5 whitespace-nowrap md:max-w-screen-xl mx-auto p-2">
        <li className={`${ category === null ? "border-orange-500 border-[1px] rounded-full" : "border-transparent" }`}>
          <Link href={`/products`} className={`px-4 py-2 block text-xs ${ category === null  ? "text-primary font-bold" : "default-textColor" }`}>ALL</Link>
        </li>
      {categoryAmpersand.map((ele, idx) => (
        <li key={idx} className={`${ categories[idx] === category ? "border-orange-500 border-[1px] rounded-full" : "border-transparent" }`}>
          <Link href={`/products/?category=${categories[idx]}`} className={`px-4 py-2 block text-xs ${ categories[idx] === category ? "text-primary font-bold" : "default-textColor" }`}>
          {ele}
          </Link>
        </li>
      ))}
      </ul>
    </div>
    <div ref={mobileCategory} className="absolute top-[60] z-10 w-full bg-neutral-50 dark:bg-neutral-950">
      <div className="h-[40] flex items-center justify-between mx-3 cursor-pointer" onClick={setMobileCategoryClick}>
        <span className="pl-3 text-xs font-bold default-textColor">{ nowCategory }</span>
        <div >
        {mobileCategoryOn?
        <XMarkIcon className="text-black dark:text-white size-6 hover:text-primary transition-colors"/>
        :<Bars3Icon className="text-black dark:text-white size-6 hover:text-primary transition-colors"/>
      }
        </div>
      </div>
      <ul className="mobile-category transition-all" style={{height:"0px",overflow: "hidden" }}>
        <li className={`hover:bg-primaryHover ${ category === null ? "bg-primary" : "" }`}>
          <Link href={`/products`} className={`p-3 block text-xs ml-3 ${ category === null  ? "text-white font-bold" : "default-textColor" }`} onClick={setMobileCategoryClick}>ALL</Link>
        </li>
      {categoryAmpersand.map((ele, idx) => (
        <li key={idx} className={`hover:bg-primaryHover ${ categories[idx] === category ? "bg-primary" : "" }`}>
          <Link href={`/products/?category=${categories[idx]}`} className={`p-3 block text-xs ml-3 ${ categories[idx] === category ? "text-white font-bold" : "default-textColor" }`} onClick={setMobileCategoryClick}>
          {ele}
          </Link>
        </li>
      ))}
      </ul>
    </div>
  </>
  );
}
