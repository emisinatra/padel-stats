import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../components/ui/Button"
import { Flex } from "../components/common/Flex"
import { FormControl } from "../components/form/FormControl"
import { Input } from "../components/form/Input"
import { Label } from "../components/form/Label"
import { signIn, signInSchema } from "../controllers/auth/signIn"
import type { SignInFields } from "../controllers/auth/signIn"

export default function SignIn() {
  const navigate = useNavigate()

  const { handleSubmit, register } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
    shouldUseNativeValidation: false,
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn(data)
      toast.success("Welcome!")
      navigate("/app")
    } catch (error) {
      toast.error(error.message)
    }
  })

  return (
    <motion.form animate={{ y: [16, 0], opacity: [0, 1] }} exit={{ y: 16 }} onSubmit={onSubmit}>
      <FormControl>
        <Label>Email</Label>
        <Input {...register("email")} />
      </FormControl>

      <FormControl>
        <Label>Password</Label>
        <Input {...register("password")} type="password" />
      </FormControl>

      <Flex>
        <Button as={Link} to="/sign-up">
          Don't have an account?
        </Button>

        <Button type="submit">Sign in</Button>
      </Flex>
    </motion.form>
  )
}
