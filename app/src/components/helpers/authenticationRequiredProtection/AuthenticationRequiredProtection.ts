import { AuthStateContext } from "@/provider/AuthStateProvider";

import { type FunctionComponent, type PropsWithChildren, useContext } from "react";

export const AuthenticationRequiredProtection: FunctionComponent<PropsWithChildren> = ({ children }) =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);

  if(!isUserLoggedIn)
  {
    console.log("User is not logged in. Do not render children.");
    return null;
  }

  return children;
};
