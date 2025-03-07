"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

  return (
    <div className="relative w-full">
      <ul className="flex items-center overflow-x-hidden gap-5 text-sm text-center whitespace-nowrap">
          <li className={`border-b-2 ${ category === null ? "border-b-orange-500" : "border-transparent" }`}>
            <Link href={`/products`} className={`${ category === null  ? "text-primary font-bold border-b-orange-500" : "default-textColor" }`}>ALL</Link>
          </li>
        {categoryAmpersand.map((ele, idx) => (
          <li key={idx} className={`border-b-2 ${ categories[idx] === category ? "border-b-orange-500" : "border-transparent" }`}>
            <Link href={`/products/?category=${categories[idx]}`} className={`${ categories[idx] === category ? "text-primary font-bold border-b-orange-500" : "default-textColor" }`}>
            {ele}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
