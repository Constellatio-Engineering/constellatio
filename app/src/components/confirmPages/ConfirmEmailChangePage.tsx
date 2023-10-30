import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { supabase } from "@/lib/supabase";
import { paths } from "@/utils/paths";

import { Loader, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useEffect, useRef, useState } from "react";

import * as styles from "./ConfirmPage.styles";

const ConfirmEmailChangePage: FunctionComponent = () =>
{
  const router = useRouter();
  const urlSearchParams = new URLSearchParams(router.asPath.split("#")[1]);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { code } = router.query;
  const redirectIntervalRef = useRef<NodeJS.Timer>();
  const [secondsUntilRedirect, setSecondsUntilRedirect] = useState<number>(4);

  const { error: loginWithExchangeCodeError, isLoading: isLoginWithExchangeCodeLoading, mutate: loginWithExchangeCode } = useMutation({
    mutationFn: async (code: string) =>
    {
      const loginResult = await supabase.auth.exchangeCodeForSession(code);

      if(loginResult.error)
      {
        throw loginResult.error;
      }

      console.log("Successfully logged in with exchange code", loginResult.data);

      await router.replace(paths.profile);
    },
    onError: (error: Error) => console.error("Could not login with exchange code", error),
    onSuccess: () =>
    {
      console.log("Successfully logged in with exchange code. Redirecting...");
    },
  });

  useEffect(() =>
  {
    if(redirectIntervalRef.current)
    {
      clearInterval(redirectIntervalRef.current);
    }

    if(!code)
    {
      return;
    }

    redirectIntervalRef.current = setInterval(() =>
    {
      setSecondsUntilRedirect((seconds) =>
      {
        const newSeconds = seconds - 1;

        if(newSeconds <= 0)
        {
          clearInterval(redirectIntervalRef.current);
          loginWithExchangeCode(code as string);
          return 0;
        }
        else
        {
          return seconds - 1;
        }
      });
    }, 1000);

    return () =>
    {
      if(redirectIntervalRef.current)
      {
        clearInterval(redirectIntervalRef.current);
      }
    };
  }, [code, loginWithExchangeCode]);

  let title: string;
  let description: string;
  let redirectText: string | null = null;

  if(params.error)
  {
    title = "Da ist leider etwas schief gelaufen.";
    description = params.error_description ?? "";
  }
  else if(loginWithExchangeCodeError)
  {
    title = "Da ist leider etwas schief gelaufen.";
    description = loginWithExchangeCodeError.message;
  }
  else if(code)
  {
    title = "Deine E-Mail Adresse wurde erfolgreich geändert.";
    description = "Du kannst diesen Tab jetzt schließen und in deinem ursprünglichen Tab fortfahren";
    redirectText = `Du wirst in ${secondsUntilRedirect} Sekunden automatisch weitergeleitet.`;
  }
  else if(params.message === "Confirmation link accepted. Please proceed to confirm link sent to the other email")
  {
    title = "Erste Bestätigung erfolgreich. Bitte bestätige nun auch die zweite E-Mail, die wir dir zugesendet haben.";
    description = "Hinweis: Bei einer Änderung deiner E-Mail Adresse musst du immer sowohl die alte als auch die neue E-Mail Adresse bestätigen.";
  }
  else
  {
    console.log("Unexpected state:", params, router.query);
    title = "Da ist leider etwas schief gelaufen.";
    description = "Bitte wende dich an den Support. Wir sind stets bemüht, unsere Anwendung zu verbessern und freuen uns über deine Unterstützung.";
  }

  return (
    <div css={styles.wrapper}>
      <Title order={2} css={styles.title}>
        {title}
      </Title>
      <BodyText styleType="body-01-regular" component="p">
        {description}
      </BodyText>
      {redirectText && (
        <BodyText styleType="body-01-regular" component="p">
          {redirectText}
        </BodyText>
      )}
      {isLoginWithExchangeCodeLoading && (
        <div style={{
          alignItems: "center", display: "flex", fontSize: 18, gap: 8, marginTop: 50
        }}>
          <p>Du wirst jetzt weitergeleitet...</p>
          <Loader size={22}/>
        </div>
      )}
    </div>
  );
};

export default ConfirmEmailChangePage;
