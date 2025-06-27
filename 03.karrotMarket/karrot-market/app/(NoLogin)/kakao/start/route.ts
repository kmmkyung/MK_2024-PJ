import { redirect } from "next/navigation";

export async function GET(){
  const baseURL = 'https://kauth.kakao.com/oauth/authorize'
  const params = {
    client_id : process.env.KAKAO_REST_KEY!,
    redirect_uri: 'http://localhost:3000/kakao/complete',
    response_type:'code',
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;
  return redirect(finalURL);
}