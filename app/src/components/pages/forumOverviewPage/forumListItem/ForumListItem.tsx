import React, { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./ForumListItem.styles";

type Props = {
  readonly children: ReactNode;
};

const ForumListItem: FunctionComponent<Props> = ({ children }) =>
{
  return (
    <div css={styles.wrapper}>
      {children}
    </div>
  );
};

export default ForumListItem;
