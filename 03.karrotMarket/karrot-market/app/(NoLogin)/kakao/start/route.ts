import { redirect } from "next/navigation";

export async function GET(){
  const baseURL = 'https://kauth.kakao.com/oauth/authorize'
  const params = {
    client_id : process.env.KAKAO_REST_KEY!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/kakao/complete`,
    response_type:'code',
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;
  return redirect(finalURL);
}