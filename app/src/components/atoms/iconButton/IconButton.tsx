import { useMantineTheme } from "@mantine/styles";
import {
  type ButtonHTMLAttributes,
  type ForwardRefRenderFunction,
  type ReactNode,
  forwardRef,
} from "react";

import * as styles from "./IconButton.styles";

export interface IIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: ReactNode;
  readonly size: "big" | "medium";
}

const _IconButton: ForwardRefRenderFunction<
  HTMLButtonElement,
  IIconButtonProps
> = ({ icon, size, ...props }, ref) => {
  const theme = useMantineTheme();

  return (
    <button
      ref={ref}
      type="button"
      css={styles.wrapper({ size, theme })}
      {...props}
    >
      {icon && <span css={styles.icon({ size })}>{icon}</span>}
    </button>
  );
};

const IconButton = forwardRef(_IconButton);

export default IconButton;
