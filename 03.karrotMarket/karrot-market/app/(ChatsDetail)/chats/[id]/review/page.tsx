import ReviewForm from "@/components/ReviewForm";
import { getRoom } from "../action";

export default async function Review({params}: { params: { id: string } }) {
  const { id } = await params;

  const room = await getRoom(id);

  return (
    <section className="setting-page pt-20 h-screen">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <p className="text-center text-6xl animate-bounce">🥕</p>
        <h2 className="text-center text-xl font-bold">거래 완료</h2>
        <p className="text-center text-sm text-neutral-500 mt-4">🥳 거래가 완료되었습니다.</p>
        <p className="text-center text-sm mt-4">
          상대방에 대한 거래 리뷰를 작성해주세요!<br/>
          리뷰는 다른 거래 상대방에게 도움이 됩니다.<br/>
          <span className="text-xs mt-2 text-neutral-500 block">📝 작성한 리뷰는 마이페이지에서 확인할 수 있습니다.</span>
        </p>
        <ReviewForm room={room!}/>
      </div>
    </section>
  )
}
