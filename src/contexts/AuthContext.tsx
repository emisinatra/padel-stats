import { useEffect, useState } from "react";
import constate from "constate";

import { supabase } from "../supabase";

export const [AuthProvider, useAuth] = constate(() => {
  const [user, setUser] = useState(null);

  const [status, setStatus] = useState<
    "LOADING" | "AUTHENTICATED" | "NOT_AUTHENTICATED"
  >("LOADING");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setStatus("AUTHENTICATED");
      } else {
        setUser(null);
        setStatus("NOT_AUTHENTICATED");
      }
    });
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session.user);
          setStatus("AUTHENTICATED");
          break;

        case "SIGNED_OUT":
          setUser(null);
          setStatus("NOT_AUTHENTICATED");
          break;

        default:
          break;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, status };
});
