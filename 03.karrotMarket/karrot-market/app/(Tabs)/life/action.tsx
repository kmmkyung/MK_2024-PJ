import db from "@/lib/db"

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
      { id: "desc" },
    ],
  })
  return posts
  }   