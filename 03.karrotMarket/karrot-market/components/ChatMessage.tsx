"use client"

import { InitialChatMessages, saveMessage } from "@/app/(ChatsDetail)/chats/[id]/action"
import { formatToTimeAgo } from "@/lib/utils"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { RealtimeChannel } from "@supabase/supabase-js"
import { supabaseClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import AnotherUsername from "./AnotherUsername"

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
      username: string;
    }[]
    product: { photo: string; userId: number; dealt: boolean };
    id: string;
    created_at: Date;
    updated_at: Date;
    productId: number;
    review: { id: number; payload: string; userId: number }[]
  }
}

export default function ChatMessageList({initialMessages, userId, chatRoomId, user, room}:ChatMessageListProps){
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isDealt, setIsDealt] = useState(room.product.dealt);
  const channel = useRef<RealtimeChannel>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const myReview = Boolean(room.review.find((ele) => ele.userId === user.id));

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
        id: user.id,
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
          id: user.id,
          username: user.username,
          avatar: user.avatar
        }
      }
    })
    await saveMessage(newMessage, chatRoomId, "TEXT")
    setNewMessage("");
    scrollTo(0,document.body.scrollHeight)
  }

  async function dealRequest(){
    const systemMessage = "거래 요청합니다";
    const confirmDeal = confirm("거래 하시겠습니까?");
    if(!confirmDeal) return;
    setMessages(prev => [...prev,{
      id: Date.now(),
      payload: newMessage,
      created_at: new Date(),
      userId: userId,
      view: false,
      type: "DEAL",
      user:{
        id: user.id,
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
          id: user.id,
          username: user.username,
          avatar: user.avatar
        }
      }
    })
    await saveMessage(systemMessage, chatRoomId, "DEAL")
    scrollTo(0,document.body.scrollHeight)
  }
  
  async function onClickDeal(productId:number){
    const confirmDeal = confirm("거래 하시겠습니까?");
    if(!confirmDeal) return;
    await fetch("/api/chatDeal", {
      method: "PATCH",
      body: JSON.stringify({ productId }),
      headers: {"Content-Type": "application/json"}
    });
    setIsDealt(true);
    channel.current?.send({
      type: "broadcast",
      event: "deal-complete",
    });
  }

  function onClickReview(){
    if(isDealt&&myReview){
      router.push("/profile")
    }
    else{
      router.push(`/chats/${room.id}/review`)
    }
  }

  useEffect(()=>{
    scrollTo(0,document.body.scrollHeight)
    channel.current = supabaseClient.channel(`room-${chatRoomId}`)

    channel.current.on("broadcast",{event:"message"},(payload)=>{
      // 상대방이 보낸 메시지 업데이트
      setMessages(prev => [...prev, payload.payload])
    })

    channel.current.on("broadcast",{event:"deal-complete"},()=>{
      setIsDealt(true);
    })

    channel.current.subscribe();

    return () => {
      channel.current?.unsubscribe();
    }
  },[chatRoomId])

  return (
    <>
      <div ref={messageContainerRef} className="mt-[60px] h-[calc(100vh-130px)]">
        <div className="fixed left-0 h-20 w-full border-b bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700">
          <div className="px-10 py-3 md:max-w-screen-xl mx-auto flex items-center gap-5">
            <Image className="size-14 rounded-lg overflow-hidden object-cover object-center"  width={56} height={56} src={room.product.photo} alt="product" />
            { userId == room.product.userId ?
              <button disabled={isDealt} onClick={dealRequest} className="text-sm text-white rounded-md p-2 bg-primary hover:bg-primaryHover transition-colors disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed">구매자에게 거래요청 보내기</button>
              : (isDealt? <p className="text-sm">거래 완료된 물건입니다</p>:<p className="text-sm">현재 거래중인 물건입니다</p>)
            }
          </div>
        </div>
        <div className="px-10 pt-24 pb-[70px] md:max-w-screen-xl mx-auto w-full flex flex-col justify-end">
          {messages.map(ele => 
            <div key={ele.id} className={`w-full flex mb-3 ${ele.userId === userId?"justify-end":"gap-2"}`}>
              {ele.userId === userId? null :
              <AnotherUsername userInfo={ele.user} page="chat"/>
              }
              <div className={`flex flex-col gap-1 ${ele.userId === userId? "items-end":""}`}>
              
              {ele.type === "TEXT" && (
                <p className={`p-2 rounded-md text-white text-sm break-all ${ele.userId === userId ? "bg-primary" : "bg-neutral-500"}`}>
                  {ele.payload}
                </p>
              )}

              {ele.type === "DEAL" && (
                <div className="p-2 rounded-md text-sm text-black bg-lime-500 ">
                  <strong>{ele.user.username}</strong>님이 거래를 요청했습니다.<br/>
                  <p className="text-xs mt-1">&quot;거래하기&quot;를 누르면 거래가 완료됩니다!</p>
                  <button onClick={()=>onClickDeal(room.productId)} className="mt-4 w-full h-10 bg-white rounded text-xs disabled:text-neutral-300 disabled:cursor-not-allowed" disabled={ele.userId === userId ? true : false || isDealt}>
                    {isDealt? "거래 완료된 물건입니다" : "거래하기"}
                  </button>
                </div>
              )}
                <span className="text-xs default-textColor">{formatToTimeAgo(ele.created_at.toString())}</span>
              </div>
            </div>
          )}
          {isDealt && (
            <div className="w-full flex justify-center my-4">
              <div className="rounded-md py-2 px-4 text-sm bg-yellow-200 text-black">
              { myReview ? "작성하신 리뷰가 있습니다. 마이페이지에서 확인해 주세요!" : "거래가 완료되었습니다. 리뷰를 작성해 주세요!"}
                <button
                  className="block mx-auto my-0 mt-2 md:inline md:mt-0 md:ml-3 px-4 h-10 text-xs bg-primary text-white rounded hover:bg-primaryHover transition-colors disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
                  onClick={onClickReview}>
                  {myReview? "작성한 리뷰 확인하기" : "리뷰 작성하기"}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="h-[70px] fixed w-full bottom-0 left-0 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 border-t">
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