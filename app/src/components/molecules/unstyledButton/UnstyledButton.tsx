import React, { type ComponentProps, type FunctionComponent } from "react";

import * as styles from "./UnstyledButton.styles";

interface Props extends ComponentProps<"button"> 
{
  readonly children: React.ReactNode;
}

export const UnstyledButton: FunctionComponent<Props> = ({
  children,
  ...props
}) =>
{
  return (
    <button css={styles.wrapper} type="button" {...props}>
      {children}
    </button>
  );
};
