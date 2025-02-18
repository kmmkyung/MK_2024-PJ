"use client"

import { motion } from "framer-motion";

const parentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 1 }},
}

const spanVariants = {
  initial: { opacity: 0, y:-30},
  animate: { opacity: 1, y:0, transition: { duration: 1, type: "spring", bounce: 0.8 , ease:"easeOut"}}
};

const pGrayChatVariants = {
  initial: { display:"none", opacity: 0, x: -10},
  animate: { display:"block", opacity: 1, x: 0, transition: { duration: 0.5 }},
};

const pOrangeChatVariants = {
  initial: { display:"none", opacity: 0, x: 10},
  animate: { display:"block", opacity: 1, x: 0,  transition: { duration: 0.5 }},
};


export default function HomeKarrot(){
  return (
    <motion.div className="my-auto *:font-medium flex flex-col items-center gap-2" variants={parentVariants} initial="initial" animate="animate">
      <motion.span className="text-9xl" variants={spanVariants} >🥕</motion.span>
      <div className="flex flex-col items-start gap-1 min-w-[200px]">
        <motion.span className="text-xs bg-slate-300 text-black rounded-md p-2 " variants={pGrayChatVariants} >Hi :)</motion.span>
        <motion.p className="text-xs bg-slate-300 text-black rounded-md p-2" variants={pGrayChatVariants} >👀 Are you Karrot...?</motion.p>
      </div>
      <div className="flex flex-col items-end gap-1 w-full">
        <motion.p className="text-sm bg-primaryHover rounded-md p-2 text-right" variants={pOrangeChatVariants} >YES!! I'm Karrot 🙆‍♀️</motion.p>
        <motion.p className="text-sm bg-primaryHover rounded-md p-2 text-right" variants={pOrangeChatVariants} >🥕</motion.p>
      </div>
      <motion.p className="border-white border-4 rounded-full px-4 py-2 mt-2 bg-neutral-900" variants={spanVariants}>Buy & Sell locally</motion.p>
    </motion.div>
  )
}