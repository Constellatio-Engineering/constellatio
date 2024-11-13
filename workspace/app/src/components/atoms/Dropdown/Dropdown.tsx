import { Select, type SelectProps, Skeleton } from "@mantine/core";
import { type FC } from "react";

import { dropdownStyles } from "./Dropdown.styles";
import { DropdownItem } from "./DropdownItem";

export type DropdownProps = SelectProps & {
  readonly isLoading?: boolean;
};

export const Dropdown: FC<DropdownProps> = ({
  disabled,
  error,
  isLoading,
  ...props
}) => 
{
  if(isLoading)
  {
    return (
      <div>
        <Skeleton width={160} height={16} mb={8}/>
        <Skeleton width={"100%"} height={30} mb={4}/>
      </div>
    );
  }

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
