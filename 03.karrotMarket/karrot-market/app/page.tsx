import Link from "next/link";
import HomeKarrot from "@/components/HomeKarrot";
import HomeMatter from "@/components/HomeMatter";

export default function Home() {
  return (
    <section className="relative w-screen h-screen p-10">
      <div className="max-w-screen-sm mx-auto h-full flex flex-col items-center">
        <HomeKarrot/>
        <div className="flex flex-col items-center gap-3 w-full">
          <Link className="primary-link" href='create-account'>시작하기</Link>
          <div className="flex gap-2">
            <span>이미 계정이 있나요?</span>
            <Link className="hover:underline underline-offset-2" href='/login'>로그인</Link>
          </div>
        </div>
      </div>
      <HomeMatter/>
    </section>
  );
}