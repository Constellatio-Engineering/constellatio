import { LinkButton, type TLinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { Cross } from "@/components/Icons/Cross";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./SlidingPanelTitle.styles";

interface SlidingPanelTitleProps
{
  readonly actionButton?: TLinkButton;
  readonly closeButtonAction: () => void;
  readonly number?: number;
  readonly title: string;
  readonly variant?: "default" | "rich";
}

const SlidingPanelTitle: FunctionComponent<SlidingPanelTitleProps> = ({
  actionButton,
  closeButtonAction,
  number,
  title,
  variant = "default"
}) =>
{
  return variant === "default" ? (
    <div css={styles.wrapper}>
      <Title order={3}>{title}</Title>
      <span onClick={closeButtonAction}>
        <Cross size={32}/>
      </span>
    </div>
  ) : (
    <div css={styles.wrapper}>
      <div className="header">
        <Title order={3}>{title} <span className="count">({number ?? 0})</span></Title>
        {actionButton && <LinkButton {...actionButton}/>}
      </div>
      <span onClick={closeButtonAction}>
        <Cross size={32}/>
      </span>
    </div>
  );

};

export default SlidingPanelTitle;
