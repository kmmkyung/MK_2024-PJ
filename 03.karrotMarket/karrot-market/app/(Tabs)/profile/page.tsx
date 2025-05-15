import { getUser } from "@/lib/getUser";
import { headers } from "next/headers";
import ProfileMobile from "@/components/ProfileMobile";
import ProfileDesktop from "@/components/ProfileDesktop";

export interface IUserProfile {
  id: number;
  username: string;
  email: string | null;
  password: string | null;
  phone: string | null;
  github_id: string | null;
  google_id: string | null;
  kakao_id: string | null;
  avatar: string | null;
  updated_at: Date;
}

export default async function Profile(){
  const header = await headers();
  const userAgent = header.get('user-agent')||'';
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  const user = await getUser();

  return isMobile ? <ProfileMobile user={user}/> : <ProfileDesktop user={user}/> 
    
    // <section className="pt-[60px] pb-[70px] md:bg-neutral-100">
    //   <div className="my-5 md:flex md:px-10 gap-5">
    //     <div className="w-full">
    //       <div className="setting-profileBox md:py-2 md:rounded-md">
    //         <h1 className="font-bold text-xl md:border-b md:border-neutral-100 pb-2">
    //           <span className="text-primary">반가워요!</span> {user?.username}님
    //         </h1>
    //         <Link href={"/profile/edit"}>
    //           <div className="flex items-center py-5">
    //             <div className="flex items-center gap-3">
    //               <Image className="size-10 rounded-full overflow-hidden" width={40} height={40} src={user.avatar!} alt={user.username}/>
    //               <h3 className="text-base font-semibold default-textColor">{user.username}</h3>
    //             </div>
    //             <ChevronRightIcon className="w-5 h-5 text-neutral-500 ml-auto"/>
    //           </div>
    //         </Link>
    //       </div>
    //       <div className="h-2 bg-neutral-100 dark:bg-black" />
    //       <div className="setting-profileBox">
    //       </div>
    //       <div className="setting-profileBox md:py-2 md:rounded-md">
    //         <form action={logOut}>
    //           <button>Logout</button>
    //         </form>
    //       </div>
    //     </div>
    //     <div className="hidden md:block bg-white w-full h-full">
    //       fda
    //     </div>
    //   </div>
    // </section>
}