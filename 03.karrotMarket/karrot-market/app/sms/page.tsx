"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useActionState, useState } from "react";
import { smsLogin } from "./action";

const initialState = {
  token: false,
  error: undefined
}

export default function SmsLogin(){

  const [state, formData] = useActionState(smsLogin, initialState);
  const [countryCode, setCountryCode] = useState("+82");

  function selectChange(event:React.ChangeEvent<HTMLSelectElement>){
    setCountryCode(event.target.value)
  }

  return (
  <section className="flex flex-col gap-10 p-10 max-w-screen-sm mx-auto">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="text-2xl">SMS로 로그인하세요!</h2>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <Link href='/' className="text-white">
        <HomeIcon className="size-6 hover:text-primary transition-colors"/>
      </Link>
    </div>
    <form action={formData} className="flex flex-col gap-3">
      {
        state.token ?
        <Input name="token" type="number" minLength={1000000} max={999999} placeholder="인증번호 6자리 숫자를 입력해 주세요" required/>
        :  <div>
        <select className="absolute rounded-md w-[85px] bg-transparent border-none bg-[auto_1rem] pr-6 focus:ring-0 bg-[url(/arrow-down.svg)]" onChange={selectChange}>
          <option value="+82">🇰🇷 KR</option>
          <option value="+81">🇯🇵 JP</option>
        </select>
        <Input style={{paddingLeft:'90px'}} name="phoneNumber" type="text"
        defaultValue={state.phoneNumber? state.phoneNumber.toString() : countryCode }
        required errors={state.error?.formErrors}/>
      </div>
      }
      <Button text={state.token? '로그인하기' : '인증번호받기'}></Button>
    </form>
  </section>
  )
}