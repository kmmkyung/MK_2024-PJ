'use client'

import SearchForm from "@/components/SearchForm";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";


export default function Search() {
  const searchParams = useSearchParams();  
  const searchCategory = searchParams?.get("keyword");

  return (
    <section className="relative">
      <SearchForm/>
    </section>
  )
}