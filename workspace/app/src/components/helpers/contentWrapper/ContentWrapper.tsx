import { type SerializedStyles } from "@emotion/react";
import { type FunctionComponent } from "react";

import * as styles from "./ContentWrapper.styles";

type Props = {
  readonly children: React.ReactNode;
  readonly shouldUseMarginAutoInsteadOfTransform?: boolean;
  readonly stylesOverrides?: SerializedStyles | Array<SerializedStyles | undefined>;
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
