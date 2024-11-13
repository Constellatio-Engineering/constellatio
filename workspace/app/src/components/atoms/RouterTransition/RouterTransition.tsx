import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useRouter } from "next/router";
import { type FunctionComponent, useEffect } from "react";

export const RouterTransition: FunctionComponent = () =>
{
  const router = useRouter();

  useEffect(() =>
  {
    const handleStart = (url: string): void =>
    {
      if(url === router.asPath)
      {
        return;
      }
      nprogress.start();
    };

    const handleComplete = (): void =>
    {
      nprogress.complete();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () =>
    {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath, router.events]);

  return <NavigationProgress progressLabel="Loading Page" autoReset/>;
};
