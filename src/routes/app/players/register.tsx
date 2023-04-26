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
import { FileUpload } from "../../../components/form/FileUpload"
import { registerPlayer, registerPlayerSchema } from "../../../controllers/players/registerPlayer"
import type { RegisterPlayerFields } from "../../../controllers/players/registerPlayer"
import { useAuth } from "../../../contexts/AuthContext"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Form = styled.form`
  border-color: ${({ theme }) => theme.colors.lime[600]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-style: solid;
  border-width: 2px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 590px;
  padding: 2rem;
`
const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
`

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
    console.log(data.image)
    try {
      await registerPlayer(user.id, data)
      toast.success("New player added")
    } catch (error) {
      toast.error(error.message)
    }
  })

  return (
    <Container>
      <Form onSubmit={onSubmit}>
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

          <FileUploadContainer>
            <Label>Player Image</Label>
            <FileUpload register={register} name="image" accept="image/*" />
          </FileUploadContainer>

          <FormControl>
            <Label>Side</Label>
            <Select {...register("side")}>
              <option value="L">Left side</option>
              <option value="R">Right side</option>
            </Select>
          </FormControl>
        </Flex>

        {errors.root && <HelpText variant="error">{errors.root.message}</HelpText>}

        <Flex style={{ justifyContent: "center" }}>
          <Button type="submit">Add</Button>
        </Flex>
      </Form>
    </Container>
  )
}
