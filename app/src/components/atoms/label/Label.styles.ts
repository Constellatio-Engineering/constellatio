import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = ({
  theme,
  variant
}: { theme: MantineTheme; variant: "dictionary" | "case" | "forum" | "neutral" }): SerializedStyles => css`
  
  background-color: ${variant === "dictionary" ? colooors["cc-dictionary"][2] : 
    variant === "case" ? colooors["cc-cases"][2] : 
      variant === "forum" ? colooors["cc-forum"][2] : colooors["neutrals-01"][2]};

        padding:4px 8px;
        border-radius: 1000px;
        display: inline-block;
        text-transform: uppercase;
  `;
