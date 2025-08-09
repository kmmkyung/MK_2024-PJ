// import { createClient } from "@supabase/supabase-js"
// import { SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY } from "@/lib/constants"

// export const supabaseClient = createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY);


// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY } from "@/lib/constants";

const globalForSupabase = globalThis as unknown as {
  supabase?: ReturnType<typeof createClient>;
};

export const supabaseClient =
  globalForSupabase.supabase ??
  createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      debug: false, // 로그 제거
    },
  });

// 개발 모드에서만 전역에 저장 → HMR 시 재사용
if (process.env.NODE_ENV !== "production") {
  globalForSupabase.supabase = supabaseClient;
}
