import ProductEditForm from "@/components/ProductEditForm";
import { getEditProduct } from "./action";
import notFound from "@/app/not-found";

export async function generateMetadata({params}:{ params: Promise<{id:string}>}){
  const {id} = await params
  const product = await getEditProduct(Number(id));
  return {
    title: product?.title
  }
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