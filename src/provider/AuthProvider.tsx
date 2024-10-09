import React, { createContext, useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { getProfile } from "@/db/queries";

type ContextProps = {
  user: any;
  profile: any;
  session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  // user null = loading
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        //get user data
        supabase.auth.getUser().then(({ data: { user } }) => {
          setUser(user);
          getProfile(user.id).then((profile) => {
            setProfile(profile);
          });
        });
      } else {
        console.log("no user");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)");
        setSession(session);
        supabase.auth.getUser().then(({ data: { user } }) => {
          setUser(user);
          getProfile(user.id).then((profile) => {
            setProfile(profile);
          });
        });
      } else {
        console.log("no user");
        router.replace("/(auth)/login");
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
