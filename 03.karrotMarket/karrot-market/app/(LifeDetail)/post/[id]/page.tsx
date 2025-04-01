import notFound from "@/app/not-found";
import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";

async function getPost(id:number) {
  try{
    const post = await db.post.update({
      where: { id: id },
      data:{ views: {increment: 1} },
      include : {
        user: { select: {username:true, avatar:true} },
        _count: { select: {comment:true, like:true} }
      },
    })
    return post;
  }
  catch(error){
    console.error(error)
    return null;
  }
}

export default async function Post({params}:{params:{id:number}}){
  const {id} = await params
  const numberId = Number(id)
  if(isNaN(numberId)) return notFound();

  const post = await getPost(numberId);
  if(!post) return notFound();

  return (
  <section className="setting-page">
    <div className="shadow-md rounded-lg">
      <div className="flex gap-5 items-center">
        <div className="size-10 rounded-full overflow-hidden flex items-center justify-center">
          <Image width={40} height={40} sizes="40px" src={post.user.avatar!} alt={post.user.username}/>
        </div>
        <div>
          <h6 className="text-sm font-semibold">{post.user.username}</h6>
          <span className="text-xs text-neutral-500">{formatToTimeAgo(post.created_at.toString())}</span>
        </div>
      </div>
    </div>
  </section>
  )
}