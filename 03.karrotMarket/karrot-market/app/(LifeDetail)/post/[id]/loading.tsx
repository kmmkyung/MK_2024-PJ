import NavLinkPageGo from "@/components/NavLinkPageGo";

export default function Loading(){
  return (
    <>
    <NavLinkPageGo/>
    <section className="setting-page animate-pulse">
      {/* <div className="bg-neutral-100 shadow-lg shadow-neutral-200/50 rounded-lg p-5 dark:bg-neutral-800 dark:shadow-neutral-800/50 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="rounded-full size-10"/>
            <div>
              <div className="h-4 w-5"/>
              <div className="h-4 w-3"/>
            </div>
          </div>
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
      </div> */}
    </section>
    </>
  )
}