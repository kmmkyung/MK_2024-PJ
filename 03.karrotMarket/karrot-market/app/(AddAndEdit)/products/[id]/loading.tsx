export default function Loading(){
  return (
    <div className="setting-page flex flex-col gap-5 md:flex-row relative h-screen animate-pulse">
      <div className="md:w-1/2">
        <div className="aspect-square bg-neutral-400 dark:bg-neutral-700 rounded-lg"></div>
        <div className="flex items-center gap-2 my-5">
          <div className="size-10 rounded-full bg-neutral-400 dark:bg-neutral-700"></div>
          <div className="h-4 w-40 rounded-md bg-neutral-400 dark:bg-neutral-700"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:w-1/2">
        <div className="h-4 w-full rounded-md bg-neutral-400 dark:bg-neutral-700"></div>
        <div className="h-4 w-full rounded-md bg-neutral-300 dark:bg-neutral-600"></div>
        <div className="h-4 w-full rounded-md bg-neutral-200 dark:bg-neutral-500"></div>
      </div>
    </div>
  )
}