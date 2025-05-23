import ProductAddForm from "@/components/ProductAddForm";

export const metadata = {
  title:"Product Add"
}

export default function AddProduct(){
  return (
    <>
    <section className="setting-page pt-20">
      <ProductAddForm/>
    </section>
    </>
  )
}