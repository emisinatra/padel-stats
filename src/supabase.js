import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dtzghwkqbzovbmsautrx.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0emdod2txYnpvdmJtc2F1dHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0MTQwODAsImV4cCI6MTk5Njk5MDA4MH0.uI0SAiqsPXpCxh-wbwfhkD4Ws36CbnCrJgYZ1Q9NAZ4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
