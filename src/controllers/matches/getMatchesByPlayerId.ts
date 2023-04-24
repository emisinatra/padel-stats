import { supabase } from "../../supabase"

export const getMatchesByPlayerId = async (playerId: string) => {
  const { data, error } = await supabase.from("matches").select().match({ playerId })
  if (error) throw error
  else return data
}
