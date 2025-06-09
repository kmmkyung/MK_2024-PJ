import ProfileDashboard from "@/components/ProfileDashboard";

export const metadata = {
  title:"Profile"
}

export default async function Profile(){
  return (
    <section className="p-10">
      <ProfileDashboard/>  
    </section>
  )
}