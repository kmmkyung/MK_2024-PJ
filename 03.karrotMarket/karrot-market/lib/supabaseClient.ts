import { createClient } from "@supabase/supabase-js"
import { SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY } from "@/lib/constants"

export const supabaseClient = createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY);
