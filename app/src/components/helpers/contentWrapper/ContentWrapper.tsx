import { type SerializedStyles } from "@emotion/react";
import React, { type FunctionComponent } from "react";

import * as styles from "./ContentWrapper.styles";

type Props = {
  readonly children: React.ReactNode;
  readonly stylesOverrides?: SerializedStyles;
};

const ContentWrapper: FunctionComponent<Props> = ({ children, stylesOverrides }) =>
{
  return (
    <div css={[styles.wrapper, stylesOverrides]}>
      {children}
    </div>
  );
};

export default ContentWrapper;
