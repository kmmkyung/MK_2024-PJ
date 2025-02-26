import { getAccessToken, getUserProfile } from "@/lib/auth/kakao";
import db from "@/lib/db";
import userLogin from "@/lib/userLogin";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
  const code = request.nextUrl.searchParams.get('code');
  console.log(code,'code');
  if(!code) return new Response(null,{status: 400});

  // get token
  const {error, access_token} = await getAccessToken(code)
  if(error) return redirect('/kakao/error');

  // get user profile
  const { id, kakao_account } = await getUserProfile(access_token);
  // kakao_account - is_email_verified / is_email_valid /email
  // kakao_account - profile - nickname / thumbnail_image_url

  const user = await db.user.findUnique({
    where: { kakao_id: id +'' },
    select: { id : true }
  })
  
  const userName = await db.user.findUnique({
    where: { username: kakao_account.profile.nickname },
    select: { id : true }
  })
  
  const userEmail = await db.user.findUnique({
    where: { email: kakao_account.email },
    select: { id : true }
  })
  
  console.log(!Boolean(userEmail)&&kakao_account.profile.is_email_valid&&kakao_account.profile.is_email_verified);
  // db에 user가 있으면 로그인
  if(user) {
    await userLogin(user.id);
  }
  // db에 user가 없으면 새로등록하고 로그인
  const newUser = await db.user.create({
    data: {
      kakao_id: id + '',
      username: userName? 'KAKAO_'+kakao_account.profile.nickname : kakao_account.profile.nickname,
      avatar: kakao_account.profile.thumbnail_image_url,
      email: !Boolean(userEmail)&&kakao_account.is_email_valid&&kakao_account.is_email_verified ? kakao_account.email : null
    },
    select: { id: true }
  })
  await userLogin(newUser.id)

}