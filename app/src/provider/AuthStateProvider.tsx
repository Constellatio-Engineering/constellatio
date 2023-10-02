import { supabase } from "@/supabase/client";

import {
  createContext, type FunctionComponent, type ReactNode, useEffect, useMemo, useRef, useState 
} from "react";

type AuthStateContext = {
  isUserLoggedIn: boolean | null;
};

const initialContext: AuthStateContext = {
  isUserLoggedIn: null,
};

export const AuthStateContext = createContext<AuthStateContext>(initialContext);

type AuthStateProviderProps = {
  readonly children: ReactNode;
};

const AuthStateProvider: FunctionComponent<AuthStateProviderProps> = ({ children }) =>
{
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<AuthStateContext["isUserLoggedIn"]>(null);
  const unsubscribeRef = useRef<() => void>();

  useEffect(() =>
  {
    if(unsubscribeRef.current)
    {
      unsubscribeRef.current();
    }

    const subscription = supabase.auth.onAuthStateChange((_event, session) =>
    {
      setIsUserLoggedIn(session != null);
    });

    unsubscribeRef.current = subscription.data.subscription.unsubscribe;

    return () => unsubscribeRef.current?.();
  }, []);

  const memoizedContext: AuthStateContext = useMemo(() =>
  {
    return ({ isUserLoggedIn });
  }, [isUserLoggedIn]);

  return (
    <AuthStateContext.Provider value={memoizedContext}>
      {children}
    </AuthStateContext.Provider>
  );
};

export default AuthStateProvider;
