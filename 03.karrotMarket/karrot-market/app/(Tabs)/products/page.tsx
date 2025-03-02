import ListProduct from "@/components/ListProduct";
import db from "@/lib/db"

async function getProduct(){
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,  
      photo: true,
      id: true,
      category: true
    }
  })
  return products;
}

export default async function Products(){
  const products = await getProduct();
  
  return (
    <section className="setting-page">
      <div className="py-5 flex flex-col gap-5">
        {products.map((product) => <ListProduct key={product.id} {...product}/>)}
      </div>
    </section>
  )
}