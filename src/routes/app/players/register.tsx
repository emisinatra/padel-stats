import { Country } from "country-state-city"
import { toast } from "react-toastify"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../../../components/ui/Button"
import { Flex } from "../../../components/common/Flex"
import { FormControl } from "../../../components/form/FormControl"
import { HelpText } from "../../../components/form/HelpText"
import { Input } from "../../../components/form/Input"
import { Label } from "../../../components/form/Label"
import { Select } from "../../../components/form/Select"
import { registerSchema, registerPlayer } from "../../../controllers/players/Register"
import type { RegisterFields } from "../../../controllers/players/Register"

export default function Register() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
    shouldUseNativeValidation: false,
  })

  const countries = Country.getAllCountries()

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerPlayer(data)
      toast.success("You added a new player")
    } catch (error) {
      toast.error(error.message)
    }
  })

  return (
    <form onSubmit={onSubmit}>
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
          <Label>First name</Label>
          <Input {...register("name")} />
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
          <Label>Side</Label>
          <Select {...register("side")}>
            <option value="Left side">Left side</option>
            <option value="Right side">Right side</option>
          </Select>
        </FormControl>
      </Flex>

      {errors.root && <HelpText variant="error">{errors.root.message}</HelpText>}

      <Flex style={{ justifyContent: "center" }}>
        <Button type="submit">Add</Button>
      </Flex>
    </form>
  )
}
