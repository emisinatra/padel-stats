import { Link } from "react-router-dom";

import { Button, Center, FormControl, HStack, Input, Label, VStack } from "../components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFields = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { handleSubmit, register } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
    shouldUseNativeValidation: false,
  });

  const handleSignIn = handleSubmit(async (data) => {
    data.email;
    data.password;
  });

  return (
    <Center style={{ height: "100vh" }}>
      <VStack as="form" onSubmit={handleSignIn}>
        <FormControl>
          <Label>Email</Label>
          <Input {...register("email")} />
        </FormControl>

        <FormControl>
          <Label>Password</Label>
          <Input {...register("password")} type="password" />
        </FormControl>

        <HStack>
          <Button as={Link} to="/sign-up">
            Don't have an account?
          </Button>

          <Button type="submit">Sign in</Button>
        </HStack>
      </VStack>
    </Center>
  );
}
