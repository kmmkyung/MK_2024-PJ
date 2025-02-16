import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import SocialLogin from "@/components/SocialLogin";

export default function Login(){
  return (
  <section className="flex flex-col gap-10 p-10">
    <div className="flex flex-col gap-2 *:font-medium">
      <h2 className="text-2xl">안녕하세요!</h2>
      <h2 className="text-xl">Login with email and password!</h2>
    </div>
    <form className="flex flex-col gap-3">
      <FormInput type="email" placeholder="Email" required errors={[]}/>
      <FormInput type="password" placeholder="Password" required errors={[]}/>
      <FormButton loading={false} text='Create account'></FormButton>
    </form>
    <SocialLogin />
  </section>
  )
}