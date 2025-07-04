import { supabaseClient } from "./supabaseClient";
import userLogin from "./userLogin";

export async function loginWithSupabaseEmail(email: string, password: string){
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  if (!data.session || !data.user) {
    throw new Error("로그인 실패");
  }
  const userId = data.user.id;
  return await userLogin(userId);
}

export async function loginWithSupabaseOAuth(provider: string) {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider,
  });
  if (error) throw error;
}