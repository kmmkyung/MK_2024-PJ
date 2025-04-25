import Spinner from "@/components/Spinner";

export default function Loading(){

  return (
    <section className="setting-page animate-pulse">
      <div className="absolute z-50">
        <Spinner/> 
        러딩중
      </div>
    </section>
  )
}