import ProfileReview from "@/components/ProfileReview"

export const metadata = {
  title:"Profile"
}

export default function UserReview() {
  return (
    <section className="p-10 h-full w-full">
      <ProfileReview/>
    </section>
  )
}