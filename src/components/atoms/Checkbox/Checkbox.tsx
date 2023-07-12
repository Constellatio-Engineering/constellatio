import React, { FC } from "react";
import { CheckboxProps, Checkbox as MantineCheckBox } from "@mantine/core";
import { checkboxStyles } from "./Checkbox.styles";

type TCheckbox = CheckboxProps;

export const Checkbox: FC<TCheckbox> = ({ error, disabled, ...props }) => {
  return <MantineCheckBox styles={checkboxStyles({ error, disabled })} error={error} disabled={disabled} {...props} />;
};
