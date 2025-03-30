import Link from "next/link";
import getPosts from "./actions";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterTextIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title:"동네생활"
}

export default async function Life(){
  const posts = await getPosts()
  
  return (
    <section className="setting-page">
      <div className="my-5">
      {posts.map((ele)=>{
        return (
          <Link href={`/post/${ele.id}`} key={ele.id} className="pb-5 mb-5 border-b border-neutral-500 default-textColor flex flex-col last:pb-0 last:border-b-0">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{ele.title}</h2>
                <p className="text-sm mt-2 text-neutral-500">{ele.description}</p>
              </div>
              <span className="text-sm text-neutral-500">{formatToTimeAgo(ele.created_at.toString())}</span>
            </div>
            <div className="flex justify-end mt-5 gap-5 text-neutral-500">
              <p className="flex items-center gap-2"><EyeIcon className="size-4"/>{ele.views}</p>
              <p className="flex items-center gap-2"><ChatBubbleBottomCenterTextIcon className="size-4"/>{ele._count.comment}</p>
              <p className="flex items-center gap-2"><HandThumbUpIcon className="size-4"/>{ele._count.like}</p>
            </div>
          </Link>
        )
      })}
      </div>
    </section>
  )
}