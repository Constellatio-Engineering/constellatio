import { Cross } from "@/components/Icons/Cross";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./SlidingPanelTitle.styles";

interface SlidingPanelTitleProps
{
  readonly closeButtonAction: () => void;
  readonly title: string;
}

const SlidingPanelTitle: FunctionComponent<SlidingPanelTitleProps> = ({ closeButtonAction, title }) => 
{
  return (
    <div css={styles.wrapper}>
      <Title css={styles.title} order={3}>{title}</Title>
      <UnstyledButton onClick={closeButtonAction} styles={styles.closeButtonWrapper}>
        <Cross size={32}/>
      </UnstyledButton>
    </div>
  );
};

export default SlidingPanelTitle;
