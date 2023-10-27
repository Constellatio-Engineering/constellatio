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
      <Title mb={8} order={3}>Reset link has been sent</Title>
      <BodyText mb={24} styleType="body-01-regular">A link with the information needed to reset your password has been sent to your email address.</BodyText>
      <Button<"button"> type="button" onClick={closeModal} styleType="primary">Got it, close</Button>
    </div>
  );
};

export default ResetPasswordSuccess;
