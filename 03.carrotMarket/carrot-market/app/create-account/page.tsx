'use client'

import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import SocialLogin from "@/components/SocialLogin";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useActionState } from "react";
import { createAccount } from "./action";

export default function CreateAccount(){

  const [state, formAction] = useActionState(createAccount, null);

  return (
  <section className="flex flex-col gap-10 p-10">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="text-2xl">안녕하세요!</h2>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <Link href='/' className="text-white">
        <HomeIcon className="size-6 hover:text-primary transition-colors"/>
      </Link>
    </div>
    <form action={formAction} className="flex flex-col gap-3">
      <FormInput name="username" type="text" placeholder="2~10자 닉네임을 입력해주세요" required errors={state?.fieldErrors.username}/>
      <FormInput name="email" type="email" placeholder="Email을 입력해주세요" required errors={state?.fieldErrors.email}/>
      <FormInput name="password" type="password" placeholder="4~20자 비밀번호를 입력해주세요" required errors={state?.fieldErrors.password}/>
      <FormInput name="confirmPassword" type="password" placeholder="비밀번호를 재입력해주세요" required errors={state?.fieldErrors.confirmPassword}/>
      <FormButton text='Create account'></FormButton>
    </form>
    <SocialLogin/>
  </section>
  )
}