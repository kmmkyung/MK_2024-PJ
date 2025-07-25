// import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import GithubIcon from "./Icon/github-logo";
import GoogleIcon from "./Icon/google-logo";
import KakaoIcon from "./Icon/kakao-logo";

export default function SocialLogin(){
  return (
    <>
      <div className="w-full h-px bg-neutral-500"></div>
      <div className="flex flex-col gap-3 *:text-sm">
        <a className="custom-link bg-slate-700 text-white hover:bg-slate-600 flex items-center justify-center gap-2" href='/github/start'>
          <GithubIcon />
          <span>Continue with Github</span>
        </a>
        <a className="custom-link text-black ring-2 ring-neutral-200 hover:bg-neutral-200 hover:ring-0 dark:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center gap-2" href='/google/start'>
          <GoogleIcon />
          <span>Continue with Google</span>
        </a>
        <Link className="bg-[#F7E317] text-black hover:bg-[#faee73] custom-link flex items-center justify-center gap-2" href='/kakao/start'>
          <KakaoIcon />
          <span>Continue with Kakao</span>
        </Link>
        {/* <Link className="primary-link flex items-center justify-center gap-2" href='/sms'>
          <span><ChatBubbleOvalLeftEllipsisIcon className="size-6"/></span>
          <span>Continue with SMS</span>
        </Link> */}
      </div>
    </>
  )
}