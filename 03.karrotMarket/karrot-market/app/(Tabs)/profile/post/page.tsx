import ProfilePost from "@/components/ProfilePost"

export const metadata = {
  title:"Profile"
}

export default function UserPost() {
  return (
    <section className="px-10 pt-10 pb-[70px] h-full w-full md:p-10">
      <ProfilePost/>
    </section>
  )
}