import ModalCloseButton from "@/components/ModalCloseButton";
export default async function Modal({params}:{params:{id:string}}){

  return (
  <div className="fixed w-full h-full left-0 top-0 z-[51] bg-opacity-80 bg-black flex justify-center items-center">
    <ModalCloseButton/>
    <div className="max-w-screen-sm w-full flex justify-center h-1/2">
      <div className="aspect-square flex flex-col items-center justify-center bg-neutral-200 rounded-2xl cursor-pointer bg-center bg-cover">
      </div>
    </div>
  </div>
  )
}