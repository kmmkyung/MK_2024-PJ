'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForm({ searchKeyword }:{ searchKeyword:string }) {
  const router = useRouter()
  const [searchWord, setSearchWord] = useState('')

  function onChange(event:React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setSearchWord(value)
    if(value == ''){
      router.push("/search");
    }
  }

  function onSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();    
    const searchKeyword = searchWord.trim();
    if(!searchKeyword) return;

    // 중복단어 체크
    const savedSearchWords = localStorage.getItem('searchWords');
    if(savedSearchWords !== null){
      const parsed:string[] = JSON.parse(savedSearchWords);
      const filtered = parsed.filter(item => item !== searchKeyword);
      const updatedSearchWords = [searchKeyword, ...filtered].slice(0, 10);
      localStorage.setItem('searchWords', JSON.stringify(updatedSearchWords));
    }
    router.push(`/search?keyword=${searchWord}`);
  }

  useEffect(()=>{
    setSearchWord(searchKeyword)
  },[searchKeyword])

  return (
    <div className="absolute top-[60] z-10 w-full h-[50]">
      <div className="md:max-w-screen-xl mx-auto h-full">
        <form className="flex gap-5 items-center px-5 h-full" onSubmit={onSubmit}>
          <input name="searchWord" value={searchWord} onChange={onChange} type="text" placeholder="검색어를 입력해 주세요" min={1} max={200} required className="rounded-full bg-neutral-50 dark:bg-neutral-950 border-0 focus:ring-0 text-sm w-full"/>
          <button type="submit" className="size-9 flex items-center justify-center flex-shrink-0 disabled:bg-neutral-300 disabled:cursor-not-allowed focus:outline-none">
            <MagnifyingGlassIcon className="size-5 text-primary"/>
          </button>
        </form>
      </div>
    </div>
  )
}