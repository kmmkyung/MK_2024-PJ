import { redirect } from "next/navigation";

export async function GET(){
  const baseURL = 'https://fvejxpcbdmkopiczwpsn.supabase.co/o/oauth2/v2/auth'
  // const params = {
  //   client_id : process.env.GOOGLE_CLIENT_ID!,
  //   redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/google/complete`,
  //   response_type:'code',
  //   scope	: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
  // };
  const params = new URLSearchParams({
    provider: "google",
    redirect_to: `${process.env.NEXT_PUBLIC_BASE_URL}/google/complete`,
  });

  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;
  return redirect(finalURL);
}