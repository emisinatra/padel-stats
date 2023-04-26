import { z } from "zod"
import { supabase } from "../../supabase"

export const registerPlayerSchema = z.object({
  email: z.string().email(),
  telephone: z.string(),
  name: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date(),
  country: z.string(),
  side: z.enum(["L", "R"]),
  image: z.any(),
})

export type RegisterPlayerFields = z.infer<typeof registerPlayerSchema>

export async function uploadImage(userId: number, file: File) {
  const fileExtension = file && file.name ? file.name.split(".").pop() : null
  const fileName = `${userId}-${Date.now()}.${fileExtension}`
  const { data, error } = await supabase.storage.from("player-photo").upload(fileName, file)

  if (error) throw error

  const {
    data: { publicUrl },
  } = supabase.storage.from("player-photo").getPublicUrl(data.path)
  console.log(publicUrl)
  return publicUrl
}

export async function registerPlayer(coachId: number, data: RegisterPlayerFields) {
  const { image, ...rest } = data
  const imagePath = await uploadImage(coachId, image.item(0))
  const { error } = await supabase.from("players").insert({ coachId, imagePath, ...rest })

  if (error) throw error
}
