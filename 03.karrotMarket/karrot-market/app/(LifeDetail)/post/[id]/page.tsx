import notFound from "@/app/not-found";
import { EyeIcon } from "@heroicons/react/24/solid";
import { cachedPost, cachedLikeStatus, cachedGetComments, getPostView } from "./action";
import PostLikeButton from "@/components/PostLikeButton";
import PostCommentList from "@/components/PostCommentList";
import { getUser } from "@/lib/getUser";
import PostDelete from "@/components/PostDelete";
import AnotherUsername from "@/components/AnotherUsername";
import Image from "next/image";
import { formatToTimeAgo } from "@/lib/utils";

export async function generateMetadata({params}:{ params: Promise<{id:string}>}){
  const {id} = await params
  const post = await getPostView(Number(id));
  return {
    title: post?.title
  }
}

export default async function Post({params}:{params:Promise<{id:number}>}){
  // await new Promise((r) => setTimeout(r, 100000));
  const { id } = await params
  const numberId = Number(id)
  if(isNaN(numberId)) return notFound();

  const post = await cachedPost(numberId);
  if(!post) return notFound();

  const {isLiked, likeCount} = await cachedLikeStatus(numberId);

  const postComments = await cachedGetComments(numberId);

  const user = await getUser();
  
  return (
    <>
      <section className="setting-page pt-20">
        <div className="bg-neutral-100 shadow-lg shadow-neutral-200/50 rounded-lg p-5 dark:bg-neutral-800 dark:shadow-neutral-800/50 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              { user.id === post.user.id ?
              <div className="flex items-center gap-2">
              <Image className="size-10 rounded-full overflow-hidden " width={40} height={40} src={post.user.avatar!} alt={post.user.username}/>
              <div>
                <h3 className="text-sm default-textColor">{post.user.username}</h3>
                <span className="text-xs text-neutral-500">{formatToTimeAgo(post.created_at.toString())}</span>
              </div>
            </div>
            :
              <AnotherUsername userInfo={post.user} page="post" post={post.created_at}/>
              }
            </div>
            { user.id === post.user.id ? <PostDelete postId={numberId}/> : null }
          </div>
          <div>
            <h2 className="text-lg font-semibold mt-5 break-words">{post.title}</h2>
            <p className="text-sm text-neutral-500 mt-2 break-words">{post.description}</p>
          </div>
          <div className="flex justify-between mt-5 gap-4 text-neutral-500">
            <p className="flex items-center gap-1 text-xs p-2 rounded-full bg-white dark:bg-black">
              <EyeIcon className="size-3"/>{post.views}
            </p>
            <PostLikeButton isLiked={isLiked} likeCount={likeCount} postId={numberId}/>
          </div>
          <PostCommentList user={user} postId={numberId} commentCount={post._count.comment} commentData={postComments}/>
        </div>
      </section>
    </>
  )
}