import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useIsRouterReady = (): boolean =>
{
  const [isReady, setIsReady] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => 
  {
    setIsReady(router.isReady); 
  }, [router.isReady]);

  return isReady;
};
