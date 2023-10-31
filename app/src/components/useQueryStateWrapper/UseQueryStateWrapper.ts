import { useIsRouterReady } from "@/hooks/useIsRouterReady";

import { type FunctionComponent, type ReactNode } from "react";

type Props = {
  readonly children: ReactNode;
};

const UseQueryStateWrapper: FunctionComponent<Props> = ({ children }) =>
{
  const isRouterReady = useIsRouterReady();

  if(!isRouterReady)
  {
    return null;
  }

  return children;
};

export default UseQueryStateWrapper;
