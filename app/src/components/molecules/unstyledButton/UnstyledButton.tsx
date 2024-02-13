import React, { type ComponentProps, forwardRef } from "react";

import * as styles from "./UnstyledButton.styles";

interface Props extends ComponentProps<"button">
{
  readonly children: React.ReactNode;
}

export const UnstyledButton = forwardRef<HTMLButtonElement, Props>(({
  children,
  ...props
}, ref) =>
{
  return (
    <button
      ref={ref}
      css={styles.wrapper}
      type="button"
      {...props}>
      {children}
    </button>
  );
});
