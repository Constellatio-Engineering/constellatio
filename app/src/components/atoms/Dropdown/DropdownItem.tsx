import { type MantineCssObjectStyles } from "@/utils/types";

import {
  Group, Text
} from "@mantine/core";
import React, { type ComponentPropsWithoutRef, type ReactNode, forwardRef } from "react";

type TDropdownItem = ComponentPropsWithoutRef<"div"> & {
  readonly icon: ReactNode;
  readonly label: string;
};

const DropdownItemComponent = forwardRef<HTMLDivElement, TDropdownItem>(({
  icon,
  label,
  ...props
}, ref) => 
{
  const textStyles: MantineCssObjectStyles = theme => ({
    fontSize: theme.fontSizes["spacing-16"],
    fontWeight: 500,
    lineHeight: theme.fontSizes["spacing-20"],
  });

  return (
    <div ref={ref} {...props}>
      <Group noWrap>
        {icon && icon}
        <div>{label && <Text truncate sx={textStyles}>{label}</Text>}</div>
      </Group>
    </div>
  );
});

DropdownItemComponent.displayName = "DropdownItem";

export const DropdownItem = DropdownItemComponent;
