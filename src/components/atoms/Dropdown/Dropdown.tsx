import { Select, type SelectProps } from "@mantine/core";
import React, { type FC } from "react";

import { dropdownStyles } from "./Dropdown.styles";
import { DropdownItem } from "./DropdownItem";

type TDropdown = SelectProps;

export const Dropdown: FC<TDropdown> = ({
  disabled,
  error,
  ...props
}) => 
{
  return (
    <Select
      maxDropdownHeight={270}
      itemComponent={DropdownItem}
      styles={dropdownStyles({ disabled, error })}
      error={error}
      disabled={disabled}
      {...props}
    />
  );
};
