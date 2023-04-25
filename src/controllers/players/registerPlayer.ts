import { z } from "zod"
import { supabase } from "../../supabase"

export const playerDataSchema = z.object({
  email: z.string().email(),
  telephone: z.string(),
  name: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date(),
  country: z.string(),
  side: z.enum(["L", "R"]),
  imagePath: z.string().nullable(),
})

export type RegisterPlayerFields = z.infer<typeof playerDataSchema>

export const registerPlayerSchema = playerDataSchema.safeParse

export async function uploadImage(userId, file) {
  console.log("uploadImage called with userId and file:", userId, file)
  const fileExtension = file && file.name ? file.name.split(".").pop() : null

  if (fileExtension) {
    const fileName = `${userId}-${Date.now()}.${fileExtension}`

    const { data: uploadResponse, error: uploadError } = await supabase.storage
      .from("player-photo")
      .upload(fileName, file)

    if (uploadError) throw uploadError

    return uploadResponse.path
  }

  return null
}

export async function registerPlayer(coachId: number, playerData: RegisterPlayerFields) {
  console.log("registerPlayer called with coachId and playerData:", coachId, playerData)

  const { imagePath, ...rest } = playerData

  const { error } = await supabase.from("players").insert([{ ...rest, coachId, imagePath }])

  if (error) throw error
}
