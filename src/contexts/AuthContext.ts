import { useEffect, useState } from "react"
import constate from "constate"

import { supabase } from "../supabase"
import { useTimeout } from "usehooks-ts"

export const [AuthProvider, useAuth] = constate(() => {
  const [user, setUser] = useState(null)

  const [status, setStatus] = useState<"LOADING" | "AUTHENTICATED" | "NOT_AUTHENTICATED">("LOADING")

  useTimeout(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        setStatus("AUTHENTICATED")
      } else {
        setUser(null)
        setStatus("NOT_AUTHENTICATED")
      }
    })
  }, 1000)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session.user)
          setStatus("AUTHENTICATED")
          break

        case "SIGNED_OUT":
          setUser(null)
          setStatus("NOT_AUTHENTICATED")
          break

        default:
          break
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, status }
})
