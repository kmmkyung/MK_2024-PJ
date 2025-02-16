import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import GithubIcon from "./Icon/github-logo";

export default function SocialLogin(){
  return (
    <>
      <div className="w-full h-px bg-neutral-500"></div>
      <div className="flex flex-col gap-3">
        <Link className="primary-link flex items-center justify-center gap-2" href='/github/start'>
          <GithubIcon />
          <span>Continue with Github</span>
        </Link>
        <Link className="primary-link flex items-center justify-center gap-2" href='/sms'>
          <span><ChatBubbleOvalLeftEllipsisIcon className="size-6"/></span>
          <span>Continue with SNS</span>
        </Link>
      </div>
    </>
  )
}