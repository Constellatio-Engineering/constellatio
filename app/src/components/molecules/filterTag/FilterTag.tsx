import React, { type FunctionComponent, type PropsWithChildren } from "react";

import * as styles from "./FilterTag.style";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Cross } from "../../Icons/Cross";

export interface IFilterTag extends PropsWithChildren
{
  readonly simple?: boolean;
  readonly title?: string;
}

const FilterTag: FunctionComponent<IFilterTag> = ({
  children,
  ...props
}) => (
  <div css={styles.filterTag}>
    <BodyText styleType="body-01-medium">{props?.title ?? children} {props?.simple ? "" : <Cross/>}</BodyText>
  </div>
);

export default FilterTag;
