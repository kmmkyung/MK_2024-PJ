export default function Loading(){
  return (
    <section className="setting-page animate-pulse">
      <div className="flex flex-col py-5">
    {[...Array(2)].map((_,idx) => {
      return <div className="flex gap-5 w-full bg-neutral-100 shadow-neutral-200/50 dark:bg-neutral-800 dark:shadow-neutral-800/50 p-5 mb-5 rounded-lg" key={idx}>
      <div className="*:rounded-md flex flex-col w-full">
        <div className="flex justify-between">
          <div className="*:rounded-md">
            <div className="bg-neutral-400 dark:bg-neutral-700 h-7 w-20"></div>
            <div className="bg-neutral-400 dark:bg-neutral-700 h-5 w-40 mt-2"></div>
          </div>
          <div className="rounded-md bg-neutral-400 dark:bg-neutral-700 h-4 w-10"></div>
        </div>
        <div className="flex justify-end mt-5 gap-5 *:rounded-md">
          <div className="bg-neutral-400 dark:bg-neutral-700 h-4 w-10"></div>
          <div className="bg-neutral-400 dark:bg-neutral-700 h-4 w-10"></div>
          <div className="bg-neutral-400 dark:bg-neutral-700 h-4 w-10"></div>
        </div>
      </div>
    </div>
    })}
    </div>
    </section>  
  )
}