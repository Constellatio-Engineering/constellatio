import React, { type FunctionComponent, type PropsWithChildren } from "react";

import * as styles from "./FilterTag.style";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Cross } from "../../Icons/Cross";

interface IProps extends PropsWithChildren
{
  readonly active?: boolean;
  // applied?: boolean;
  readonly simple?: boolean;
  readonly title: string;
}

const FilterTag: FunctionComponent<IProps> = ({
  children,
  ...props
}) => (
  <div css={styles.tag}>
    <BodyText styleType="body-01-medium">{props?.title ?? children} {props?.simple ? "" : <Cross/>}</BodyText>
  </div>
);

export default FilterTag;
