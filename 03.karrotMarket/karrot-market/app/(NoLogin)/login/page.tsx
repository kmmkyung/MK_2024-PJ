"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import SocialLogin from "@/components/SocialLogin";
import { login } from "./action";
import { useActionState } from "react";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function Login(){

  const [state, formAction] = useActionState(login, null)
  const { errors, data } = state || {};

  return (
  <section className="flex flex-col gap-10 p-10 pt-20 max-w-screen-sm mx-auto">
    <div className="*:font-medium">
      <h2 className="sm:text-2xl text-lg">안녕하세요!</h2>
      <h2 className="sm:text-xl text-base">Login with email and password!</h2>
    </div>
    <form action={formAction} className="flex flex-col gap-3">
      <Input name="email" defaultValue={data?.email?.toString()} type="email" placeholder="Email" required errors={errors?.fieldErrors.email}/>
      <Input name="password" type="password" defaultValue={data?.password?.toString()} placeholder="Password" minLength={PASSWORD_MIN_LENGTH} maxLength={PASSWORD_MAX_LENGTH} required errors={errors?.fieldErrors.password}/>
      <Button text='Create account'></Button>
    </form>
    <SocialLogin />
  </section>
  )
}