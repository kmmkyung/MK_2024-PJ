'use server';

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요').toLowerCase(),
  password: z.string({
    required_error: "비밀번호를 입력해 주세요"
  }).min(PASSWORD_MIN_LENGTH,'4자 이상 입력해주세요').max(PASSWORD_MAX_LENGTH,'20자 이하 입력해주세요').regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR)
})

export async function login(prevState:any, formData:FormData){
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }
  const result = formSchema.safeParse(data)
  if(!result.success){
    return { errors: result.error.flatten(), data }
  }
  else{
    redirect('/')
  }
}
