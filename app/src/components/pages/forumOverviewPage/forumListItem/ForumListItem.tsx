import React, { forwardRef, type PropsWithChildren, type ReactNode } from "react";

import * as styles from "./ForumListItem.styles";

type Props = {
  readonly children: ReactNode;
};

const ForumListItem = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(({
  children
}, ref) =>
{
  return (
    <div css={styles.wrapper} ref={ref}>
      {children}
    </div>
  );
});

export default ForumListItem;
