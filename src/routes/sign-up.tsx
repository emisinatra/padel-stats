import { Country, State } from "country-state-city";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, FormControl, HStack, Input, Label, Select, VStack } from "../components";
import { signUp, signUpSchema } from "../controllers/auth/signUp";
import type { SignUpFields } from "../controllers/auth/signUp";

export default function SignUp() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    shouldUseNativeValidation: false,
  });

  const { country } = useWatch({ control });
  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data);
      toast.success("A confirmation email has been sent");
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <VStack as="form" onSubmit={onSubmit}>
      <HStack>
        <FormControl>
          <Label>Email</Label>
          <Input {...register("email")} />
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
          <Input {...register("firstName")} />
        </FormControl>

        <FormControl>
          <Label>Last name</Label>
          <Input {...register("lastName")} />
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
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {states.length > 1 && (
          <FormControl>
            <Label>State/Province</Label>

            <Select {...register("state")}>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
      </HStack>

      {errors.root && <p>{errors.root.message}</p>}

      <HStack style={{ justifyContent: "space-between" }}>
        <Button as={Link} to="/sign-in">
          Already have an account?
        </Button>

        <Button type="submit">Sign up</Button>
      </HStack>
    </VStack>
  );
}
