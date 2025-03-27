'use client';

import { useLayoutEffect } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function ProductsLayout({ children,  modal }: { children: React.ReactNode; modal: React.ReactNode;}){
  const modalSegment = useSelectedLayoutSegment('modal');

  function blockScroll(){
    document.body.style.overflowY = 'hidden';
    document.body.style.touchAction = 'none';
  };

  function allowScroll(){
    document.body.style.overflowY = 'scroll';
    document.body.style.touchAction = '';
  };
  
  useLayoutEffect(() => {
    if (modalSegment !== null) {
      blockScroll();
    }
    else {
      allowScroll();
    }
    return () => {
      allowScroll();
    };
  }, [modalSegment]);

  return (
    <>
      {modal}
      {children}
    </>
  );
}
