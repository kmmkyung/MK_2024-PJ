"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useActionState, useState } from "react";
import { smsLogin } from "./action";

const initialState = {
  token: false,
  phoneNumber: ''
}

export default function SmsLogin(){

  const [state, formData] = useActionState(smsLogin, initialState);
  const { phoneNumber } = state || {};
  const [countryCode, setCountryCode] = useState("+82");

  // const phoneNumberInput = document.querySelector('.phoneNumberBox input') as HTMLInputElement;
  function selectChange(event:React.ChangeEvent<HTMLSelectElement>){
    setCountryCode(event.target.value)
    // if(phoneNumberInput){
    //   phoneNumberInput.value = event.target.value
    // }
  }

  return (
  <section className="flex flex-col gap-10 p-10">
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
      <div className="relative phoneNumberBox">
        <select className="absolute w-[120px] bg-transparent border-none bg-[auto_1rem] pr-6 focus:ring-0 bg-[url(/arrow-down.svg)]" onChange={selectChange}>
          <option value="+82">🇰🇷 Korea</option>
          <option value="+81">🇯🇵 Japan</option>
        </select>
        <Input style={{paddingLeft:'125px'}} name="phoneNumber" type="text"
        defaultValue={phoneNumber? phoneNumber.toString() : countryCode }
        required />
      </div>
      {
        state?.token ?
        <Input name="token" type="number" minLength={1000000} max={999999} placeholder="인증번호를 입력해 주세요" required/>
        : null
      }
      <Button text='로그인하기'></Button>
    </form>
  </section>
  )
}