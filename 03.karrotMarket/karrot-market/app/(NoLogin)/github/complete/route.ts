import {getAccessToken, getUserEmail, getUserProfile} from "@/lib/auth/github";
import db from "@/lib/db";
import userLogin from "@/lib/userLogin";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
  const code = request.nextUrl.searchParams.get('code');
  if(!code) return new Response(null,{status: 400});

  // get token
  const {error, access_token} = await getAccessToken(code)
  if(error) return redirect('/github/error');

  // get user profile / get user email
  const { id, avatar_url, login } = await getUserProfile(access_token);
  const { email } = await getUserEmail(access_token);
  
  const user = await db.user.findUnique({
    where: { github_id: id + '' },
    select: { id : true }
  })
  
  const userName = await db.user.findUnique({
    where: { username: login },
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
      github_id: id + '',
      username: userName? 'Github_'+login : login,
      avatar: avatar_url,
      email: Boolean(userEmail)? null : email
    },
    select: { id: true }
  })
  await userLogin(newUser.id)

}
