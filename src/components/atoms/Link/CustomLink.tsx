import { Anchor, AnchorProps, CSSObject, createPolymorphicComponent } from "@mantine/core";
import React, { FC, forwardRef } from "react";

type TLink = AnchorProps & {
  styleType: "primary-01" | "secondary-02";
  stylesOverwrite?: CSSObject | undefined;
};

const _Link: FC<TLink> = ({ styleType, stylesOverwrite, children, ...props }) => {
  return (
    <Anchor
      inherit
      sx={(theme) => ({
        fontWeight: 500,
        lineHeight: styleType === "primary-01" ? theme.spacing["spacing-24"] : theme.spacing["spacing-20"],
        fontSize: styleType === "primary-01" ? theme.fontSizes["spacing-16"] : theme.fontSizes["spacing-14"],
        textDecoration: "underline",
        color: styleType === "primary-01" ? theme.colors["neutrals-02"][2] : theme.colors["neutrals-01"][9],
        transition: "color 0.3s ease",
        ":hover": {
          color: styleType === "primary-01" ? theme.colors["brand-01"][4] : theme.colors["neutrals-02"][2],
        },
        ":disabled": {
          color: theme.colors["neutrals-01"][7],
        },
        ...stylesOverwrite,
      })}
      {...props}
    >
      {children}
    </Anchor>
  );
};

export const CustomLink = createPolymorphicComponent<"a", TLink>(_Link);
