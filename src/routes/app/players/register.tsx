import { Country } from "country-state-city"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../../../components/ui/Button"
import { Flex } from "../../../components/common/Flex"
import { FormControl } from "../../../components/form/FormControl"
import { HelpText } from "../../../components/form/HelpText"
import { Input } from "../../../components/form/Input"
import { Label } from "../../../components/form/Label"
import { Select } from "../../../components/form/Select"
import { registerPlayerSchema, registerPlayer } from "../../../controllers/players/registerPlayer"
import type { RegisterPlayerFields } from "../../../controllers/players/registerPlayer"
import { useAuth } from "../../../contexts/AuthContext"

export default function Register() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterPlayerFields>({
    resolver: zodResolver(registerPlayerSchema),
    shouldUseNativeValidation: false,
  })
  const countries = Country.getAllCountries()
  const { user } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerPlayer(user.id, data)
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
