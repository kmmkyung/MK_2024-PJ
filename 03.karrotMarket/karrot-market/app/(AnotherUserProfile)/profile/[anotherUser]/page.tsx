export default async function AnotherUser({params}:{ params: {anotherUser: number}}) {
  const { anotherUser } = await params;
  return (
    <section className="setting-page">
      <h1>welcome {anotherUser}</h1>
    </section>
  )
}