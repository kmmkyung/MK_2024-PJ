// import { getAccessToken, getUserProfile } from "@/lib/auth/google";
import db from "@/lib/db";
import { cookies } from "next/headers";
// import userLogin from "@/lib/userLogin";
// import { loginWithSupabaseOAuth } from "@/lib/userSupabaseLogin";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import userLogin from "@/lib/userLogin";
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest){
//   const code = request.nextUrl.searchParams.get('code');
//   if(!code) return new Response(null,{status: 400});

//   // get token
//   const {error, access_token} = await getAccessToken(code)
//   if(error) return redirect('/google/error');

//   // get user profile
//   const { sub, name, picture, email, email_verified } = await getUserProfile(access_token);
//   const user = await db.user.findUnique({
//     where: { google_id: sub },
//     select: { id : true, uid: true }
//   })
  
//   const userName = await db.user.findUnique({
//     where: { username: name },
//     select: { id : true }
//   })
  
//   const userEmail = await db.user.findUnique({
//     where: { email: email },
//     select: { id : true }
//   })

// // db에 user가 있으면 로그인
//   if(user && user.uid) {
//     return await userLogin(user.id, user.uid);
//   }
//   // db에 user가 없으면 새로등록하고 로그인
//   const newUser = await db.user.create({
//     data: {
//       google_id: sub,
//       username: userName? 'GOOGLE_'+name : name,
//       avatar: picture,
//       email: !Boolean(userEmail) && email_verified ? email : null
//     },
//     select: { id: true, uid: true }
//   })
//   await loginWithSupabaseOAuth("google");
//   return await userLogin(newUser.id, newUser.uid);
// }

export async function GET(){
  const supabase = createServerComponentClient({ cookies });

  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session?.user) return redirect("/google/error");

  const { id: uid, email, user_metadata } = session.user;
  let user = await db.user.findUnique({ where: { uid }, select: { id: true, uid: true } });
  
  if (!user||!user?.uid) {
    user = await db.user.create({
      data: {
        uid,
        email,
        username: user? 'GOOGLE_'+user_metadata.full_name : user_metadata.full_name,
        avatar: user_metadata.avatar_url,
      }
    });
  }
  else {
    return await userLogin(user.id, user.uid);
  }
}
