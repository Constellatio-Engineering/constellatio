import { ArrowSolidRight } from "@/components/Icons/arrow-solid-right";

import React, { type FunctionComponent } from "react";

import * as styles from "./ContentMenuItem.styles";
import { BodyText } from "../BodyText/BodyText";

export interface IContentMenuItemProps
{
  readonly itemNumber?: number;
  readonly level?: number;
  readonly opened?: boolean;
  readonly title: string;
  readonly totalItems?: number;
}

const ContentMenuItem: FunctionComponent<IContentMenuItemProps> = ({
  itemNumber,
  level,
  opened,
  title,
  totalItems
}) => 
{
  return (
    <div css={styles.wrapper({ opened })}>
      <div css={styles.text({ opened })}>
        {opened ? <ArrowSolidRight/> : <ArrowSolidRight/>}
        <span css={styles.title}>
          <BodyText component="p" styleType="body-01-medium">{title}</BodyText>
        </span>
      </div>
      {level && level === 1 && (
        <div css={styles.counter}>
          <BodyText styleType="body-01-medium">{itemNumber}/{totalItems}</BodyText>
        </div>
      )} 
    </div>
  );
};

export default ContentMenuItem;
