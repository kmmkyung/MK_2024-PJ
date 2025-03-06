'use server';

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt"
import userLogin from "@/lib/userLogin";

async function checkEmail(email:string){
  const user = await db.user.findUnique({
    where: { email: email },
    select: {id: true}
  })
  return Boolean(user)  // 있으면 true 없으면 false
}

const formSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요').toLowerCase().refine(checkEmail,'사용하는 email을 확인해주세요'),
  password: z.string({
    required_error: "비밀번호를 입력해 주세요"
  }).min(PASSWORD_MIN_LENGTH,'4자 이상 입력해주세요').max(PASSWORD_MAX_LENGTH,'20자 이하 입력해주세요')
  .regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR)
})

export async function login(prevState:any, formData:FormData){
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }
  const result = await formSchema.safeParseAsync(data)
  if(!result.success){
    return { errors: result.error.flatten(), data }
  }
  else{
    // email를 쓰는 user 찾기 -> checkEmail function
    // 비밀번호 맞는지 체크
    const user = await db.user.findUnique({
      where: { email: result.data.email },
      select: { password: true, id: true }
    })
    const passwordOK = await bcrypt.compare(result.data.password, user!.password ?? '') // 사용자가 입력한 값, 데이터베이스 해쉬값
    if(passwordOK){
      await userLogin(user!.id)
    }
    else {
      return { fieldErrors:{password: ['올바른 비밀번호가 아닙니다'], email:[]}, data }
    }
  }
}


