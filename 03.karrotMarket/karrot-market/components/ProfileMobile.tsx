import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { IUserProfile } from "@/app/(Tabs)/profile/page";

export default function ProfileMobile({user}:{user:IUserProfile}){
  return (
    <section className="setting-page">
      Mobile
    </section>
  )
}