'use client'

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { useEffect, useState } from "react";

export default function ThemeProvider({children}:{children:React.ReactNode}){
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) { return null }

  return <NextThemeProvider attribute='class'>{children}</NextThemeProvider>
}