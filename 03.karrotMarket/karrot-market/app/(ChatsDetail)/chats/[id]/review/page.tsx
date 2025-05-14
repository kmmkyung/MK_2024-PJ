import { useActionState } from "react";
import {saveReview} from "./action";
import { useParams } from "next/navigation";

export default function Review() {
  const { id } = useParams()


  return (
    <section className="setting-page pt-20 h-screen">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <p className="text-center text-6xl animate-bounce">🥕</p>
        <h2 className="text-center text-xl font-bold">거래 완료</h2>
        <p className="text-center text-sm text-neutral-500 mt-4">🥳 거래가 완료되었습니다.</p>
        <p className="text-center text-sm mt-4">
          상대방에 대한 거래 후기를 작성해주세요!<br/>
          후기는 다른 거래 상대방에게 도움이 됩니다.<br/>
          <span className="text-xs mt-2 text-neutral-500 block">📝 작성한 후기는 마이페이지에서 확인할 수 있습니다.</span>
        </p>
        
      </div>
    </section>
  )
}