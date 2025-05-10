"use client"

import { InitialChatMessages, saveMessage } from "@/app/(ChatsDetail)/chats/[id]/action"
import { formatToTimeAgo } from "@/lib/utils"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { RealtimeChannel } from "@supabase/supabase-js"
import { supabaseClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

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
  room: {
    users: {
      id: number;
    }[]
    product: { photo: string; userId: number; };
    id: string;
    created_at: Date;
    updated_at: Date;
    productId: number;
  }
}

export default function ChatMessageList({initialMessages, userId, chatRoomId, user, room}:ChatMessageListProps){
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const channel = useRef<RealtimeChannel>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

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
      view: false,
      type: "TEXT",
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
        view: false,
        type: "TEXT",
        user: {
          username: user.username,
          avatar: user.avatar
        }
      }
    })
    await saveMessage(newMessage, chatRoomId, "TEXT")
    setNewMessage("");
    scrollTo(0,document.body.scrollHeight)
  }

  useEffect(()=>{
    scrollTo(0,document.body.scrollHeight)
    channel.current = supabaseClient.channel(`room-${chatRoomId}`)
    channel.current.on("broadcast",{event:"message"},(payload)=>{
      // 상대방이 보낸 메시지 업데이트
      setMessages(prev => [...prev, payload.payload])
    })
    .subscribe();
    return () => {
      channel.current?.unsubscribe();
    }
  },[chatRoomId])

  async function onClick(productId:number){
    const systemMessage = "[SYSTEM] 거래 요청합니다";
    const confirmDeal = confirm("거래 하시겠습니까?");
    if(!confirmDeal) return;
    // const response = await fetch("/api/chatDeal", {
    //   method: "PATCH",
    //   body: JSON.stringify({ productId }),
    //   headers: {"Content-Type": "application/json"}
    // });
    setMessages(prev => [...prev,{
      id: Date.now(),
      payload: newMessage,
      created_at: new Date(),
      userId: userId,
      view: false,
      type: "DEAL",
      user:{
        username:user.username,
        avatar: user.avatar
      }
    }])

    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        payload: systemMessage,
        id: Date.now(),
        created_at: new Date(),
        userId,
        view: false,
        type: "DEAL",
        user: {
          username: user.username,
          avatar: user.avatar
        }
      }
    })
    await saveMessage(systemMessage, chatRoomId, "DEAL")
    scrollTo(0,document.body.scrollHeight)
  }
  

  return (
    <>
      <div ref={messageContainerRef} className="mt-[60px] h-[calc(100vh-130px)]">
        <div className="fixed left-0 h-20 w-full border-b bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700">
          <div className="px-10 py-3 md:max-w-screen-xl mx-auto flex items-center gap-5">
            <Image className="size-14 rounded-lg overflow-hidden object-cover object-center" width={56} height={56} src={room.product.photo} alt="product"/>
            { userId == room.product.userId ?
              <button onClick={()=>onClick(room.productId)} className="text-sm text-white rounded-md p-2 bg-primary hover:bg-primaryHover transition-colors">구매자에게 거래요청 보내기</button>
              : <p className="text-sm">현재 거래중인 물건입니다</p>
            }
          </div>
        </div>
        <div className="px-10 pt-24 pb-[70px] md:max-w-screen-xl mx-auto w-full flex flex-col justify-end">
          {messages.map(ele => 
            <div key={ele.id} className={`w-full flex mb-3 ${ele.userId === userId?"justify-end":"gap-2"}`}>
              {ele.userId === userId? null :
              <Image className="size-8 rounded-full overflow-hidden flex-shrink-0" width={40} height={40} sizes="40px" src={ele.user.avatar!} alt={ele.user.username}/>
              }
              <div className={`flex flex-col gap-1 ${ele.userId === userId? "items-end":""}`}>
              
              {ele.type === "TEXT" && (
                <p className={`p-2 rounded-md text-white text-sm break-all ${ele.userId === userId ? "bg-primary" : "bg-neutral-500"}`}>
                  {ele.payload}
                </p>
              )}

              {ele.type === "DEAL" && (
                <div className="p-2 rounded-md text-sm bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 text-yellow-800 dark:text-yellow-200">
                  📝 <strong>{ele.user.username}</strong> 님이 거래를 요청했습니다.
                  <div className="mt-1 flex gap-2">
                    <button className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">수락</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">거절</button>
                  </div>
                </div>
              )}
              
                <span className="text-xs default-textColor">{formatToTimeAgo(ele.created_at.toString())}</span>
              </div>
            </div>
          )}
        </div>
        <div className="h-[70] fixed w-full bottom-0 left-0 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 border-t">
          <div className="relative md:max-w-screen-xl mx-auto px-10 h-full flex items-center justify-between w-full">
            <form className="flex gap-5 w-full" onSubmit={onSubmit}>
              <input name="message" type="text" placeholder="메시지를 입력해 주세요" min={1} max={200} required value={newMessage} onChange={onChange} className="rounded-full border-0 bg-neutral-100 dark:bg-neutral-800 focus:ring-0 text-sm w-full"/>
              <button type="submit" className="size-9 rounded-full bg-primary hover:bg-primaryHover transition-all flex items-center justify-center flex-shrink-0 disabled:bg-neutral-300 disabled:cursor-not-allowed focus:outline-none"><PaperAirplaneIcon className="size-5 text-white"/></button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}