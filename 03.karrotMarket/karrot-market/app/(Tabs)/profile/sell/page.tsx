import ProfileSell from "@/components/ProfileSell"

export const metadata = {
  title:"Profile"
}

export default function UserSell() {
  return (
    <section className="px-10 pt-10 pb-[70px] h-full w-full md:p-10">
      <ProfileSell/>
    </section>
  )
}