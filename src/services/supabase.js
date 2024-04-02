import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jrsluonpwffseuhgrtxd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyc2x1b25wd2Zmc2V1aGdydHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5MDY3NDQsImV4cCI6MjAyNzQ4Mjc0NH0.jjDhgfDTdz-DJ1Q0BPxoIWrL1EG2F_btzlwa1Elu2EY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
