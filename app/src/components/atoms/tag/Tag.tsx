import React, { type FunctionComponent, type PropsWithChildren } from "react";

import * as styles from "./Tag.styles";
import { BodyText } from "../BodyText/BodyText";

export interface ITag 
{
  readonly title?: string;
}

const Tag: FunctionComponent<ITag & PropsWithChildren> = ({ children, title }) => (
  <span css={styles.tag}>
    <BodyText styleType="body-02-medium">{title ?? children}</BodyText>
  </span>
);

export default Tag;
