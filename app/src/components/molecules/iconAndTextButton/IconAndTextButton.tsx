import { UnstyledButton } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./IconAndTextButton.styles";

type Props = {
  readonly icon: React.ReactNode;
  readonly onClick: () => void;
  readonly text: string;
};

const IconAndTextButton: FunctionComponent<Props> = ({ icon, onClick, text }) =>
{
  return (
    <UnstyledButton type={"button"} css={styles.actionButton} onClick={onClick}>
      {icon}
      <span>{text}</span>
    </UnstyledButton>
  );
};

export default IconAndTextButton;
