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
      <Title mb={8} order={3}>Der Link wurde versendet</Title>
      <BodyText mb={24} styleType="body-01-regular">Bitte prüfe dein E-Mail-Postfach.</BodyText>
      <Button<"button"> type="button" onClick={closeModal} styleType="primary">Schließen</Button>
    </div>
  );
};

export default ResetPasswordSuccess;
