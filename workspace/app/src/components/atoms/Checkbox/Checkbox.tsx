import { Checkbox as MantineCheckBox, type CheckboxProps as MantineCheckBoxProps, type CSSObject } from "@mantine/core";
import { type FC } from "react";

import { checkboxStyles } from "./Checkbox.styles";

export type CheckboxProps = MantineCheckBoxProps & {
  readonly checkboxBodyOverride?: CSSObject;
  readonly checkboxLabelOverride?: CSSObject;
  readonly fullWidth?: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({
  checkboxBodyOverride,
  checkboxLabelOverride,
  disabled,
  error,
  fullWidth,
  ...props
}) => 
{
  return (
    <MantineCheckBox
      styles={checkboxStyles({
        checkboxBodyOverride, checkboxLabelOverride, disabled, error, fullWidth 
      })}
      error={error}
      disabled={disabled}
      {...props}
    />
  );
};
