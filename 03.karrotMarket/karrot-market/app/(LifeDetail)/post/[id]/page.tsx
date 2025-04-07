import notFound from "@/app/not-found";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { EyeIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { cachedPost, cachedLikeStatus, getComments } from "./action";
import LikeButton from "@/components/LikeButton";
import PostCommentList from "@/components/PostCommentList";
import PostCommentForm from "@/components/PostCommentForm";

export default async function Post({params}:{params:{id:number}}){
  const {id} = await params
  const numberId = Number(id)
  if(isNaN(numberId)) return notFound();

  const post = await cachedPost(numberId);
  if(!post) return notFound();

  const {isLiked, likeCount} = await cachedLikeStatus(numberId);

  const postComment = await getComments(numberId)

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
  <section className={`setting-page pt-20 ${postComment.length>0?"mb-[80]":""}`}>
    <div className="bg-neutral-100 shadow-lg shadow-neutral-200/50 rounded-lg p-5 dark:bg-neutral-800 dark:shadow-neutral-800/50">
      <div className="flex gap-2 items-center">
          <Image className="rounded-full overflow-hidden" width={40} height={40} sizes="40px" src={post.user.avatar!} alt={post.user.username}/>
        <div>
          <h6 className="text-xs font-semibold">{post.user.username}</h6>
          <span className="text-xs text-neutral-500">{formatToTimeAgo(post.created_at.toString())}</span>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mt-5">{post.title}</h2>
        <p className="text-sm text-neutral-500 mt-2">{post.description}</p>
      </div>
      <div className="flex justify-between mt-5 gap-4 text-neutral-500">
        <p className="flex items-center gap-1 text-xs p-2 rounded-full bg-white dark:bg-black"><EyeIcon className="size-3"/>{post.views}</p>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={numberId}/>
      </div>
      <PostCommentList commentCount={post._count.comment} comment={postComment}/>
    </div>
    <PostCommentForm postId={numberId}/>
  </section>
  </>
  )
}