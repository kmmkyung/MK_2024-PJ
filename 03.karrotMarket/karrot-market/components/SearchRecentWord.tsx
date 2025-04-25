"use client"

import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function SearchRecentWord(){
  const router = useRouter()

  const [recent, setRecent] = useState([])

  function onClick(ele:string){
    const filtered = recent.filter(item => item !== ele);
    const updatedSearchWords = [ele, ...filtered].slice(0, 10);
    localStorage.setItem('searchWords', JSON.stringify(updatedSearchWords));
    router.push(`/search?keyword=${ele}`);
  }

  function recentWordDelete(ele:string) {
    const filterDeleteWord = recent.filter((item => item !== ele));
    setRecent(filterDeleteWord)
    localStorage.setItem('searchWords', JSON.stringify(filterDeleteWord));
  }

  useEffect(()=>{
    const savedSearchWords = localStorage.getItem('searchWords');    
    const parsed = savedSearchWords ? JSON.parse(savedSearchWords) : null;    
    setRecent(parsed)
  },[])

  return (
    <div className="setting-page">
      <div className="mt-[70]">
        <h6 className="text-sm font-semibold">최근 검색</h6>
        {recent.length > 0 ? 
          <ol>
          {recent.map((ele,idx)=>{
            return (
              <li key={idx} className="first:mt-5 my-2 flex items-center justify-between">
                <div onClick={()=>onClick(ele)} className="flex items-center gap-2 w-5/6 py-2">
                  <ClockIcon className="size-4 text-neutral-500 flex-shrink-0"/>
                  <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{ele}</span>
                </div>
                <button onClick={()=>recentWordDelete(ele)} className="p-2">
                  <XMarkIcon className="cursor-pointer size-4 text-neutral-500"/>
                </button>
              </li>
            )
          })}
        </ol>
        :<p className="mt-5 text-sm text-neutral-500">최근 검색어가 없습니다.</p>
        }
      </div>
    </div>
  )
}