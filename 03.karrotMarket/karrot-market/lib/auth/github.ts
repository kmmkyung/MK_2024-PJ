// get token
export async function getAccessToken(code:string){
  let accessTokenURL = 'https://github.com/login/oauth/access_token'
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code: code,
  }).toString();

  accessTokenURL = `${accessTokenURL}?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL,{
    method: 'POST', headers: {Accept: "application/json"}
  });
  const accessTokenJSON = await accessTokenResponse.json();
  return accessTokenJSON;
}

// get user profile
export async function getUserProfile(token:string){
  const userProfileResponse = await fetch("https://api.github.com/user",{
    headers: {"Authorization":`Bearer ${token}`}}
  );
  const userProfileJSON = await userProfileResponse.json();
  return userProfileJSON;
}

// get user email
interface IUserEmail {
  email: string,
  primary: boolean,
  verified: boolean,
  visibility: string
}
export async function getUserEmail(token:string){
  const userEmailResponse = await fetch("https://api.github.com/user/emails",{
    headers: {"Authorization":`Bearer ${token}`}}
  );
  const userEmailJSON = await userEmailResponse.json();
  const userEmail = userEmailJSON.find((email:IUserEmail) =>
    email.primary && email.verified
  )
  return userEmail;
}