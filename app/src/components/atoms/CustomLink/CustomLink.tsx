import { Anchor, type AnchorProps, type CSSObject, createPolymorphicComponent } from "@mantine/core";
import React, { type FC } from "react";

type TLink = AnchorProps & {
  readonly styleType: "link-primary" | "link-secondary" | "link-primary-ts" | "link-content" | "link-content-title";
  readonly stylesOverwrite?: CSSObject | undefined;
};

const _Link: FC<TLink> = ({
  children,
  stylesOverwrite,
  styleType,
  ...props
}) => 
{
  return (
    <Anchor
      inherit
      sx={(theme) => ({
        ":disabled": {
          color: theme.colors["neutrals-01"][7],
        },
        ":hover": {
          color: theme.colors["neutrals-02"][1],
          textDecoration: "underline",
        },
        color:
          styleType === "link-primary"
            ? theme.colors["neutrals-02"][2]
            : styleType === "link-primary-ts"
              ? theme.colors["transparency-01"][4]
              : styleType === "link-secondary"
                ? theme.colors["neutrals-01"][8]
                : theme.colors["neutrals-02"][1],
        fontFamily:
          styleType === "link-content" || styleType === "link-content-title"
            ? `${theme.headings.fontFamily}, serif}`
            : `${theme.fontFamily}, sans-serif`,
        fontSize:
          styleType === "link-content-title"
            ? theme.fontSizes["spacing-18"]
            : styleType === "link-secondary"
              ? theme.fontSizes["spacing-14"]
              : theme.fontSizes["spacing-16"],
        fontWeight: styleType === "link-content" || styleType === "link-content-title" ? 400 : 500,
        lineHeight:
          styleType === "link-content-title"
            ? theme.spacing["spacing-28"]
            : styleType === "link-secondary"
              ? theme.spacing["spacing-20"]
              : theme.spacing["spacing-24"],
        textDecoration: styleType === "link-content" || styleType === "link-content-title" ? "none" : "underline",
        transition: "color 0.3s ease",
        ...stylesOverwrite,
      })}
      {...props}>
      {children}
    </Anchor>
  );
};

export const CustomLink = createPolymorphicComponent<"a", TLink>(_Link);
