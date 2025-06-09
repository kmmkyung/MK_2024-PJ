import ProfileReview from "@/components/ProfileReview"

export const metadata = {
  title:"Profile"
}

export default function UserReview() {
  return (
    <section className="px-10 pt-10 pb-[70px] h-full w-full md:p-10">
      <ProfileReview/>
    </section>
  )
}