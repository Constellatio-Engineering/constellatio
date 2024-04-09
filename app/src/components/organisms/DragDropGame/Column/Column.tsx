import React, { type PropsWithChildren, type FunctionComponent } from "react";

type Props = PropsWithChildren;

import * as styles from "./Column.styles";

export const Column: FunctionComponent<Props> = ({ children }) =>
{
  return (
    <styles.Column>
      {children}
    </styles.Column>
  );
};
