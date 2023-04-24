import { z } from "zod"

import { supabase } from "../../supabase"

export const registerSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  telephone: z.string().optional(),
  dateOfBirth: z.date(),
  side: z.string(),
  country: z.string(),
  email: z.string().email(),
})

export type RegisterFields = z.infer<typeof registerSchema>

export const registerPlayer = async (data: RegisterFields) => {
  const { error } = await supabase.from("players").insert([
    {
      name: data.name,
      lastName: data.lastName,
      telephone: data.telephone,
      dateOfBirth: data.dateOfBirth,
      side: data.side,
      country: data.country,
      email: data.email,
    },
  ])
  if (error) throw error
}
