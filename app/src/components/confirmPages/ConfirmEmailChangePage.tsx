import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { changeEmailTabSlug, tabQueryKey } from "@/components/pages/profilePage/ProfilePage";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";
import { paths } from "@/utils/paths";

import { Loader, Title } from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useEffect, useRef, useState } from "react";

import * as styles from "./ConfirmPage.styles";

const ConfirmEmailChangePage: FunctionComponent = () =>
{
  const { invalidateUserDetails } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const router = useRouter();
  const urlSearchParams = new URLSearchParams(router.asPath.split("#")[1]);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { code } = router.query;
  const redirectIntervalRef = useRef<NodeJS.Timer>();
  const [secondsUntilRedirect, setSecondsUntilRedirect] = useState<number>(4);
  const user = useUser();
  const userEmail = user?.email;

  const {
    error: updateUserEmailError,
    isLoading: isUpdatingEmailLoading,
    mutate: updateUserDetailsInDb
  } = api.users.updateUserDetails.useMutation({
    onError: (error) =>
    {
      console.error("Could not update user details", error);
    },
    onSuccess: async () =>
    {
      console.log("Successfully updated user details");
      await invalidateUserDetails();
      await router.replace(paths.profile, {
        query: {
          [tabQueryKey]: changeEmailTabSlug
        }
      });
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
          updateUserDetailsInDb({ email: userEmail });
          return 0;
        }
        else
        {
          return newSeconds;
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
  }, [code, updateUserDetailsInDb, userEmail]);

  let title: string;
  let description: string;
  let showLoader = false;

  if(params.error)
  {
    title = "Da ist leider etwas schief gelaufen.";
    description = params.error_description ?? "";
  }
  else if(updateUserEmailError)
  {
    title = "Da ist leider etwas schief gelaufen.";
    description = "Bitte wende dich an den Support. Wir sind stets bemüht, unsere Anwendung zu verbessern und freuen uns über deine Unterstützung.";
  }
  else if(code)
  {
    title = "Deine E-Mail Adresse wurde erfolgreich geändert.";
    description = `Du wirst ${secondsUntilRedirect <= 0 ? "jetzt" : `in ${secondsUntilRedirect} Sekunden automatisch`} weitergeleitet.`;
    showLoader = secondsUntilRedirect <= 0;
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
      <BodyText styleType="body-01-regular" component="p" style={{ alignItems: "center", display: "flex", gap: 8 }}>
        {description}
        {(showLoader || isUpdatingEmailLoading) && <Loader size={22}/>}
      </BodyText>
    </div>
  );
};

export default ConfirmEmailChangePage;
