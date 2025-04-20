"use client"

import { InitialChatMessages, saveMessage } from "@/app/(ChatsDetail)/chats/[id]/action"
import { formatToTimeAgo } from "@/lib/utils"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import NavProductsGo from "./NavLinkPageGo"
import { createClient, RealtimeChannel } from "@supabase/supabase-js"
import { SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY } from "@/lib/constants"

interface ChatMessageListProps {
  initialMessages: InitialChatMessages;
  userId: number
  chatRoomId: string
  user: {
    id: number;
    updated_at: Date;
    username: string;
    email: string | null;
    password: string | null;
    phone: string | null;
    github_id: string | null;
    google_id: string | null;
    kakao_id: string | null;
    avatar: string | null;
  }
}

export default function ChatMessageList({initialMessages, userId, chatRoomId, user}:ChatMessageListProps){
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const channel = useRef<RealtimeChannel>(null);

  function onChange(event:React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setNewMessage(value)
  }

  async function onSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    // 내가 보낸 메시지 업데이트
    setMessages(prev => [...prev,{
      id: Date.now(),
      payload: newMessage,
      created_at: new Date(),
      userId: userId,
      user:{
        username:user.username,
        avatar: user.avatar
      }
    }])
    // 내가 보낸 메시지 공유
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: newMessage,
        created_at: new Date(),
        userId,
        user: {
          username: user.username,
          avatar: user.avatar
        }
      }
    })
    await saveMessage(newMessage, chatRoomId)
    setNewMessage("")
  }

  useEffect(()=>{
    const client = createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`)
    channel.current.on("broadcast",{event:"message"},(payload)=>{
      // 상대방이 보낸 메시지 업데이트
      setMessages(prev => [...prev, payload.payload])
    })
    .subscribe();
    return () => {
      channel.current?.unsubscribe();
    }
  },[chatRoomId])

  return (
    <>
    <NavProductsGo/>
    <div className="flex flex-col justify-end gap-5 min-h-screen">
      <div className="px-10 md:max-w-screen-xl mx-auto flex flex-col gap-5 w-full">
        {messages.map(ele => 
          <div key={ele.id} className={`flex items-start gap-3 ${ele.userId === userId?"justify-end":""}`}>
            {ele.userId === userId? null :
            <Image className="size-8 rounded-full overflow-hidden" width={40} height={40} sizes="40px" src={ele.user.avatar!} alt={ele.user.username}/>
          }
            <div className={`flex flex-col gap-2 ${ele.userId === userId? "items-end":""}`}>
              <p className={`p-2 rounded-md text-white text-sm ${ele.userId === userId ? "bg-primary": "bg-neutral-500"}`}>{ele.payload}</p>
              <span className="text-xs default-textColor">{formatToTimeAgo(ele.created_at.toString())}</span>
            </div>
          </div>
        )}
      </div>
      <div className="box-border h-[80] border-t border-neutral-300 dark:border-neutral-700 w-full px-10 py-5 bg-white dark:bg-neutral-900">
      <form className="flex gap-5 md:max-w-screen-xl mx-auto" onSubmit={onSubmit}>
        <input name="message" type="text" placeholder="메시지를 입력해 주세요" min={1} max={200} required value={newMessage} onChange={onChange} className="rounded-full border-0 bg-neutral-100 dark:bg-neutral-800 focus:ring-0 text-sm w-full"/>
        <button type="submit" className="size-9 rounded-full bg-primary hover:bg-primaryHover transition-all flex items-center justify-center flex-shrink-0 disabled:bg-neutral-300 disabled:cursor-not-allowed focus:outline-none"><PaperAirplaneIcon className="size-5 text-white"/></button>
        </form>
      </div>
    </div>
    </>
  )
}