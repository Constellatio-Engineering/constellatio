import { useSession } from "@supabase/auth-helpers-react";
import { type Session, type User } from "@supabase/supabase-js";
import {
  createContext, type FunctionComponent, type ReactNode, useMemo
} from "react";

type InitialAuthState = {
  isUserLoggedIn: null;
};

type UserNotLoggedInState = {
  isUserLoggedIn: false;
};

type UserLoggedInState = {
  isUserLoggedIn: true;
  session: Session;
  user: User;
};

type AuthStateContext = UserNotLoggedInState | UserLoggedInState | InitialAuthState;

const initialAuthState: InitialAuthState = {
  isUserLoggedIn: null
};

export const AuthStateContext = createContext<AuthStateContext>(initialAuthState);

const getIsUserLoggedInClient = (session: Session | null): UserNotLoggedInState | UserLoggedInState =>
{
  const isUserLoggedIn = session != null;

  if(!isUserLoggedIn)
  {
    return ({
      isUserLoggedIn: false
    });
  }

  return ({
    isUserLoggedIn: true,
    session,
    user: session.user
  });
};

type AuthStateProviderProps = {
  readonly children: ReactNode;
};

const AuthStateProvider: FunctionComponent<AuthStateProviderProps> = ({ children }) =>
{
  const session = useSession();
  const memoizedContext: AuthStateContext = useMemo(() => getIsUserLoggedInClient(session), [session]);

  return (
    <AuthStateContext.Provider value={memoizedContext}>
      {children}
    </AuthStateContext.Provider>
  );
};

export default AuthStateProvider;
