import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function NavProfile({userId}:{userId?:number}) {
  const href = userId ? `/anotherUser/${userId}` : "/profile";

  return (
    <Link href={href}>
      <HomeIcon className="text-black dark:text-white size-6 hover:text-primary transition-colors"/>
    </Link>
  )
}