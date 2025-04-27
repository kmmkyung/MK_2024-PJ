import Spinner from "@/components/Spinner";

export default function Loading(){

  return (
    <section className="setting-page h-screen">
      <div className="flex justify-center items-center h-full">
        <Spinner/> 
      </div>
    </section>
  )
}