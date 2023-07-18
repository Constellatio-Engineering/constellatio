import { Group } from "@mantine/core";
import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { SButton } from "./LinkButton.styles";

type TLinkButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "big" | "medium";
  icon: ReactNode;
  title: ReactNode;
};

export const LinkButton: FC<TLinkButton> = ({ icon, title, size = "big", ...props }) => {
  return (
    <SButton {...props} size={size}>
      <Group spacing={"spacing-8"}>
        {icon}
        {title}
      </Group>
    </SButton>
  );
};
