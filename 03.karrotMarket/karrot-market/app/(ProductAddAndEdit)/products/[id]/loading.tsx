export default function Loading(){
  return (
    <div className="setting-page pt-20 flex flex-col md:gap-5 md:flex-row relative h-screen animate-pulse">
      <div className="md:w-1/2">
        <div className="aspect-square bg-neutral-400 dark:bg-neutral-700 rounded-lg"></div>
        <div className="flex items-center gap-2 my-5">
          <div className="size-10 rounded-full bg-neutral-400 dark:bg-neutral-700"></div>
          <div className="h-5 w-40 rounded-md bg-neutral-400 dark:bg-neutral-700"></div>
        </div>
      </div>
      <div className="md:w-1/2 pt-5 border-neutral-300 dark:border-neutral-700 border-t md:border-none">
        <div className="h-7 md:h-8 w-full rounded-md bg-neutral-400 dark:bg-neutral-700"></div>
        <div className="mt-2 h-4 w-full rounded-md bg-neutral-200 dark:bg-neutral-500"></div>
        <div className="mt-5 h-7 w-full rounded-md bg-neutral-400 dark:bg-neutral-700"></div>
        <div className="mt-5 h-5 w-full rounded-md bg-neutral-300 dark:bg-neutral-600"></div>
        <div className="mt-5 h-5 w-full rounded-md bg-neutral-300 dark:bg-neutral-600"></div>
        <div className="mt-5 h-5 w-full rounded-md bg-neutral-300 dark:bg-neutral-600"></div>
      </div>
    </div>
  )
}