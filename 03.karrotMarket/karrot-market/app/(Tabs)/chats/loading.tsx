export default function Loading(){
  return (
    <section className="setting-page animate-pulse">
      <div className="flex flex-col gap-7 my-5">
      {[...Array(5)].map((_,idx) => {
        return (
          <div key={idx} className="py-2 flex items-center justify-between">
              <div className="flex items-center w-full">
                <div className="flex items-start gap-2 relative">
                  <div className="flex items-center">
                    <div className="size-14 rounded-lg bg-neutral-400 dark:bg-neutral-700"></div>
                    <div className="bg-neutral-400 dark:bg-neutral-700 -ml-3 size-8 rounded-full outline-2 outline outline-white dark:outline-neutral-900"><div/>
                    </div>
                  </div>
                  <div className="absolute left-[88px]">
                    <div className="h-4 w-14 rounded-md bg-neutral-200 dark:bg-neutral-500"></div>
                  </div>
                </div>
                <div className="ml-3 w-[calc(100%-117px)]">
                  <div className="h-5 rounded-md w-full bg-neutral-300 dark:bg-neutral-600"></div>
                </div>
              </div>
            </div>
        )
      })}
      </div>
    </section>
  )
}