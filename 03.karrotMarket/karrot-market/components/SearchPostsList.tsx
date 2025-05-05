"use client"

import Link from "next/link";
import { useState } from "react";

interface IProducts {
  posts: {
    id: number;
    title: string;
    description: string;
    views: number;
    created_at: Date;
    updated_at: Date;
    userId: number;
  }[];
}

export default function SearchPostsList({ posts }: IProducts) {
  const [showAll, setShowAll] = useState(false);
  const visiblePosts = showAll ? posts : posts.slice(0, 5);

  if(posts.length == 0 ){
    return <p className="w-full h-full leading-[10] text-center text-sm">찾는 동네생활 글이 없습니다</p>
  }

  return (
    <div className="my-5">
      <ol>
      {visiblePosts.map((post) => (
        <li key={post.id} className="first:pt-0 py-5 first:border-none border-t border-neutral-300 dark:border-neutral-700">
          <Link className="block" href={`/post/${post.id}`}
            onClick={() => {
              sessionStorage.setItem('cameFromSearch', 'true');
            }}
          >
            <div className="flex flex-col w-full">
              <h6 className="text-base md:text-lg default-textColor overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</h6>
              <p className="text-xs md:text-sm text-neutral-500 mt-1">{post.views} views • {new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          </Link>
        </li>
      ))}
      </ol>
      { !showAll && posts.length > 5 && (
        <button onClick={() => setShowAll(true)} className="primary-btn text-sm">동네생활 더보기</button>
      )}
    </div>
  )}