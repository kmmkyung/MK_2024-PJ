"use client"

import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import SocialLogin from "@/components/SocialLogin";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { onFormSubmit } from "./action";
import { useActionState } from "react";

export default function Login(){

  const [state, formAction] = useActionState(onFormSubmit, null)

  return (
  <section className="flex flex-col gap-10 p-10">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="text-2xl">안녕하세요!</h2>
        <h2 className="text-xl">Login with email and password!</h2>
      </div>
      <Link href='/' className="text-white">
        <HomeIcon className="size-6 hover:text-primary transition-colors"/>
      </Link>
    </div>
    <form action={formAction} className="flex flex-col gap-3">
      <FormInput name="email" type="email" placeholder="Email" required errors={state?.errors ?? []}/>
      <FormInput name="password" type="password" placeholder="Password" required errors={state?.errors ?? []}/>
      <FormButton text='Create account'></FormButton>
    </form>
    <SocialLogin />
  </section>
  )
}