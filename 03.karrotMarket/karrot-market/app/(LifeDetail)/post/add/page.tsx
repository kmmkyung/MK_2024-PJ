import PostAddForm from "@/components/PostAddForm"

export const metadata = {
  title:"Post Add"
}

export default function PostAdd(){
  return (
    <section className="setting-page pt-20 h-screen">
      <PostAddForm/>
    </section>
  )
}