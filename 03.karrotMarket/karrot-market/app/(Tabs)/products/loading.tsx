export default function Loading(){

  return (
    <section className="setting-page animate-pulse">
      <div className="flex flex-col gap-5 py-5">
    {[...Array(5)].map((_,idx) => {
      return <div className="flex gap-5" key={idx}>
      <div className="bg-neutral-400 dark:bg-neutral-700 rounded-md size-28"></div>
      <div className="*:rounded-md flex flex-col gap-2">
        <div className="bg-neutral-400 dark:bg-neutral-700 h-4 w-40"></div>
        <div className="bg-neutral-400 dark:bg-neutral-700 h-4 w-20"></div>
        <div className="bg-neutral-400 dark:bg-neutral-700 h-4 w-10 mt-2"></div>
      </div>
    </div>
    })}
    </div>
    </section>
  )
}