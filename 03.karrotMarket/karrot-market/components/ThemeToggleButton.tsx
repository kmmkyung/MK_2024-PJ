'use client'

import { useTheme } from "next-themes"
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggleButton(){
  const { setTheme, resolvedTheme } = useTheme();

  function onClick(){
    setTheme(resolvedTheme === 'dark'? 'light' : 'dark')
  }

  return (
    <button onClick={onClick} className="size-6 p-2 box-content">
      {resolvedTheme === 'dark'? <SunIcon/> : <MoonIcon/>}
    </button>
  )
}