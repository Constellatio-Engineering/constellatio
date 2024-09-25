import { type SerializedStyles } from "@emotion/react";
import { useMantineTheme } from "@mantine/styles";
import {
  type ButtonHTMLAttributes,
  type ForwardRefRenderFunction,
  type ReactNode,
  forwardRef,
} from "react";

import * as styles from "./IconButton.styles";

export interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>
{
  readonly dontUseDisabledStyles?: boolean;
  readonly icon: ReactNode;
  readonly size: "big" | "medium";
  readonly stylesOverrides?: SerializedStyles;
}

const _IconButton: ForwardRefRenderFunction<
HTMLButtonElement,
IIconButtonProps
> = ({
  dontUseDisabledStyles = false,
  icon,
  size,
  stylesOverrides,
  ...props
}, ref) => 
{
  const theme = useMantineTheme();

  return (
    <button
      ref={ref}
      type="button"
      css={[
        styles.wrapper({ size, theme }),
        !dontUseDisabledStyles && styles.disabledStyles,
        stylesOverrides
      ]}
      {...props}>
      {icon && <span css={styles.icon({ size })}>{icon}</span>}
    </button>
  );
};

const IconButton = forwardRef(_IconButton);

export default IconButton;
