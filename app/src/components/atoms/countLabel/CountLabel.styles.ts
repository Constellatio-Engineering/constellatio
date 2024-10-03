import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

import { type ICountLabel } from "./CountLabel";

export const wrapper = ({ variant }: {
  variant: ICountLabel["variant"];
}) => 
{
  const color =
    variant === "success" || variant === "error"
      ? colooors["neutrals-01"][0]
      : colooors["neutrals-02"][1];
  const bg =
    variant === "success"
      ? colooors["support-success"][3]
      : variant === "error"
        ? colooors["support-error"][3]
        : variant === "cases"
          ? colooors["cc-cases"][2]
          : variant === "dictionary"
            ? colooors["cc-dictionary"][2]
            : variant === "neutral" && colooors["neutrals-01"][2];

  return css`
    padding: 4px 8px;
    background-color: ${bg};
    color: ${color};
    border-radius: 14px;
    display: inline-block;
  `;
};
