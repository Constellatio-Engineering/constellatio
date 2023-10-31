import { useSession } from "@supabase/auth-helpers-react";
import {
  createContext, type FunctionComponent, type ReactNode, useMemo
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
  const session = useSession();
  const isUserLoggedIn = session != null;

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
