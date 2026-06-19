import { createClient } from "@supabase/supabase-js";
function createSupabaseClient() {
  const SUPABASE_URL = "https://fgbpctqcomrkfulfeimh.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_pkx4vQnAO1FUj7eo8_usOQ_Qi6_jJ4q";
  console.log("VITE_SUPABASE_URL =", "https://fgbpctqcomrkfulfeimh.supabase.co");
  console.log("VITE_SUPABASE_PUBLISHABLE_KEY =", "sb_publishable_pkx4vQnAO1FUj7eo8_usOQ_Qi6_jJ4q");
  console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
  console.log("SUPABASE_PUBLISHABLE_KEY =", process.env.SUPABASE_PUBLISHABLE_KEY);
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase as s
};
