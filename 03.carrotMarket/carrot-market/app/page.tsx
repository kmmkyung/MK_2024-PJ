import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-6">
      <div className="my-auto *:font-medium flex flex-col items-center gap-2">
        <span className="text-9xl">🥕</span>
        <h2>당근 마켓에 어서오세요!</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full mb-5">
        <Link className="w-full bg-primary text-white text-lg font-medium py-2.5 rounded-md text-center hover:bg-primaryHover transition-colors" href='create-account'>시작하기</Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link className="hover:underline underline-offset-2" href='/login'>로그인</Link>
        </div>
      </div>
    </main>
  );
}