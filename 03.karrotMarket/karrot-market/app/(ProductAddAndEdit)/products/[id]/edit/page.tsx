import ProductEditForm from "@/components/ProductEditForm";
import { getEditProduct } from "./action";
import notFound from "@/app/not-found";

export const metadata = {
  title:"Product Edit"
}
export default async function Edit({params}: {params:{id:string}}){
  const {id} = await params;
  const editProduct = await getEditProduct(Number(id))
  if (!editProduct) {
    notFound();
  }

  return (
    <ProductEditForm id={Number(id)} editProduct={editProduct!}/>
  )
}