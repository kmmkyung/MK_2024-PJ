export default function Loading(){
  return (
    <>
    <section className="setting-page pt-20 animate-pulse">
      <div className="bg-neutral-100 shadow-lg shadow-neutral-200/50 rounded-lg p-5 dark:bg-neutral-800 dark:shadow-neutral-800/50 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="rounded-full size-10 bg-neutral-400 dark:bg-neutral-700"/>
            <div className="*:rounded-md h-10 flex flex-col justify-between">
              <div className="h-4 w-10 bg-neutral-400 dark:bg-neutral-700"/>
              <div className="h-3 w-full bg-neutral-400 dark:bg-neutral-700"/>
            </div>
          </div>
        </div>
        <div className="*:rounded-md">
          <div className="h-7 mt-5 w-20 bg-neutral-400 dark:bg-neutral-700"/>
          <div className="h-5 mt-2 w-40 bg-neutral-400 dark:bg-neutral-700"/>
        </div>
        <div className="flex justify-between mt-5 gap-4 text-neutral-500">
          <div className="w-10 h-[34] p-2 rounded-full bg-white dark:bg-black">
          </div>
          <div className="w-10 h-[34] p-2 rounded-full bg-white dark:bg-black">
          </div>
        </div>
        <div className="mt-10 pt-10 border-t border-neutral-300 dark:border-neutral-700">
          <div className="h-5 w-10 bg-neutral-400 dark:bg-neutral-700 rounded-md"/>
          <div className="min-h-20 flex items-center justify-center">
            <div className="h-4 w-full bg-neutral-400 dark:bg-neutral-700 rounded-md"/>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}