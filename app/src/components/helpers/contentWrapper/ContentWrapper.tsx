import { type SerializedStyles } from "@emotion/react";
import React, { type FunctionComponent } from "react";

import * as styles from "./ContentWrapper.styles";

type Props = {
  readonly children: React.ReactNode;
  readonly shouldUseMarginAutoInsteadOfTransform?: boolean;
  readonly stylesOverrides?: SerializedStyles;
};

const ContentWrapper: FunctionComponent<Props> = ({ children, shouldUseMarginAutoInsteadOfTransform = false, stylesOverrides }) =>
{
  return (
    <div css={[styles.wrapper, shouldUseMarginAutoInsteadOfTransform ? styles.marginAuto : styles.positionLeftAndTransform, stylesOverrides]}>
      {children}
    </div>
  );
};

export default ContentWrapper;
