import notFound from "@/app/not-found";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { EyeIcon, HandThumbUpIcon as SolidHandThumbUpIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterTextIcon, HandThumbUpIcon as OutlineHandThumbUpIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { cachedPost, cachedLikeStatus, dislikePost, likePost } from "./actions";

export default async function Post({params}:{params:{id:number}}){
  const {id} = await params
  const numberId = Number(id)
  if(isNaN(numberId)) return notFound();

  const post = await cachedPost(numberId);
  if(!post) return notFound();

  const {isLiked, likeCount} = await cachedLikeStatus(numberId);

  return (
    <>
    <nav className="setting-nav">
    <div className="flex w-screen items-center justify-between px-5 h-[60px]">
      <Link className="default-textColor" href="/life">
        <ChevronLeftIcon className="size-6 p-2 box-content"/>
      </Link>
      <ThemeToggleButton/>
    </div>
  </nav>
  <section className="setting-page pt-20">
    <div className="bg-neutral-100 shadow-lg shadow-neutral-200/50 rounded-lg p-5 dark:bg-neutral-800 dark:shadow-neutral-800/50">
      <div className="flex gap-5 items-center">
        <div className="size-10 rounded-full overflow-hidden flex items-center justify-center">
          <Image width={40} height={40} sizes="40px" src={post.user.avatar!} alt={post.user.username}/>
        </div>
        <div>
          <h6 className="text-sm font-semibold">{post.user.username}</h6>
          <span className="text-xs text-neutral-500">{formatToTimeAgo(post.created_at.toString())}</span>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mt-5">{post.title}</h2>
        <p className="text-sm text-neutral-500 mt-2">{post.description}</p>
      </div>
      <div className="flex justify-between mt-5 gap-4 text-neutral-500">
        <p className="flex items-center gap-1 text-xs p-2 rounded-full bg-white dark:bg-black"><EyeIcon className="size-3"/>{post.views}</p>
        <form action={isLiked ? dislikePost.bind(null, numberId) : likePost.bind(null, numberId)}>
          <button className={`box-border p-2 rounded-full border transition-all
          ${isLiked ? "bg-primary text-white border-primary" : "border-neutral-500"}`}>
            <p className="flex items-center gap-1 text-xs">
              {isLiked ? <SolidHandThumbUpIcon className="size-3"/> : <OutlineHandThumbUpIcon className="size-3"/>}
              {likeCount}
            </p>
          </button>
        </form>
      </div>
    </div>
  </section>
  </>
  )
}