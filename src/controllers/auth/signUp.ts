import { z } from "zod";

import { supabase } from "../../supabase";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    telephone: z.string().optional(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.instanceof(Date),
    country: z.string(),
    state: z.string(),
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, "Passwords do not match");

export type SignUpFields = z.infer<typeof signUpSchema>;

export const signUp = async (data: SignUpFields) => {
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        telephone: data.telephone,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        country: data.country,
        state: data.state,
      },
    },
  });

  if (error) throw error;
};
