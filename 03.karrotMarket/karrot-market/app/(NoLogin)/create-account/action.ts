"use server"

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, USERNAME_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";
import getSession from "@/lib/session";


function passwordCheck({password, confirmPassword}:{password:string,confirmPassword:string}){
  return password === confirmPassword
}

async function checkUserName(username:string){
 // userName 고유한지 db에서 확인
  const user = await db.user.findUnique({
  where: { username: username },
  select: {id: true}
  })
  if(user){
    return false
  }else return true
  // return Boolean(user); // 있으면 false 없으면 true
}

async function checkUserEmail(userEmail:string){
 // email 고유한지 db에서 확인
  const email = await db.user.findUnique({
  where: { email: userEmail },
  select: {id: true}
  })
  // if(email){
  //   return false
  // }else return true
  return !Boolean(email); // 있으면 false 없으면 true
}


const formSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username은 문자이어야 합니다.',
    required_error: 'Username을 입력해주세요'
  }).min(2, '2자 이상 입력해주세요').max(10, '10자 이하 입력해주세요').trim().regex(USERNAME_REGEX, '특수문자를 제외하고 입력해주세요').refine(checkUserName, '사용하고 있는 닉네임입니다')
  ,
  email: z.string().email('유효한 이메일을 입력해주세요').toLowerCase().refine(checkUserEmail,'사용하고 있는 이메일 입니다')
  ,
  password: z.string({required_error: "비밀번호를 입력해 주세요"}).min(PASSWORD_MIN_LENGTH,'4자 이상 입력해주세요').max(PASSWORD_MAX_LENGTH,'20자 이하 입력해주세요')
  .regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR)
  ,
  confirmPassword: z.string({required_error: "비밀번호를 입력해 주세요"}).min(PASSWORD_MIN_LENGTH,'4자 이상 입력해주세요').max(PASSWORD_MAX_LENGTH,'20자 이하 입력해주세요')
}).refine(passwordCheck, {
  path: ['confirmPassword'],
  message:'비밀번호를 동일하게 입력해주세요'
});

export async function createAccount(prevState:any, formData:FormData){
  const data = {
    username:formData.get('username'),
    email:formData.get('email'),
    password:formData.get('password'),
    confirmPassword:formData.get('confirmPassword')
  };
  const result = await formSchema.safeParseAsync(data)
  if(!result.success){
    return { errors: result.error.flatten(), data }
  }
  else {
    // user, email 고유한지 찾기 checkUserName, checkUserEmail function
    // 비밀번호 hash
    const hashedPassword = await bcrypt.hash(result.data.password, 12) // 데이터, 알고리즘을 얼마나 돌릴것인가 횟수
    
    // name, emil, password 모든 검사 통과 > db에 저장하고 id받아옴
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      },
      select: { id: true }
    })

    // 로그인(쿠키받기)
    const session = await getSession()
    session.id = user.id
    await session.save()
    redirect('/profile')
  }
}