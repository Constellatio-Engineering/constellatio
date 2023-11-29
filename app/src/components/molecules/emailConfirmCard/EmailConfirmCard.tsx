import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { paths } from "@/utils/paths";

import { Loader, Title } from "@mantine/core";
import React, {
  type FunctionComponent, useState, useEffect, useRef
} from "react";

import { type ParsedUrlQuery } from "querystring";

import * as styles from "./EmailConfirmCard.styles";

interface ICardProps 
{
  readonly desc: string;
  readonly isLoading?: boolean;
  readonly title: string;
}

interface EmailConfirmCardProps 
{
  readonly params: ParsedUrlQuery;
}

const EmailConfirmCard: FunctionComponent<EmailConfirmCardProps> = ({ params }) =>
{
  const [card, setCard] = useState<ICardProps>({ desc: "", title: "" });
  const redirectTimeout = useRef<NodeJS.Timeout>();

  useEffect(() =>
  {
    if(redirectTimeout.current)
    {
      clearTimeout(redirectTimeout.current);
    }

    if(params.error)
    {
      setCard({
        desc: params.error_description?.toString() ?? "",
        title: "E-Mail Bestätigung nicht erfolgreich",
      });
    }
    else if(params.code)
    {
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
      }, 4000);
    }
    else 
    {
      console.error("Email confirmation failed. Query params did not contain an error or a code. Query params were: ", window.location.search);

      setCard({
        desc: "Bitte versuche es erneut oder kontaktiere den Support.",
        title: "Da ist leider etwas schiefgelaufen",
      });
    }

    return () => clearTimeout(redirectTimeout.current);
  }, [params.code, params.error, params.error_description]);

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
