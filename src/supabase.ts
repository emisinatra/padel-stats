import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://dtzghwkqbzovbmsautrx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0emdod2txYnpvdmJtc2F1dHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0MTQwODAsImV4cCI6MTk5Njk5MDA4MH0.uI0SAiqsPXpCxh-wbwfhkD4Ws36CbnCrJgYZ1Q9NAZ4"
)
