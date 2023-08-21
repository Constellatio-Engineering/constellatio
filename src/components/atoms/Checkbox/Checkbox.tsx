import React, { FC } from "react";
import { CSSObject, CheckboxProps, Checkbox as MantineCheckBox } from "@mantine/core";
import { checkboxStyles } from "./Checkbox.styles";

type TCheckbox = CheckboxProps & {
  checkboxLabelOverride?: CSSObject;
  checkboxBodyOverride?: CSSObject;
  fullWidth?: boolean;
};

export const Checkbox: FC<TCheckbox> = ({
  fullWidth,
  error,
  disabled,
  checkboxLabelOverride,
  checkboxBodyOverride,
  ...props
}) => {
  return (
    <MantineCheckBox
      styles={checkboxStyles({ error, disabled, checkboxLabelOverride, checkboxBodyOverride, fullWidth })}
      error={error}
      disabled={disabled}
      {...props}
    />
  );
};
