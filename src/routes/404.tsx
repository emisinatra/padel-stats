import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useTimeout } from "usehooks-ts"

import { useAuth } from "../contexts/AuthContext"

export default function NotFound() {
  const { status } = useAuth()
  const navigate = useNavigate()
  const [timer, setTimer] = useState(5)

  useTimeout(() => {
    if (timer > 0) setTimer((prevTimer) => prevTimer - 1)
    else navigate(status === "AUTHENTICATED" ? "/app" : status === "NOT_AUTHENTICATED" && "/")
  }, 1000)

  return <p>Requested page wasn't found, you'll be redirected in {timer} second(s)</p>
}
