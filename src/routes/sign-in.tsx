import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, FormControl, HStack, Input, Label, VStack } from "../components";
import { signIn, signInSchema } from "../controllers/auth/signIn";
import type { SignInFields } from "../controllers/auth/signIn";

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
    <VStack as="form" onSubmit={onSubmit}>
      <FormControl>
        <Label>Email</Label>
        <Input {...register("email")} />
      </FormControl>

      <FormControl>
        <Label>Password</Label>
        <Input {...register("password")} type="password" />
      </FormControl>

      <HStack style={{ justifyContent: "space-between" }}>
        <Button as={Link} to="/sign-up">
          Don't have an account?
        </Button>

        <Button type="submit">Sign in</Button>
      </HStack>
    </VStack>
  );
}
