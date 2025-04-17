"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useActionState, useState } from "react";
import { smsLogin } from "./action";

const initialState = {
  token: false,
  error: {fieldErrors:{phoneNumber:[], token:[]}},
  phoneNumber: '',
}

export default function SmsLogin(){

  const [state, formData] = useActionState(smsLogin, initialState);
  const [countryCode, setCountryCode] = useState("+82");

  function selectChange(event:React.ChangeEvent<HTMLSelectElement>){
    setCountryCode(event.target.value)
  }  

  return (
  <section className="flex flex-col gap-10 p-10 pt-20 max-w-screen-sm mx-auto">
    <div className="flex flex-col gap-1 *:font-medium">
      <h2 className="sm:text-2xl text-lg">SMS로 로그인하세요!</h2>
      <h2 className="sm:text-xl text-base">Verify your phone number.</h2>
    </div>
    <form action={formData} className="flex flex-col gap-3">
      <select className="absolute rounded-md w-[85px] bg-transparent border-none disabled:text-neutral-300 bg-[auto_1rem] pr-6 focus:ring-0 bg-[url(/arrow-down.svg)]" disabled={state.token} onChange={selectChange}>
        <option value="+82">🇰🇷 KR</option>
        <option value="+81">🇯🇵 JP</option>
      </select>
      <Input style={{paddingLeft:'90px'}} name="phoneNumber" type="text"
      defaultValue={state.phoneNumber? state.phoneNumber.toString() : countryCode }
      required errors={state?.error?.fieldErrors.phoneNumber} readOnly={state.token}/>
      <Input name="token" type="number" minLength={1000000} max={999999} placeholder="인증번호 6자리 숫자를 입력해 주세요" disabled={!state.token} required={state.token}
      errors={state?.error?.fieldErrors.token}/>
      <Button text={state.token? '로그인하기' : '인증번호받기'}></Button>
    </form>
  </section>
  )
}