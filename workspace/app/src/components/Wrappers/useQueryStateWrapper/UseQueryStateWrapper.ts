import { useIsRouterReady } from "@/hooks/useIsRouterReady";

import { type FunctionComponent, type PropsWithChildren } from "react";

const UseQueryStateWrapper: FunctionComponent<PropsWithChildren> = ({ children }) =>
{
  const isRouterReady = useIsRouterReady();

  if(!isRouterReady)
  {
    return null;
  }

  return children;
};

export default UseQueryStateWrapper;
