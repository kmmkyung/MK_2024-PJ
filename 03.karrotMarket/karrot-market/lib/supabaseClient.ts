// import { createClient } from "@supabase/supabase-js"
// import { SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY } from "@/lib/constants"

// export const supabaseClient = createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY);


import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY } from "@/lib/constants";

// 전역 객체에 한 번만 생성
const globalForSupabase = globalThis as unknown as {
  supabase?: ReturnType<typeof createClient>;
};

export const supabaseClient =
  globalForSupabase.supabase ??
  createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

// 개발 모드에서만 전역에 저장 (HMR 시 재사용)
if (process.env.NODE_ENV !== "production") {
  globalForSupabase.supabase = supabaseClient;
}
