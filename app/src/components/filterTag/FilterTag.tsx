import React, { FunctionComponent,PropsWithChildren } from "react";

import * as styles from "./FilterTag.style";
import { Cross } from "../Icons/Cross";
import { BodyText } from "../atoms/BodyText/BodyText";

interface IProps extends PropsWithChildren
{
// applied?: boolean;
simple?: boolean;
active?: boolean;
title:string
}

const FilterTag: FunctionComponent<IProps> = ({ children,...props }) => (
  <div css={styles.tag}>
    <BodyText styleType={"body-01-medium"}>{props.title ?? children} {props.simple?"":<Cross/>}</BodyText>
  </div>
);

export default FilterTag;
