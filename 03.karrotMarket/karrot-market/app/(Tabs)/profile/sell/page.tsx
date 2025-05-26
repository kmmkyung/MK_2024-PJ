import ProfileSell from "@/components/ProfileSell"

export const metadata = {
  title:"Profile"
}

export default function sell() {
  return (
    <section className="p-10 h-full w-full">
      <ProfileSell/>
    </section>
  )
}