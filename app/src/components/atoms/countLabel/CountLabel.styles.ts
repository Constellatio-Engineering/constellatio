import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";
import { ICountLabel } from "./CountLabel";

export const wrapper = ({
  theme,
  variant,
}: {
  theme: MantineTheme;
  variant: ICountLabel["variant"];
}) => {
  const color =
    variant === "success" || variant === "error"
      ? theme?.colors["neutrals-01"][0]
      : theme?.colors["neutrals-02"][1];
  const bg =
    variant === "success"
      ? theme?.colors["support-success"][3]
      : variant === "error"
      ? theme?.colors["support-error"][3]
      : variant === "cases"
      ? theme?.colors["support-notice"][2]
      : variant === "dictionary"
      ? theme?.colors["cc-dictionary"][2]
      : variant === "neutral" && theme?.colors["neutrals-01"][2];

  return css`
    padding: 4px 8px;
    background-color: ${bg};
    color: ${color};
    border-radius: 14px;
    display: inline-block;
  `;
};
