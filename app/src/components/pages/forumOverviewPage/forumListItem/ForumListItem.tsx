import type { SerializedStyles } from "@emotion/react";
import React, { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./ForumListItem.styles";

type Props = {
  readonly children: ReactNode;
  readonly stylesOverrides?: SerializedStyles;
};

const ForumListItem: FunctionComponent<Props> = ({ children, stylesOverrides }) =>
{
  return (
    <div css={[styles.wrapper, stylesOverrides]}>
      {children}
    </div>
  );
};

export default ForumListItem;
