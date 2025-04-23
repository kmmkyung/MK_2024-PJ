import Link from "next/link";
import HomeKarrot from "@/components/HomeKarrot";
import HomeMatter from "@/components/HomeMatter";

export default function Home() {
  return (
    <section className="relative w-full h-screen p-10">
      <div className="max-w-screen-sm mx-auto h-full flex flex-col justify-end items-center">
        <HomeKarrot/>
        <Link className="primary-link" href='create-account'>시작하기</Link>
        <div className="mt-2">
          <span>이미 계정이 있나요?</span>
          <Link className="ml-2 hover:underline underline-offset-2" href='/login'>로그인</Link>
        </div>
      </div>
      <HomeMatter/>
    </section>
  );
}