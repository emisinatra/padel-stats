import { z } from "zod"

import { supabase } from "../../supabase"

export const registerPlayerSchema = z.object({
  country: z.string(),
  dateOfBirth: z.date(),
  email: z.string().email(),
  lastName: z.string(),
  name: z.string(),
  side: z.string(),
  telephone: z.string().optional(),
})

export type RegisterPlayerFields = z.infer<typeof registerPlayerSchema>

export const registerPlayer = async (coachId: number, data: RegisterPlayerFields) => {
  const { error } = await supabase.from("players").insert([
    {
      coachId,
      country: data.country,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      lastName: data.lastName,
      name: data.name,
      side: data.side,
      telephone: data.telephone,
    },
  ])

  if (error) throw error
}
