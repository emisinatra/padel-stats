import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Center, FormControl, HStack, Input, Label, VStack } from "../components";
import { supabase } from "../supabase";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFields = z.infer<typeof signInSchema>;

const signIn = async (data: SignInFields) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) throw error;
};

export default function SignIn() {
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
    shouldUseNativeValidation: false,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn(data);
      toast.success("Welcome!");
      navigate("/app");
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <Center style={{ height: "100vh" }}>
      <VStack as="form" onSubmit={onSubmit} style={{ width: "390px" }}>
        <FormControl>
          <Label>Email</Label>
          <Input {...register("email")} />
        </FormControl>

        <FormControl>
          <Label>Password</Label>
          <Input {...register("password")} type="password" />
        </FormControl>

        <HStack style={{ fontSize: "0.8rem", justifyContent: "space-between" }}>
          <Button as={Link} to="/sign-up">
            Don't have an account?
          </Button>

          <Button type="submit">Sign in</Button>
        </HStack>
      </VStack>
    </Center>
  );
}
