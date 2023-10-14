import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ResetPasswordSuccess.styles";

interface Props
{
  readonly closeModal: () => void;
}

const ResetPasswordSuccess: FunctionComponent<Props> = ({ closeModal }) =>
{
  return (
    <div css={styles.wrapper}>
      <Title mb={16} order={3}>Reset link has been sent</Title>
      <p>A link with the information needed to reset your password has been sent to your email address.</p>
      <button type="button" onClick={closeModal}>Got it, close</button>
    </div>
  );
};

export default ResetPasswordSuccess;
