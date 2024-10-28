import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ResetPasswordSuccess.styles";
import FlagImg from "../../../../../public/images/placeholder-flag.png";

interface Props
{
  readonly closeModal: () => void;
}

const ResetPasswordSuccess: FunctionComponent<Props> = ({ closeModal }) =>
{
  return (
    <div css={styles.wrapper}>
      <CaisyImg src={FlagImg.src} width={70} height={70}/>
      <Title mb={16} order={3}>Der Link wurde versendet</Title>
      <BodyText mb={8} styleType="body-01-regular">Sofern deine E-Mail-Adresse in unserem System hinterlegt ist, haben wir dir einen Link zum Zurücksetzen deines Passworts zugesendet.</BodyText>
      <BodyText mb={24} styleType="body-01-regular">Bitte prüfe dein E-Mail-Postfach und deinen Spam-Ordner.</BodyText>
      <Button<"button"> type="button" onClick={closeModal} styleType="primary">Schließen</Button>
    </div>
  );
};

export default ResetPasswordSuccess;
