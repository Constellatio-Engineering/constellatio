import React, { type FunctionComponent } from "react";

import * as styles from "./ForumListItem.styles";

type Props = {
  readonly children: React.ReactNode;
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
