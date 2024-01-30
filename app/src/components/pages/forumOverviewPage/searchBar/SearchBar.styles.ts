import { type UnknownMantineStylesParams } from "@/utils/types";

import {
  type InputStylesNames,
  type MantineTheme,
  type Styles,
} from "@mantine/core";

type InputStylesProps = Styles<InputStylesNames, UnknownMantineStylesParams>;

export const inputStyles = () =>
{
  const styles: InputStylesProps = (theme: MantineTheme) => ({
    icon: {
      color: theme.colors["neutrals-01"][7],
      left: "62px",
      width: "24px",
    },
    input: {
      "&::placeholder": {
        color: theme.colors["neutrals-01"][7],
      },
      backgroundColor: theme.colors["neutrals-01"][0],
      border: "none",
      borderRadius: "0px",
      fontFamily: `${theme.headings.fontFamily}`,
      fontSize: "24px",
      fontWeight: 400,
      height: "72px",
      lineHeight: "36px",
      padding: "0 0 0 100px !important"
    },
    wrapper: {
      borderBottom: `1px solid ${theme.colors["neutrals-01"][4]}`,
    },
  });

  return styles;
};

