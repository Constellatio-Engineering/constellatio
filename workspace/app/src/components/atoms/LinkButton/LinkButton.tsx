import { Group } from "@mantine/core";
import { type ButtonHTMLAttributes, type FC, type ReactNode } from "react";

import { SButton } from "./LinkButton.styles";

export type TLinkButton = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> & {
  readonly icon: ReactNode;
  readonly size?: "big" | "medium";
  readonly title: ReactNode;
};

export const LinkButton: FC<TLinkButton> = ({
  icon,
  size = "big",
  title,
  ...props
}) => 
{
  return (
    <SButton {...props} size={size}>
      <Group spacing="spacing-8">
        {icon}
        {title}
      </Group>
    </SButton>
  );
};
