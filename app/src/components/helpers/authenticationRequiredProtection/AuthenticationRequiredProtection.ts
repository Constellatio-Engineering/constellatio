import { AuthStateContext } from "@/provider/AuthStateProvider";

import { type FunctionComponent, type PropsWithChildren, useContext } from "react";

export const AuthenticationRequiredProtection: FunctionComponent<PropsWithChildren> = ({ children }) =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);

  if(!isUserLoggedIn)
  {
    return null;
  }

  return children;
};
