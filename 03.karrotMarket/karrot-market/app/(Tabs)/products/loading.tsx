export default function Loading(){

  return (
    <section className="setting-page animate-pulse">
      <div className="absolute left-0 top-[60] w-full h-[50] bg-neutral-50 dark:bg-neutral-950"/>
      <div className="flex flex-col gap-5 mt-[70]">
      {[...Array(5)].map((_,idx) => {
        return <div className="flex gap-5" key={idx}>
        <div className="bg-neutral-400 dark:bg-neutral-700 rounded-md size-28"></div>
        <div className="flex flex-col justify-between">
          <div className="*:rounded-md">
            <div className="bg-neutral-400 dark:bg-neutral-700 h-6 w-40"></div>
            <div className="bg-neutral-200 dark:bg-neutral-500 h-4 w-20 mt-1"></div>
            <div className="bg-neutral-300 dark:bg-neutral-600 h-5 w-10 mt-2"></div>
          </div>
          <div className="rounded-md bg-neutral-200 dark:bg-neutral-500 h-4 w-10"></div>
        </div>
      </div>
      })}
      </div>
    </section>
  )
}