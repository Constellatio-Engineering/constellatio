import { Group, Avatar, Text, MantineTheme, CSSObject } from "@mantine/core";
import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

type TDropdownItem = ComponentPropsWithoutRef<"div"> & {
  icon: ReactNode;
  label: string;
};

const DropdownItemComponent = forwardRef<HTMLDivElement, TDropdownItem>(({ icon, label, ...props }, ref) => {
  const textStyles = (theme: MantineTheme): CSSObject => ({
    fontSize: theme.fontSizes['spacing-16'],
    lineHeight: theme.fontSizes['spacing-24'],
    fontWeight: 500,
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
