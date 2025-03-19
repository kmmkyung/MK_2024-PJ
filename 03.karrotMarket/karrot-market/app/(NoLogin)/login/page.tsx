"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import SocialLogin from "@/components/SocialLogin";
import { login } from "./action";
import { useActionState } from "react";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";


export default function Login(){
  const [state, formAction] = useActionState(login, null)
  
  return (
  <section className="flex flex-col gap-10 p-10 pt-20 max-w-screen-sm mx-auto">
    <div className="*:font-medium">
      <h2 className="sm:text-2xl text-lg">안녕하세요!</h2>
      <h2 className="sm:text-xl text-base">Login with email and password!</h2>
    </div>
    <form action={formAction} className="flex flex-col gap-3">
      <Input name="email" defaultValue={state?.data?.email?.toString()} type="email" placeholder="Email" required errors={state?.errors?.fieldErrors.email}/>
      <Input name="password" type="password" defaultValue={state?.data.password?.toString()} placeholder="Password" minLength={PASSWORD_MIN_LENGTH} maxLength={PASSWORD_MAX_LENGTH} required errors={state?.fieldErrors?.password}/>
      <Button text='Login'></Button>
    </form>
    <SocialLogin />
  </section>
  )
}