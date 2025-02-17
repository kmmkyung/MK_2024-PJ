import Link from "next/link";
import HomeKarrot from "@/components/HomeKarrot";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-10">
      <HomeKarrot/>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link className="primary-link" href='create-account'>시작하기</Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link className="hover:underline underline-offset-2" href='/login'>로그인</Link>
        </div>
      </div>
    </main>
  );
}