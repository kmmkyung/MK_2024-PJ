import { supabaseClient } from "./supabaseClient";
import userLogin from "./userLogin";

export async function loginWithSupabaseEmail(userId:number, email: string, password: string){
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  if (!data.session || !data.user) {
    throw new Error("로그인 실패");
  }
  const userUid = data.user.id
  return await userLogin(userId,userUid);
}