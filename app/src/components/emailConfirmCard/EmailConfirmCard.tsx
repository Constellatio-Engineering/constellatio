import { Title } from "@mantine/core";
import React, { type FunctionComponent, useState, useEffect } from "react";

import * as styles from "./EmailConfirmCard.styles";
import { BodyText } from "../atoms/BodyText/BodyText";

interface ICardProps 
{
  readonly desc: string;
  readonly title: string;
}

interface EmailConfirmCardProps 
{
  readonly params: { [k: string]: string };
}

const EmailConfirmCard: FunctionComponent<EmailConfirmCardProps> = ({
  params,
}) => 
{
  const [card, setCard] = useState<ICardProps>({ desc: "", title: "" });
  useEffect(() => 
  {
    if(typeof window !== "undefined") 
    {
      console.log(params);
      if(params.error) 
      {
        setCard({
          desc: params.error_description ?? "",
          title: "E-Mail Bestätigung nicht erfolgreich",
        });
      }
      else 
      {
        setCard({
          desc: "Du kannst diesen Tab jetzt schließen und in deinem ursprünglichen Tab fortfahren",
          title: "Bestätigung erfolgreich",
        });
      }
    }
  }, [params, params.error, params.error_description]);
  return (
    <div css={styles.wrapper}>
      <Title order={2} css={styles.title}>
        {card.title}
      </Title>
      <BodyText styleType="body-01-regular" component="p">
        {card.desc}
      </BodyText>
    </div>
  );
};

export default EmailConfirmCard;
