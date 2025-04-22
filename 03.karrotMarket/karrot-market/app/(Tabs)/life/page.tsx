import Link from "next/link";
import getPosts from "./action";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterTextIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title:"Life"
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
                <div className="w-3/5 sm:w-3/4 md:w-4/5">
                  <h2 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{ele.title}</h2>
                  <p className="text-sm mt-2 text-neutral-500 overflow-hidden text-ellipsis whitespace-nowrap">{ele.description}</p>
                </div>
                <span className="flex-shrink-0 text-sm text-neutral-500">{formatToTimeAgo(ele.created_at.toString())}</span>
              </div>
              <div className="flex justify-end mt-5 gap-4 text-neutral-500">
                <p className="flex items-center gap-1 text-xs"><EyeIcon className="size-3"/>{ele.views}</p>
                <p className="flex items-center gap-1 text-xs"><ChatBubbleBottomCenterTextIcon className="size-3"/>{ele._count.comment}</p>
                <p className="flex items-center gap-1 text-xs"><HandThumbUpIcon className="size-3"/>{ele._count.like}</p>
              </div>
            </Link>
          </div>
        )
      })}
      </div>
      <Link href="/post/add" className="bg-primary flex items-center justify-center rounded-full size-10 fixed bottom-20 md:bottom-10 right-5 transition-colors hover:bg-primaryHover">
        <PlusIcon className="size-6 text-white" />
      </Link>
    </section>
  )
}