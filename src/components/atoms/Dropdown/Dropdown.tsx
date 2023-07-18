import { Select, SelectProps } from "@mantine/core";
import React, { FC } from "react";
import { DropdownItem } from "./DropdownItem";
import { dropdownStyles } from "./Dropdown.styles";

type TDropdown = SelectProps;

export const Dropdown: FC<TDropdown> = ({ error, disabled, ...props }) => {
  return (
    <Select
      maxDropdownHeight={270}
      itemComponent={DropdownItem}
      styles={dropdownStyles({ error, disabled })}
      error={error}
      disabled={disabled}
      {...props}
    />
  );
};
