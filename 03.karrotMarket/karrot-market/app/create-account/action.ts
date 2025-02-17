"use server"
import { z } from "zod";

const usernameRegexp = new RegExp(/^[a-zA-Z0-9가-힣]+$/)
const passwordRegexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*()\-]).+$/)

function passwordCheck({password, confirmPassword}:{password:string,confirmPassword:string}){
  return password === confirmPassword
}
const formSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username은 문자이어야 합니다.',
    required_error: 'Username을 입력해주세요'
  }).min(2, '2자 이상 입력해주세요').max(10, '10자 이하 입력해주세요').trim().regex(usernameRegexp, '특수문자를 제외하고 입력해주세요'),
  email: z.string().email('유효한 이메일을 입력해주세요').toLowerCase(),
  password: z.string().min(4,'4자 이상 입력해주세요').max(20,'20자 이하 입력해주세요').regex(passwordRegexp, 'Must have lowercase, UPPERCASE, a number, special charters'),
  confirmPassword: z.string().min(4,'4자 이상 입력해주세요').max(20,'20자 이하 입력해주세요')
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
  const result = formSchema.safeParse(data)
  if(!result.success){
    return result.error.flatten()
  }
  else {
    console.log(result.data);
  }
}