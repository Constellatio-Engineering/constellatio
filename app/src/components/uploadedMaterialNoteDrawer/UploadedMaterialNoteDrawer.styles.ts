import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type DrawerStylesNames } from "@mantine/core";
import { type MantineTheme, type Styles } from "@mantine/styles";

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () => 
{
  const styles: DrawerStylesProps = (theme: MantineTheme) => ({
    body: {
      padding: "0px"
    },
    content: {
      background: theme.colors["neutrals-01"][1],
    },
    header: {
      padding: "0px",
    },
    title: {
      width: "100%",
    }
  });
  return styles;
};

export const MaterialNoteRichText = css`
  margin: 24px 32px;
`;

export const MaterialNotesCallToAction = (theme: MantineTheme) => css`
position: absolute;
bottom: 0;
left: 0;
width: 100%;
display:flex;
justify-content: center;
align-items: center;
padding:32px;
gap:12px;
background: ${theme.colors["neutrals-01"][0]};
border-top: 1px solid ${theme.colors["neutrals-01"][3]};
button{
  flex:1;
}
`;
