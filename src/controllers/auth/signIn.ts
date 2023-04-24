import { z } from "zod";

import { supabase } from "../../supabase";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInFields = z.infer<typeof signInSchema>;

export const signIn = async (data: SignInFields) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) throw error;
};
