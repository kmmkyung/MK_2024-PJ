"use client"

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function BodyClassSetter() {
  const pathname = usePathname();

  const pathnameBoolean = ['/','/create-account','/login'].includes(pathname);
  const cssOverflowYHidden = "overflow-y-hidden"
  const cssOverflowYScroll = "overflow-y-scroll"
  
  useEffect(() => {
    if (pathnameBoolean) {
      document.body.classList.add(cssOverflowYHidden);
    }
    else {
      document.body.classList.add(cssOverflowYScroll);
    }
    return () => {
      document.body.classList.remove(cssOverflowYHidden,cssOverflowYScroll);
    }
  }, [pathname, pathnameBoolean]);

  return null;
}