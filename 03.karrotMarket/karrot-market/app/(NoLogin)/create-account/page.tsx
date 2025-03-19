'use client'

import Button from "@/components/Button";
import Input from "@/components/Input";
import SocialLogin from "@/components/SocialLogin";
import { useActionState } from "react";
import { createAccount } from "./action";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";


export default function CreateAccount(){

  const [state, formAction] = useActionState(createAccount, null);
  const { errors, data } = state || {};

  return (
    <>
      <section className="flex flex-col gap-10 p-10 pt-20 max-w-screen-sm mx-auto">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="sm:text-2xl text-lg">안녕하세요!</h2>
        <h2 className="sm:text-xl text-base">Fill in the form below to join!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <Input name="username" type="text" placeholder="2~10자 닉네임을 입력해주세요" autoComplete="name" minLength={2} maxLength={10} required errors={errors?.fieldErrors.username} defaultValue={data?.username?.toString()}/>
        <Input name="email" type="email" placeholder="Email을 입력해주세요" autoComplete="email" required errors={errors?.fieldErrors.email} defaultValue={data?.email?.toString()}/>
        <Input name="password" type="password" autoComplete="new-password" placeholder="4~20자 비밀번호를 입력해주세요" minLength={PASSWORD_MIN_LENGTH} maxLength={PASSWORD_MAX_LENGTH} required errors={errors?.fieldErrors.password} defaultValue={data?.password?.toString()}/>
        <Input name="confirmPassword" type="password" autoComplete="new-password" placeholder="비밀번호를 재입력해주세요" minLength={PASSWORD_MIN_LENGTH} maxLength={PASSWORD_MAX_LENGTH} required errors={errors?.fieldErrors.confirmPassword} defaultValue={data?.confirmPassword?.toString()}/>
        <Button text='Create account'></Button>
      </form>
      <SocialLogin/>
    </section>  
  </>
  )
}