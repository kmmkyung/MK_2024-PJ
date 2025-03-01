'use client'

import {
  ShoppingCartIcon as SolidShoppingCartIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  ShoppingCartIcon as OutlineShoppingCartIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatBubbleOvalLeftEllipsisIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ComponentProps{
  className: string;
}

export default function TabBar({className}:ComponentProps){
  const pathName = usePathname();

  return (
    <div className={`w-full fixed bottom-0 grid grid-cols-5 border-neutral-600 border-t px-5 py-3 ${className}`}>
      <Link className="flex flex-col items-center justify-center gap-px" href="/products">
        {pathName === '/products'? <SolidShoppingCartIcon className="size-7"/> :
        <OutlineShoppingCartIcon className="size-7 default-textColor"/>}
        <span className={`text-xs ${pathName === '/products'? 'text-primary':'default-textColor'}`}>쇼핑</span>
      </Link>
      <Link className="flex flex-col items-center justify-center gap-px" href="/life">
        {pathName === '/life'? <SolidNewspaperIcon className="size-7"/> :
        <OutlineNewspaperIcon className="size-7 default-textColor"/>}
      <span className={`text-xs ${pathName === '/life'? 'text-primary':'default-textColor'}`}>동네생활</span>
      </Link>
      <Link className="flex flex-col items-center justify-center gap-px" href="/chats">
        {pathName === '/chats'? <SolidChatBubbleOvalLeftEllipsisIcon className="size-7"/> :
        <OutlineChatBubbleOvalLeftEllipsisIcon className="size-7 default-textColor"/>}
      <span className={`text-xs ${pathName === '/chats'? 'text-primary':'default-textColor'}`}>채팅</span>
      </Link>
      <Link className="flex flex-col items-center justify-center gap-px" href="/live">
        {pathName === '/live'? <SolidVideoCameraIcon className="size-7"/> :
        <OutlineVideoCameraIcon className="size-7 default-textColor"/>}
      <span className={`text-xs ${pathName === '/live'? 'text-primary':'default-textColor'}`}>라이브 쇼핑</span>
      </Link>
      <Link className="flex flex-col items-center justify-center gap-px" href="/profile">
        {pathName === '/profile'? <SolidUserIcon className="size-7"/> :
        <OutlineUserIcon className="size-7 default-textColor"/>}
      <span className={`text-xs ${pathName === '/profile'? 'text-primary':'default-textColor'}`}>마이</span>
      </Link>
    </div>
  )
}