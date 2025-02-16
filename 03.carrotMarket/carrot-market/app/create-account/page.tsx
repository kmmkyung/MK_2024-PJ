import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import SocialLogin from "@/components/SocialLogin";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";


export default function CreateAccount(){
  return (
  <section className="flex flex-col gap-10 p-10">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="text-2xl">안녕하세요!</h2>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <Link href='/' className="text-white">
        <HomeIcon className="size-6 hover:text-primary transition-colors"/>
      </Link>    </div>
    <form className="flex flex-col gap-3">
      <FormInput type="text" placeholder="User Name" required errors={[]}/>
      <FormInput type="email" placeholder="Email" required errors={[]}/>
      <FormInput type="password" placeholder="Password" required errors={[]}/>
      <FormInput type="password" placeholder="Confirm Password" required errors={[]}/>
      <FormButton loading={false} text='Create account'></FormButton>
    </form>
    <SocialLogin/>
  </section>
  )
}