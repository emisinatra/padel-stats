import { supabase } from "../../supabase"

export const getPlayersByCoachId = async (coachId: string) => {
  const { data, error } = await supabase.from("players").select().match({ coachId })
  if (error) throw error
  else return data
}
