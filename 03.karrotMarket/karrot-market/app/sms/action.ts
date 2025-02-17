'use server'

import { redirect } from "next/navigation";
import { z } from "zod";
import validator from "validator";

interface ISmsLogin {
  token: boolean;
}

const phoneSchema = z.string().trim().refine((phone)=>validator.isMobilePhone(phone,['ja-JP','ko-KR']));
const tokenSchema = z.coerce.number().min(100000).max(999999)

export async function smsLogin(prevState: ISmsLogin, formData:FormData){
  const phoneNumber = formData.get('phoneNumber');
  const token = formData.get('token');
  if(!prevState.token){
    const result = phoneSchema.safeParse(phoneNumber);
    console.log(phoneNumber);
    if(!result.success){ return { token: false, phoneNumber } }
    else{ return { token: true, phoneNumber } }
  }
}