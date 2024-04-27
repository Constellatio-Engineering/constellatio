import { type SerializedStyles } from "@emotion/react";
import React, { type ComponentProps, forwardRef } from "react";

import * as styles from "./UnstyledButton.styles";

interface Props extends ComponentProps<"button">
{
  readonly children: React.ReactNode;
  readonly styles?: SerializedStyles;
}

export const UnstyledButton = forwardRef<HTMLButtonElement, Props>(({
  children,
  styles: additionalStyles,
  ...props
}, ref) =>
{
  return (
    <button
      ref={ref}
      css={[styles.wrapper, additionalStyles]}
      type="button"
      {...props}>
      {children}
    </button>
  );
});
