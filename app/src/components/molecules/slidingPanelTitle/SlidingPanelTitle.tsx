import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { Cross } from "@/components/Icons/Cross";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./SlidingPanelTitle.styles";

interface SlidingPanelTitleProps
{
  readonly closeButtonAction: () => void;
  readonly link?: {
    readonly text: string;
  };
  readonly number?: number;
  readonly title: string;
  readonly variant?: "default" | "rich";
}

const SlidingPanelTitle: FunctionComponent<SlidingPanelTitleProps> = ({
  closeButtonAction,
  link,
  number,
  title,
  variant = "default"
}) =>
{
  return variant === "default" ? (
    <div css={styles.wrapper}>
      {title && <Title order={3}>{title}</Title>}
      <span onClick={closeButtonAction}>
        <Cross size={32}/>
      </span>
    </div>
  ) : (
    <div css={styles.wrapper}>
      {title && (
        <div className="header">
          <Title order={3}>{title} <span className="count">({number ?? 0})</span></Title>
          {link?.text && <LinkButton title={link?.text} icon={<DownloadIcon/>}/>}
        </div>
      )}
      <span onClick={closeButtonAction}>
        <Cross size={32}/>
      </span>
    </div>
  );

};

export default SlidingPanelTitle;
