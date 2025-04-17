import notFound from "@/app/not-found";
import { getMessages, getRoom } from "./action";
import ChatMessageList from "@/components/ChatMessage";
import getSession from "@/lib/session";


export default async function ChatDetailRoom({params}:{params:{id:string}}){
  const {id} = await params;
  const room = await getRoom(id)
  if(!room) return notFound();

  const initialMessages = await getMessages(id);
  const session = await getSession();
  
  return (
    <section>
      <ChatMessageList userId={session.id!} initialMessages={initialMessages}/>
    </section>
  )
}