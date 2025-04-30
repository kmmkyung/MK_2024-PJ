import Spinner from "@/components/Spinner";

export default function Loading(){

  return (
    <section className="h-[calc(100vh-70px)]">
      <div className="flex justify-center items-center h-full">
        <Spinner/> 
      </div>
    </section>
  )
}