import EditForm from "@/components/EditForm";
import { getEditProduct } from "./actions";
import notFound from "@/app/not-found";

export default async function Edit({params}: {params:{id:string}}){
  const {id} = await params;
  const editProduct = await getEditProduct(Number(id))
  if (!editProduct) {
    notFound();
  }

  return (
    <EditForm id={Number(id)} editProduct={editProduct!}/>
  )
}