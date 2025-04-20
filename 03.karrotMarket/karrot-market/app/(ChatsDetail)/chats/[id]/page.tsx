import notFound from "@/app/not-found";
import { getMessages, getRoom } from "./action";
import ChatMessageList from "@/components/ChatMessage";
import getSession from "@/lib/session";
import { getUser } from "@/lib/getUser";


export default async function ChatDetailRoom({params}:{params:{id:string}}){
  const {id} = await params;
  const room = await getRoom(id)
  if(!room) return notFound();

  const initialMessages = await getMessages(id);
  const session = await getSession();
  const user = await getUser();
  if(!user) return notFound();

  
  return (
    <section>
      <ChatMessageList userId={session.id!} user={user} chatRoomId={id} initialMessages={initialMessages}/>
    </section>
  )
}