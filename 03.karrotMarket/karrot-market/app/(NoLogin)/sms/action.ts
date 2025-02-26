'use server'

import { redirect } from "next/navigation";
import { z } from "zod";
import validator from "validator";
import db from "@/lib/db";
import crypto from "crypto";
import getSession from "@/lib/session";
import Twilio from "twilio";

interface ISmsLogin {
  token: boolean;
}

async function tokenExists(token:number){
  const exists = await db.sMSToken.findUnique({
    where: { token: token },
    select: { id: true }
  })
  if(exists) return true;
  else return false;
}

const phoneSchema = z.string().trim().refine((phone)=>validator.isMobilePhone(phone,['ja-JP','ko-KR']),
{path: ["phoneNumber"], message: "잘못된 번호 형식입니다"}
);
const tokenSchema = z.coerce.number()
.refine((value)=>{return value >= 100000 && value <= 999999}, { path: ["token"], message: "6자리를 입력해주세요" })
.refine(tokenExists, { path: ["token"], message: "this token does not exist" });


async function getToken(){
  const token = crypto.randomInt(100000, 999999);
  const exists = await db.sMSToken.findUnique({
    where:{ token: token },
    select: { id: true }
  })
  if(exists) return getToken()
  else return token;
}

export async function smsLogin(prevState: ISmsLogin, formData:FormData){
  const phoneNumber = formData.get('phoneNumber');
  const token = formData.get('token');

  if(!prevState.token){ // 처음 sms인증 시도
    const result = phoneSchema.safeParse(phoneNumber);
    if(!result.success){
      return { token: false, phoneNumber,
        error:{
          fieldErrors: {
            phoneNumber: result.error.errors.map((err) => err.message),
            token: [],
          },
        }
      } }
    else{
      // delete previous token
      await db.sMSToken.deleteMany({
        where: { user: { phone:result.data}}
      })
      // create token
      const token = await getToken()
      await db.sMSToken.create({
        data: { token: token, user:{
          connectOrCreate:{
            where:{ phone: result.data },
            create:{ username:crypto.randomBytes(10).toString('hex'), phone: result.data }
          }}
        }
      })
      // sean the token using twilio
      const client = Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      await client.messages.create({
        body: `Your Karrot Market verification code is: ${token}`,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: process.env.MY_PHONE_NUMBER!
      })
      return { token: true, phoneNumber }
    }
  }
  else{
    const result = await tokenSchema.safeParseAsync(token);
    if(!result.success){
      return {token: true, phoneNumber,
      error:{
        fieldErrors: {
          phoneNumber: [],
          token: result.error.errors.map((err) => err.message),
        },
      }
      }}
    else{
      const token = await db.sMSToken.findUnique({
        where: { token: result.data },
        select: { id: true, userId:true }
      })
      if(token){
        const session = await getSession()
        session.id = token!.userId
        await session.save()
        await db.sMSToken.delete({
          where: { id: token.id }
        })
        redirect('/profile')
      }
      // get the userId of token
      return { token: true, phoneNumber }

    }
  }
}