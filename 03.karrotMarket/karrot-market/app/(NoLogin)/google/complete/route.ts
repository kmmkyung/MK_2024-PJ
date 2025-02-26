import { getAccessToken, getUserProfile } from "@/lib/auth/google";
import db from "@/lib/db";
import userLogin from "@/lib/userLogin";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
  const code = request.nextUrl.searchParams.get('code');
  if(!code) return new Response(null,{status: 400});

  // get token
  const {error, access_token} = await getAccessToken(code)
  if(error) return redirect('/google/error');

  // get user profile
  const { sub, name, picture, email, email_verified } = await getUserProfile(access_token);
  const user = await db.user.findUnique({
    where: { google_id: sub },
    select: { id : true }
  })
  
  const userName = await db.user.findUnique({
    where: { username: name },
    select: { id : true }
  })
  
  const userEmail = await db.user.findUnique({
    where: { email: email },
    select: { id : true }
  })

// db에 user가 있으면 로그인
  if(user) {
    await userLogin(user.id);
  }
  // db에 user가 없으면 새로등록하고 로그인
  const newUser = await db.user.create({
    data: {
      google_id: sub,
      username: userName? 'GOOGLE_'+name : name,
      avatar: picture,
      email: !Boolean(userEmail) && email_verified ? email : null
    },
    select: { id: true }
  })
  await userLogin(newUser.id)
}