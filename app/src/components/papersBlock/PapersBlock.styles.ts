import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type DrawerStylesNames } from "@mantine/core";
import { type Styles, type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
        background: ${theme.colors["neutrals-01"][0]};
        border-radius:12px;
        margin-bottom: 40px;
        border:1px solid ${theme.colors["neutrals-01"][2]};
        .test{
            background:red;
        }
`;
export const papersBlockHead = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-02"][0]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    .count{
        color: ${theme.colors["neutrals-01"][7]};
    }
    h4{
      color: ${theme.colors["neutrals-02"][1]};
    }
        padding:24px;
    border-bottom: 1px solid ${theme.colors["neutrals-01"][2]};
`;
export const papersBlockTable = css`
padding:24px;
`;

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () => 
{
  const styles: DrawerStylesProps = (theme: MantineTheme) => ({
    body: {
      ".call-to-action": {
        alignItems: "flex-start",
        background: theme.colors["neutrals-01"][0],
        button: {
          flex: 1
        },
        display: "flex",
        gap: "12px",
        justifyContent: "space-between",
        padding: "32px",
        textAlign: "center",
        width: "100%"
      },
      ".form": {
        input: {
          marginBottom: "24px"
        },
        padding: "0 32px",
        width: "100%"
      },
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 101px)",
      justifyContent: "space-between",
      marginTop: "24px",
      padding: "24px 0 0 0",
      width: "100%",
    },
    content: {
      backgroundColor: theme.colors["neutrals-01"][1],
    },
    header: {
      padding: 0,
    },
    title: {
      width: "100%",
    }
  });
  return styles;
};
