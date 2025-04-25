import { forwardRef } from "react"

function SpinnerCode(_, ref: React.Ref<HTMLDivElement>){
  return (
    <div
      ref={ref}
      className="mx-auto size-[50] rounded-full gradient animate-spin bg-orange-500"
      style={{
        background: `conic-gradient(from 0deg, transparent 35%, #f97316 70%)`,
        maskImage: `radial-gradient(transparent 55%, #fff 56%)`}}
    />
  )
}

const Spinner = forwardRef(SpinnerCode);
export default Spinner;