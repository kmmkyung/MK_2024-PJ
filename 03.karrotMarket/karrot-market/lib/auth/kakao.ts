
export async function getAccessToken(code:string){
  let accessTokenURL = 'https://kauth.kakao.com/oauth/token'
  const accessTokenParams = new URLSearchParams({
    client_id : process.env.KAKAO_REST_KEY!,
    client_secret: process.env.KAKAO_CLIENT_SECRET!,
    redirect_uri: 'https://carrot-market-flame.vercel.app/kakao/complete',
    code: code,
    grant_type: 'authorization_code',
  }).toString();

  accessTokenURL = `${accessTokenURL}?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL,{
    method: 'POST', headers: {'Content-Type': "application/json"}
  });
  const accessTokenJSON = await accessTokenResponse.json();
  console.log(accessTokenURL);
  return accessTokenJSON;
}

export async function getUserProfile(token:string){
  let userProfileURL = 'https://kapi.kakao.com/v2/user/me'
  const accessUserParams = new URLSearchParams({
    'property_keys': '["kakao_account.email", "kakao_account.profile", "kakao_account.name"]'
  }).toString();
  userProfileURL = `${userProfileURL}?${accessUserParams}`
  const userProfileResponse = await fetch(userProfileURL,{
    headers: {"Authorization":`Bearer ${token}`, 'Content-Type': "application/json"},
  });
  const userProfileJSON = await userProfileResponse.json();
  return userProfileJSON;
}