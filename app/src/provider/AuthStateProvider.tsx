import { useSessionContext } from "@supabase/auth-helpers-react";
import { type Session, type User } from "@supabase/supabase-js";
import {
  createContext, type FunctionComponent, type ReactNode, useMemo
} from "react";

type InitialAuthState = {
  isLoading: boolean;
  isUserLoggedIn: null;
};

type UserNotLoggedInState = {
  isLoading: boolean;
  isUserLoggedIn: false;
};

type UserLoggedInState = {
  isLoading: boolean;
  isUserLoggedIn: true;
  session: Session;
  user: User;
};

type AuthStateContext = UserNotLoggedInState | UserLoggedInState | InitialAuthState;

const initialAuthState: InitialAuthState = {
  isLoading: true,
  isUserLoggedIn: null
};

export const AuthStateContext = createContext<AuthStateContext>(initialAuthState);

// eslint-disable-next-line import/no-unused-modules
export const getIsUserLoggedInClient = (session: Session | null, isLoading: boolean): UserNotLoggedInState | UserLoggedInState =>
{
  const isUserLoggedIn = session != null;

  if(!isUserLoggedIn)
  {
    return ({
      isLoading,
      isUserLoggedIn: false
    });
  }

  return ({
    isLoading,
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
  const { isLoading, session } = useSessionContext();
  const memoizedContext: AuthStateContext = useMemo(() => getIsUserLoggedInClient(session, isLoading), [session, isLoading]);

  return (
    <AuthStateContext.Provider value={memoizedContext}>
      {children}
    </AuthStateContext.Provider>
  );
};

export default AuthStateProvider;
