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
          <div className="bg-neutral-100 shadow-lg shadow-neutral-200/50 rounded-lg p-5 mb-5 dark:bg-neutral-800 dark:shadow-neutral-800/50" key={ele.id}>
          <Link href={`/post/${ele.id}`} className="default-textColor flex flex-col">
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
          </div>
        )
      })}
      </div>
    </section>
  )
}