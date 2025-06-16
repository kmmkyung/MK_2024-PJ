import ProfilePost from "@/components/ProfilePost"

export const metadata = {
  title:"Profile"
}

export default function UserPost() {
  return (
    <section className="px-10 py-10 h-full w-full">
      <ProfilePost/>
    </section>
  )
}