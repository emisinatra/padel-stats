import { Country, State } from "country-state-city"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../components/ui/Button"
import { Flex } from "../components/common/Flex"
import { FormControl } from "../components/form/FormControl"
import { HelpText } from "../components/form/HelpText"
import { Input } from "../components/form/Input"
import { Label } from "../components/form/Label"
import { Select } from "../components/form/Select"
import { signUp, signUpSchema } from "../controllers/auth/signUp"
import type { SignUpFields } from "../controllers/auth/signUp"

export default function SignUp() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    shouldUseNativeValidation: false,
  })

  const { country } = useWatch({ control })
  const countries = Country.getAllCountries()
  const states = State.getStatesOfCountry(country)

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data)
      toast.success("A confirmation email has been sent")
    } catch (error) {
      toast.error(error.message)
    }
  })

  return (
    <motion.form animate={{ y: [-16, 0], opacity: [0, 1] }} exit={{ y: 16 }} onSubmit={onSubmit}>
      <Flex gap={0.8}>
        <FormControl>
          <Label>Email</Label>
          <Input {...register("email")} />
        </FormControl>

        <FormControl>
          <Label>Telephone number</Label>
          <Input {...register("telephone")} type="tel" />
        </FormControl>
      </Flex>

      <Flex gap={0.8}>
        <FormControl>
          <Label>Password</Label>
          <Input {...register("password")} type="password" />
        </FormControl>

        <FormControl>
          <Label>Repeat password</Label>
          <Input {...register("repeatPassword")} type="password" />
        </FormControl>
      </Flex>

      <Flex gap={0.8}>
        <FormControl>
          <Label>First name</Label>
          <Input {...register("firstName")} />
        </FormControl>

        <FormControl>
          <Label>Last name</Label>
          <Input {...register("lastName")} />
        </FormControl>
      </Flex>

      <FormControl>
        <Label>Date of birth</Label>

        <Input {...register("dateOfBirth", { valueAsDate: true })} type="date" />
      </FormControl>

      <Flex gap={0.8}>
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
      </Flex>

      {errors.root && <HelpText variant="error">{errors.root.message}</HelpText>}

      <Flex style={{ justifyContent: "space-between" }}>
        <Button as={Link} to="/sign-in">
          Already have an account?
        </Button>

        <Button type="submit">Sign up</Button>
      </Flex>
    </motion.form>
  )
}
