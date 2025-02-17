"use server"
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, USERNAME_REGEX } from "@/lib/constants";
import { z } from "zod";


function passwordCheck({password, confirmPassword}:{password:string,confirmPassword:string}){
  return password === confirmPassword
}
const formSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username은 문자이어야 합니다.',
    required_error: 'Username을 입력해주세요'
  }).min(2, '2자 이상 입력해주세요').max(10, '10자 이하 입력해주세요').trim().regex(USERNAME_REGEX, '특수문자를 제외하고 입력해주세요'),
  email: z.string().email('유효한 이메일을 입력해주세요').toLowerCase(),
  password: z.string({required_error: "비밀번호를 입력해 주세요"}).min(PASSWORD_MIN_LENGTH,'4자 이상 입력해주세요').max(PASSWORD_MAX_LENGTH,'20자 이하 입력해주세요').regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR),
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
  const result = formSchema.safeParse(data)
  if(!result.success){
    return { errors: result.error.flatten(), data }
  }
  else {
    console.log(result.data);
  }
}