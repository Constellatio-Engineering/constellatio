import { BodyText } from "@/components/atoms/BodyText/BodyText";

import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./ConfirmPage.styles";

const ConfirmEmailChangePage: FunctionComponent = () =>
{
  const router = useRouter();
  const urlSearchParams = new URLSearchParams(router.asPath.split("#")[1]);
  const params = Object.fromEntries(urlSearchParams.entries());

  let title: string;
  let description: string;

  console.log(params);

  if(params.error)
  {
    title = "Da ist leider etwas schief gelaufen.";
    description = params.error_description ?? "";
  }
  else if(params.code)
  {
    title = "Deine E-Mail Adresse wurde erfolgreich geändert.";
    description = "Du kannst diesen Tab jetzt schließen und in deinem ursprünglichen Tab fortfahren";
  }
  else
  {
    title = "Bestätigung erfolgreich";
    description = "Du kannst diesen Tab jetzt schließen und in deinem ursprünglichen Tab fortfahren";
  }

  return (
    <div css={styles.wrapper}>
      <Title order={2} css={styles.title}>
        {title}
      </Title>
      <BodyText styleType="body-01-regular" component="p">
        {description}
      </BodyText>
    </div>
  );
};

export default ConfirmEmailChangePage;
