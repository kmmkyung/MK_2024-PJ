import ModalCloseBg from "@/components/ModalCloseBg";

export default function Loading(){
  return (
    <>
    <div className="fixed top-0 left-0 z-[51] w-full h-full px-20 py-20 flex justify-center items-center md:px-10">
      <ModalCloseBg/>
      <div className="relative rounded-lg overflow-hidden max-w-[1000px] w-full h-full no-scrollbar overflow-y-scroll md:overflow-y-visible flex md:flex-row flex-col">
        <div className="w-full h-full aspect-square md:aspect-auto basis-1/2 bg-neutral-400 dark:bg-neutral-700"></div>
        <div className="basis-1/2">
        <div className="bg-white dark:bg-neutral-900 h-[calc(100vh-160px)] w-full md:h-full p-5">
          <div className="flex items-center gap-2 pb-5 border-neutral-300 dark:border-neutral-700 border-b animate-pulse">
            <div className="size-8 rounded-full overflow-hidden bg-neutral-400 dark:bg-neutral-700"></div>
            <div className="h-5 w-40 rounded-md bg-neutral-400 dark:bg-neutral-700"></div>
          </div>
          <div className="h-7 md:h-8 w-full rounded-md bg-neutral-400 dark:bg-neutral-700 mt-5 animate-pulse"></div>
          <div className="h-4 w-full rounded-md bg-neutral-300 dark:bg-neutral-600 mt-2 animate-pulse"></div>
          <div className="h-6 md:h-7 w-full rounded-md bg-neutral-300 dark:bg-neutral-600 mt-5 animate-pulse"></div>
          <div className="mt-5 h-[calc(100%-177px-80px-20px)] w-full rounded-md bg-neutral-300 dark:bg-neutral-600 animate-pulse">
            <div className="h-5 pb-2"/>
          </div>
          <div className="mt-10 h-10 w-full rounded-md bg-neutral-400 dark:bg-neutral-700 animate-pulse"></div>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}