import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type DrawerStylesNames } from "@mantine/core";
import { type Styles } from "@mantine/styles";

export const wrapper = () => css`
        background: ${colooors["neutrals-01"][0]};
        border-radius:12px;
        margin-bottom: 40px;
        border:1px solid ${colooors["neutrals-01"][2]};
        .test{
            background:red;
        }
        box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
`;
export const papersBlockHead = () => css`
    color: ${colooors["neutrals-02"][0]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    .count{
        color: ${colooors["neutrals-01"][7]};
    }
    h4{
      color: ${colooors["neutrals-02"][1]};
    }
        padding:24px;
    border-bottom: 1px solid ${colooors["neutrals-01"][2]};
`;
export const papersBlockTable = css`
padding:24px;
`;

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () => 
{
  const styles: DrawerStylesProps = () => ({
    body: {
      ".call-to-action": {
        alignItems: "flex-start",
        background: colooors["neutrals-01"][0],
        button: {
          flex: 1
        },
        display: "flex",
        gap: "12px",
        justifyContent: "space-between",
        padding: "24px",
        textAlign: "center",
        width: "100%"
      },
      ".form": {
        input: {
          marginBottom: "24px"
        },
        width: "100%"
      },
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 77px)",
      justifyContent: "space-between",
      // marginTop: "24px",
      padding: "24px 0 0 0",
      width: "100%",
    },
    content: {
      backgroundColor: colooors["neutrals-01"][1],
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
