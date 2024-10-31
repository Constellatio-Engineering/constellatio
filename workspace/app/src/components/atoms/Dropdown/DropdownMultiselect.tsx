import { DropdownItem } from "@/components/atoms/Dropdown/DropdownItem";
import { dropdownMultiselectStyles } from "@/components/atoms/Dropdown/DropdownMultiselect.styles";

import { MultiSelect, type MultiSelectProps, Skeleton } from "@mantine/core";
import { type FC } from "react";

type DropdownProps = MultiSelectProps & {
  readonly isLoading?: boolean;
};

export const DropdownMultiselect: FC<DropdownProps> = ({
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
    <MultiSelect
      error={error}
      itemComponent={DropdownItem}
      styles={dropdownMultiselectStyles({ disabled, error })}
      disabled={disabled}
      maxDropdownHeight={270}
      {...props}
    />
  );
};
