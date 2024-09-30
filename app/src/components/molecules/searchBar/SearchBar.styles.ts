import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type InputStylesNames, type MantineTheme, type Styles, } from "@mantine/core";

type InputStylesProps = Styles<InputStylesNames, UnknownMantineStylesParams>;

export const inputStyles = (theme: MantineTheme) =>
{
  const styles: InputStylesProps = () => ({
    icon: {
      color: colooors["neutrals-01"][7],
      left: "62px",
      width: "24px",
    },

    input: {  
      "&::placeholder": {
        color: colooors["neutrals-01"][7],
      },

      backgroundColor: colooors["neutrals-01"][0],
      border: "none",
      borderRadius: "0px",
      fontFamily: `${theme.headings.fontFamily}`,
      fontSize: "24px",
      fontWeight: 400,
      height: "72px",
      lineHeight: "36px",
      padding: "0 0 0 40px !important"
    },

    rightSection: {
      ".closeBtn": {
        "&:hover": {
          color: colooors["neutrals-02"][1],
        },

        alignItems: "center",
        borderLeft: `1px solid ${colooors["neutrals-01"][3]}`,
        color: colooors["neutrals-01"][9],
        cursor: "pointer",
        display: "flex",
        padding: "20px",
        transition: "color 0.3s ease-in"
      },
      
      backgroundColor: colooors["neutrals-01"][0],
      gap: "32px",
      paddingLeft: "20px",
      width: "auto"
    },

    wrapper: {
      borderBottom: `1px solid ${colooors["neutrals-01"][3]}`,
      paddingLeft: "60px",

    },
  });

  return styles;
};

export const searchBtns = css`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
gap: 50px;
`;
