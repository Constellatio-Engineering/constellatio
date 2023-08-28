import React, { FunctionComponent, PropsWithChildren } from "react";

import * as styles from "./Tag.styles";
import { BodyText } from "../BodyText/BodyText";

export interface ITag {
  title?: string
}

const Tag: FunctionComponent<ITag & PropsWithChildren> = ({ title , children }) => (
  <span css={styles.tag}>
    <BodyText styleType={"body-02-medium"}>{title ?? children}</BodyText>
  </span>
);

export default Tag;
