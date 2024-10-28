import { Anchor, type AnchorProps, createPolymorphicComponent, type CSSObject } from "@mantine/core";
import React, { type FC } from "react";

import { customLinkStyles } from "./customLink.styles";

export type TLink = AnchorProps & {
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
      sx={customLinkStyles({ styleType, stylesOverwrite })}
      {...props}>
      {children}
    </Anchor>
  );
};

export const CustomLink = createPolymorphicComponent<"a", TLink>(_Link);
