import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { paths } from "@/utils/paths";

import { Loader, Title } from "@mantine/core";
import Router from "next/router";
import React, {
  type FunctionComponent, useState, useEffect, useRef, useContext 
} from "react";

import * as styles from "./EmailConfirmCard.styles";

interface ICardProps 
{
  readonly desc: string;
  readonly isLoading?: boolean;
  readonly title: string;
}

interface EmailConfirmCardProps 
{
  readonly params: { [k: string]: string };
}

const EmailConfirmCard: FunctionComponent<EmailConfirmCardProps> = ({ params }) =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const [card, setCard] = useState<ICardProps>({ desc: "", title: "" });
  const redirectTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => 
  {
    if(isUserLoggedIn == null)
    {
      console.log("waiting for auth state to be loaded...");
      return;
    }

    if(redirectTimeout.current)
    {
      clearTimeout(redirectTimeout.current);
    }

    if(params.error)
    {
      setCard({
        desc: params.error_description ?? "",
        title: "E-Mail Bestätigung nicht erfolgreich",
      });
    }
    else if(isUserLoggedIn)
    {
      console.log("User is logged in, redirecting to dashboard in 5 seconds...");

      setCard({
        desc: "Du wirst in wenigen Sekunden automatisch weitergeleitet...",
        isLoading: true,
        title: "Bestätigung erfolgreich",
      });

      redirectTimeout.current = setTimeout(() =>
      {
        console.log("Redirecting to dashboard now...");
        window.location.replace(paths.dashboard);
        // void Router.replace(paths.dashboard);
      }, 5000);
    }
    else 
    {
      console.error("Supabase did not return an error, but the user is not logged in. Query params were: ", window.location.search);

      setCard({
        desc: "Bitte versuche es erneut oder kontaktiere den Support.",
        title: "Da ist leider etwas schiefgelaufen",
      });
    }

    return () => clearTimeout(redirectTimeout.current);
  }, [isUserLoggedIn, params.error, params.error_description]);

  return (
    <div css={styles.wrapper}>
      <Title order={2} css={styles.title}>
        {card.title}
      </Title>
      <BodyText
        styleType="body-01-regular"
        component="p"
        css={styles.text}>
        {card.desc}
        {card.isLoading && (
          <Loader size="sm" ml={8}/>
        )}
      </BodyText>
    </div>
  );
};

export default EmailConfirmCard;
