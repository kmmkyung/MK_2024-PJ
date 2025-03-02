export default function Loading(){

  return (
    <div className="p-5 animate-pulse flex flex-col gap-5 pt-[60px]">
    {[...Array(10)].map((_,idx) => {
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
  )
}