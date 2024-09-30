import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { type Styles, type TextInputStylesNames } from "@mantine/core";

type FillGapInputStylesProps =
{
  index?: number;
  status: "default" | "success" | "error";
  width?: number;
};

type FillGapInputStyles = Styles<TextInputStylesNames, UnknownMantineStylesParams>;

export const fillGapInputStyles = ({ index, status, width = 145 }: FillGapInputStylesProps): FillGapInputStyles =>
{
  const styles: FillGapInputStyles = theme => ({
    input: {
      "&:focus, &:focus-within": {
        borderColor: "initial",
      },
      "&[data-disabled], :disabled": {
        backgroundColor: "transparent",
        color:
          status === "default"
            ? colooors["neutrals-02"][1]
            : status === "success"
              ? colooors["support-success"][4]
              : colooors["support-error"][3],
        opacity: 1,
      },
      alignItems: "flex-start",
      backgroundColor: "transparent",
      border: "none",
      borderBottom: `1px solid ${
        status === "default"
          ? colooors["neutrals-01"][8]
          : status === "success"
            ? colooors["support-success"][4]
            : colooors["support-error"][3]
      }`,
      borderRadius: 0,
      color:
        status === "default"
          ? colooors["neutrals-02"][1]
          : status === "success"
            ? colooors["support-success"][4]
            : colooors["support-error"][3],
      display: "flex",
      fontSize: theme.fontSizes["spacing-16"],
      fontWeight: 500,
      gap: spaciiing["spacing-4"],
      height: "auto",
      lineHeight: "24px",
      minHeight: "auto",
      padding: 0,
      paddingBottom: spaciiing["spacing-4"],
    },
    rightSection: {
      color: status === "success" ? colooors["support-success"][4] : colooors["support-error"][3],
      height: 16,
      top: "5px",
      width: 16,
    },
    root: {
      display: "inline-block",
      marginTop: spaciiing["spacing-2"],
      maxWidth: width + "px",
      paddingBottom: status === "error" ? spaciiing["spacing-4"] : "0",
      paddingLeft: spaciiing["spacing-2"],
      paddingRight: spaciiing["spacing-2"],
      position: "relative",
    },
    wrapper: {
      "&::before": {
        alignItems: "center",
        border: `1px solid ${colooors["neutrals-02"][1]}`,
        borderRadius: "50%",
        content: index ? `"${index}"` : "''",
        display: status === "default" ? "none" : "flex",
        flexDirection: "column",
        fontSize: "14px",

        fontWeight: 700,
        height: "18px",
        justifyContent: "center",
        lineHeight: "20px",
        minWidth: "18px",
        textAlign: "center",
        textTransform: "uppercase",
        width: "18px",
      },
      "&:has(input:disabled) .mantine-Input-rightSection": {
        display: "flex",
      },
      alignItems: "center",

      display: "flex",

      gap: "8px",
    },
  });
  return styles;
};
