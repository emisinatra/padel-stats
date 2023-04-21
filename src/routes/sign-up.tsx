import { Country, State } from "country-state-city";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Center, FormControl, HStack, Input, Label, Select, VStack } from "../components";
import { supabase } from "../supabase";

const signUpSchema = z
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

type SignUpFields = z.infer<typeof signUpSchema>;

const signUp = async (data: SignUpFields) => {
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

export default function SignUp() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFields>({
    mode: "onSubmit",
    shouldUseNativeValidation: false,
    resolver: zodResolver(signUpSchema),
  });

  const { country } = useWatch({ control });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data);
      toast.success("A confirmation email has been sent");
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <Center style={{ height: "100vh" }}>
      <VStack as="form" onSubmit={onSubmit} style={{ width: "390px" }}>
        <HStack>
          <FormControl>
            <Label>Email</Label>
            <Input {...register("email")} type="email" />
          </FormControl>

          <FormControl>
            <Label>Telephone number</Label>
            <Input {...register("telephone")} type="tel" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <Label>Password</Label>
            <Input {...register("password")} type="password" />
          </FormControl>

          <FormControl>
            <Label>Repeat password</Label>
            <Input {...register("repeatPassword")} type="password" />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <Label>First name</Label>
            <Input {...register("firstName")} type="text" />
          </FormControl>

          <FormControl>
            <Label>Last name</Label>
            <Input {...register("lastName")} type="text" />
          </FormControl>
        </HStack>

        <FormControl>
          <Label>Date of birth</Label>

          <Input {...register("dateOfBirth", { valueAsDate: true })} type="date" />
        </FormControl>

        <HStack>
          <FormControl>
            <Label>Country</Label>

            <Select {...register("country")}>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <Label>State/Province</Label>

            <Select {...register("state")}>
              {State.getStatesOfCountry(country).map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        {errors.root && <p>{errors.root.message}</p>}

        <HStack style={{ fontSize: "0.8rem", justifyContent: "space-between" }}>
          <Button as={Link} to="/sign-in">
            Already have an account?
          </Button>

          <Button type="submit">Sign up</Button>
        </HStack>
      </VStack>
    </Center>
  );
}
