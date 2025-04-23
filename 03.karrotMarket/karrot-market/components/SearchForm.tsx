'use client'

import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForm() {
  const [searchWord, setSearchWord] = useState('')
  const [recentSearchWord, setRecentSearchWord] = useState<string[]>([])

  function onChange(event:React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setSearchWord(value)
  }

  function onClick(ele:string){
    setSearchWord(ele)
    redirect(`/search?keyword=${ele}`);
  }

  function onSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    // 중복단어 체크
    const isDuplicate = recentSearchWord.includes(searchWord);
    if(!isDuplicate){
      const updatedSearchWords = [...recentSearchWord, searchWord];
      setRecentSearchWord(updatedSearchWords)
      localStorage.setItem('searchWord', JSON.stringify(updatedSearchWords))
    }
    setSearchWord('');
    redirect(`/search?keyword=${searchWord}`);
  }

  function recentSearchWordDelete(ele:string) {
    const filterDeleteWord = recentSearchWord.filter((item => item !== ele));
    setRecentSearchWord(filterDeleteWord)
    localStorage.setItem('searchWord', JSON.stringify(filterDeleteWord));
  }

  useEffect(()=>{
    const savedSearchWords = localStorage.getItem('searchWord');
    if(savedSearchWords !== null){
      setRecentSearchWord(JSON.parse(savedSearchWords))
    }
    else {
      setRecentSearchWord([])
    }
  },[])


  return (
    <>
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
      <div className="setting-page">
        <div className="mt-[70]">
          <h6 className="text-sm font-semibold">최근 검색</h6>
          <ol className="flex flex-col-reverse">
            {recentSearchWord?.map((ele,idx)=>{
              return (
                <li key={idx} className="last:mt-5 my-2 flex items-center justify-between">
                  <div onClick={()=>onClick(ele)} className="flex items-center gap-2 w-5/6 py-2">
                    <ClockIcon className="size-4 text-neutral-500 flex-shrink-0"/>
                    <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{ele}</span>
                  </div>
                  <button onClick={()=>recentSearchWordDelete(ele)} className="p-2">
                    <XMarkIcon className="cursor-pointer size-4 text-neutral-500"/>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </>
  )
}