'use client'

import {
  ShoppingCartIcon as SolidShoppingCartIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon,
  MagnifyingGlassIcon as SolidMagnifyingGlassIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  ShoppingCartIcon as OutlineShoppingCartIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatBubbleOvalLeftEllipsisIcon,
  MagnifyingGlassIcon as OutlineMagnifyingGlassIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ComponentProps{
  className: string;
}

export default function TabBar({className}:ComponentProps){
  const pathName = usePathname()
  const pathNameSplit = pathName.split('/')[1];

  return (
    <div className={`h-[70] setting-nav bottom-0 grid grid-cols-5 border-neutral-300 dark:border-neutral-700 border-t px-5 py-3 ${className}`}>
      <Link className="flex flex-col items-center justify-center gap-px" href="/products">
        {pathNameSplit === 'products'? <SolidShoppingCartIcon className="size-6"/> :
        <OutlineShoppingCartIcon className="size-6 default-textColor"/>}
        <span className={`text-xs ${pathNameSplit === 'products'? 'text-primary':'default-textColor'}`}>쇼핑</span>
      </Link>
      <Link className="flex flex-col items-center justify-center gap-px" href="/search">
        {pathNameSplit === 'search'? <SolidMagnifyingGlassIcon className="size-6"/> :
        <OutlineMagnifyingGlassIcon className="size-6 default-textColor"/>}
        <span className={`text-xs ${pathNameSplit === 'search'? 'text-primary':'default-textColor'}`}>검색하기</span>
      </Link>
      <Link className="flex flex-col items-center justify-center gap-px" href="/life">
        {pathNameSplit === 'life'? <SolidNewspaperIcon className="size-6"/> :
        <OutlineNewspaperIcon className="size-6 default-textColor"/>}
      <span className={`text-xs ${pathNameSplit === 'life'? 'text-primary':'default-textColor'}`}>동네생활</span>
      </Link>
      <Link className="flex flex-col items-center justify-center gap-px" href="/chats">
        {pathNameSplit === 'chats'? <SolidChatBubbleOvalLeftEllipsisIcon className="size-6"/> :
        <OutlineChatBubbleOvalLeftEllipsisIcon className="size-6 default-textColor"/>}
      <span className={`text-xs ${pathNameSplit === 'chats'? 'text-primary':'default-textColor'}`}>채팅</span>
      </Link>
      <Link className="flex flex-col items-center justify-center gap-px" href="/profile">
        {pathNameSplit === 'profile'? <SolidUserIcon className="size-6"/> :
        <OutlineUserIcon className="size-6 default-textColor"/>}
      <span className={`text-xs ${pathNameSplit === 'profile'? 'text-primary':'default-textColor'}`}>마이</span>
      </Link>
    </div>
  )
}