import { supabase } from "../../supabase"

export const getPlayersByCoachId = async (coachId: number) => {
  const { data, error } = await supabase.from("players").select().match({ coachId })
  if (error) throw error
  else return data
}
