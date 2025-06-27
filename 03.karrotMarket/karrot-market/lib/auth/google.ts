
export async function getAccessToken(code:string){
  let accessTokenURL = 'https://oauth2.googleapis.com/token'
  const accessTokenParams = new URLSearchParams({
    client_id : process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: 'https://carrot-market-flame.vercel.app/google/complete',
    code: code,
    grant_type: 'authorization_code'
  }).toString();

  accessTokenURL = `${accessTokenURL}?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL,{
    method: 'POST', headers: {Accept: "application/json"}
  });
  const accessTokenJSON = await accessTokenResponse.json();
  return accessTokenJSON;
}

export async function getUserProfile(token:string){
  const userProfileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo",{
    headers: {"Authorization":`Bearer ${token}`}}
  );
  const userProfileJSON = await userProfileResponse.json();
  return userProfileJSON;
}