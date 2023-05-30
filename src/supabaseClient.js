import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://njulgvuadyduivawzhbx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qdWxndnVhZHlkdWl2YXd6aGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0Njk1NTgsImV4cCI6MjAwMTA0NTU1OH0.rcA1C3cTZOZwvnO2elcewjwo348fcxAe2YaK1RscqRs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
