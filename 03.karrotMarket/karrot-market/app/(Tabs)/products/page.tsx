async function getProduct(){
  await new Promise((resolve) => setTimeout(resolve,10000))
}

export default async function Products(){
  const products = await getProduct();
  return (
    <section className="pt-[60px]">
      Products!
    </section>
  )
}