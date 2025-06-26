import notFound from "@/app/not-found";
import { getMessages, getRoom } from "./action";
import ChatMessageList from "@/components/ChatMessage";
import getSession from "@/lib/session";
import { getUser } from "@/lib/getUser";


export async function generateMetadata({params}:{ params: Promise<{id:string}>}){
  const {id} = await params
  const user = await getUser();
  const room = await getRoom(id);
  const anotherUser = room?.users.find((users) => users.id !== user.id);
  return {
    title: `${anotherUser?.username}님과의 채팅방`,
  }
}

export default async function ChatDetailRoom({params}:{params:Promise<{id:string}>}){
  const {id} = await params;
  const room = await getRoom(id)
  
  if(!room) return notFound();

  const user = await getUser();
  if(!user) return notFound();
  
  const initialMessages = await getMessages(id,user.id);
  const session = await getSession();

  return (
    <>
      <section>
        <ChatMessageList userId={session.id!} user={user} chatRoomId={id} room={room} initialMessages={initialMessages}/>
      </section>
    </>
  )
}