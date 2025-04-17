"use client"

import { InitialChatMessages } from "@/app/(ChatsDetail)/chats/[id]/action"
import { formatToTimeAgo } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface ChatMessageListProps {
  initialMessages: InitialChatMessages;
  userId: number
}

export default function ChatMessageList({initialMessages, userId}:ChatMessageListProps){
  const [messages, setMessages] = useState(initialMessages)
console.log(messages);

  return (
    <div className="setting-page flex flex-col justify-end gap-5 min-h-screen">
      {messages.map(ele => 
        <div key={ele.id} className={`flex items-start gap-3 ${ele.userId === userId?"justify-end":""}`}>
          {ele.userId === userId? null :
          <Image className="size-8 rounded-full overflow-hidden" width={40} height={40} sizes="40px" src={ele.user.avatar!} alt={ele.user.username}/>
          }
          <div className={`flex flex-col gap-2 ${ele.userId === userId? "items-end":""}`}>
            <p className={`p-2 rounded-md text-white text-sm ${ele.userId === userId ? "bg-neutral-500": "bg-primary"}`}>{ele.payload}</p>
            <span className="text-xs default-textColor">{formatToTimeAgo(ele.created_at.toString())}</span>
          </div>
        </div>
      )}
    </div>
  )
}