import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";

export default function SmsLogin(){
  return (
  <section className="flex flex-col gap-10 p-10">
    <div className="flex flex-col gap-2 *:font-medium">
      <h2 className="text-2xl">SMS로 로그인하세요!</h2>
      <h2 className="text-xl">Verify your phone number.</h2>
    </div>
    <form className="flex flex-col gap-3">
      <FormInput type="number" placeholder="Phone number" required errors={[]}/>
      <FormInput type="number" placeholder="인증번호를 입력해 주세요" required errors={[]}/>
      <FormButton loading={false} text='로그인하기'></FormButton>
    </form>
  </section>
  )
}