'use client'

import { deleteProduct } from "@/lib/productActions";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";

export default function ProductOwnerButton({numberId, productDealt}:{numberId:number, productDealt:boolean}){
  const router = useRouter();
  const pathname = usePathname();

  async function onDelete(){    
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;
    await deleteProduct(numberId)
    router.push('/products')
    if(pathname !== '/products'){
      window.location.href = '/products'
    }
  }

  return (
    <>
      <div className="md:block hidden w-full">
        <div className="flex justify-center items-center gap-2">
          <button className="custom-link bg-lime-500 hover:bg-lime-400 flex justify-center items-center px-4 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed" disabled={productDealt} onClick={()=>router.push(`/products/${numberId}/edit`)}>
            <PencilSquareIcon className="size-5 text-white"/>
            <span className="text-white">수정</span>
          </button>
          <form action={onDelete} className="w-full">
            <button className="custom-link bg-red-600 hover:bg-red-500 px-5 flex justify-center items-center gap-2">
              <TrashIcon className="size-5 text-white"/>
              <span className="text-white">삭제</span>
            </button>
          </form>
        </div>
      </div>
      <div className="md:hidden block">
        <div className="flex justify-center items-center gap-2">
          <button className="custom-link bg-lime-500 hover:bg-lime-400 flex justify-center items-center px-4 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed" disabled={productDealt} onClick={()=>router.push(`/products/${numberId}/edit`)}>
            <PencilSquareIcon className="size-5 text-white"/>
          </button>
          <form action={onDelete} className="w-full">
            <button className="custom-link bg-red-600 hover:bg-red-500 px-5 flex justify-center items-center gap-2">
              <TrashIcon className="size-5 text-white"/>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}