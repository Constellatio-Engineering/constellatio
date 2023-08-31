import React, { type FunctionComponent } from "react";

import * as styles from "./CaseBlock.styles";

export interface ICaseBlockProps
{
  readonly title: string;
}

const CaseBlock: FunctionComponent<ICaseBlockProps> = ({ title }) => 
{
  return (
    <div css={styles.wrapper}>
      CaseBlock {title}
    </div>
  );
};

export default CaseBlock;
