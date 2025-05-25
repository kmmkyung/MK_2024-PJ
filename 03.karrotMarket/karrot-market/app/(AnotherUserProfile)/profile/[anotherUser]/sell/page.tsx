import NavProfile from "@/components/NavProfile";

export default async function sell({params}:{ params: {anotherUser: number}}) {
  const { anotherUser } = await params;
  const anotherUserId = Number(anotherUser);

  return (
    <section className="setting-page">
      <NavProfile userId={anotherUserId}/>
    </section>
  )
}