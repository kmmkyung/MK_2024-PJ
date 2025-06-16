import ProfileReview from "@/components/ProfileReview"

export const metadata = {
  title:"Profile"
}

export default function UserReview() {
  return (
    <section className="px-10 py-10 h-full w-full">
      <ProfileReview/>
    </section>
  )
}