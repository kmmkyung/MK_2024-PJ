import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { IUserProfile } from "@/app/(Tabs)/profile/page";

interface Props {
  user: IUserProfile;
  children: React.ReactNode;
}

export default function ProfileMobile({user, children}:Props){
  return (
    <section className="setting-page">
      Mobile
    </section>
  )
}