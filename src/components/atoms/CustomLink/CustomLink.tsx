import { Anchor, AnchorProps, CSSObject, createPolymorphicComponent } from "@mantine/core";
import React, { FC, forwardRef } from "react";

type TLink = AnchorProps & {
  styleType: "link-primary" | "link-secondary" | "link-primary-ts" | "link-content" | "link-content-title";
  stylesOverwrite?: CSSObject | undefined;
};

const _Link: FC<TLink> = ({ styleType, stylesOverwrite, children, ...props }) => {
  return (
    <Anchor
      inherit
      sx={(theme) => ({
        fontWeight: styleType === "link-content" || styleType === "link-content-title" ? 400 : 500,
        fontFamily:
          styleType === "link-content" || styleType === "link-content-title"
            ? "Libre Baskerville, serif"
            : "Karla, sans-serif",
        lineHeight:
          styleType === "link-content-title"
            ? theme.spacing["spacing-28"]
            : styleType === "link-secondary"
            ? theme.spacing["spacing-20"]
            : theme.spacing["spacing-24"],
        fontSize:
          styleType === "link-content-title"
            ? theme.fontSizes["spacing-18"]
            : styleType === "link-secondary"
            ? theme.fontSizes["spacing-14"]
            : theme.fontSizes["spacing-16"],
        textDecoration: styleType === "link-content" || styleType === "link-content-title" ? "none" : "underline",
        color:
          styleType === "link-primary"
            ? theme.colors["neutrals-02"][2]
            : styleType === "link-primary-ts"
            ? theme.colors["transparency-01"][4]
            : styleType === "link-secondary"
            ? theme.colors["neutrals-01"][8]
            : theme.colors["neutrals-02"][1],
        transition: "color 0.3s ease",
        ":hover": {
          color: theme.colors["neutrals-02"][1],
          textDecoration: "underline",
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
