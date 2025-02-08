import { useEffect, useRef } from "react";

export function useScrollBgOpacity(){
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    if (!ref) return;
    function scrollBgChange(){
      const scrollNow = window.scrollY; // 현재 스크롤
      const documentHeight = document.documentElement.scrollHeight; // 전체 페이지 높이
      const clientHeight = window.innerHeight; // 화면 높이
      const maxScroll = documentHeight - clientHeight; // 최대 스크롤
      
      // 스크롤 위치
      const scrollPercentage = (Math.min( (maxScroll-scrollNow) / maxScroll, 1)).toFixed(3);
      const opacityPercentage = scrollPercentage;
      if (ref.current) {
        ref.current.style.opacity = opacityPercentage;
      }
    }
    window.addEventListener('scroll', scrollBgChange);
    return ()=>{
      window.removeEventListener('scroll', scrollBgChange);
    }
  },[]);
  return ref;
}