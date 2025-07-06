import db from "@/lib/db"
import { unstable_cache as nextCache } from "next/cache";

export default async function getPosts(){
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      user: true,
      _count: {
        select: {
          comment: true,
          like: true
        }
      }
    },
    orderBy: [
      { created_at: "desc" },
    ],
  })
  return posts
  };

  export const cachedGetPost = nextCache(
    getPosts, ["posts"],{
      tags: ["posts"]
    })
  