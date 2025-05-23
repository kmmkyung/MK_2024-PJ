import ProfileDashboard from "@/components/ProfileDashboard";

export const metadata = {
  title:"Profile"
}

export default async function Profile(){
  return (
    <section className="px-10 py-10">
      <ProfileDashboard/>  
    </section>
  )
}