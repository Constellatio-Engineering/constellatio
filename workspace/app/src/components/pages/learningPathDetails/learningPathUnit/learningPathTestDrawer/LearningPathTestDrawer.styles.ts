import { colooors } from "@/constants/styles/colors";
import type { UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type Styles, type DrawerStylesNames } from "@mantine/core";

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () =>
{
  const styles: DrawerStylesProps = () => ({
    body: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 77px)",
      justifyContent: "space-between",
      padding: "24px 0 0 0",
      width: "100%",
    },
    content: {
      backgroundColor: colooors["neutrals-01"][1],
      transform: "none !important",
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

export const contentWrapper = css`
  width: 100%;
  padding: 40px 32px 0;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  position: relative;
`;

export const progressBarWrapper = css`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 7px;
  padding: 12px 20px 0 0;
`;

export const progressBarItem = (isCompleted: boolean, gamesCount: number) => css`
  height: 8px;
  width: ${100 / gamesCount}%;
  background-color: ${isCompleted ? "#5B74C7" : "#dadada"};
  border-radius: 100px;
  :first-of-type {
    border-left: none;
  }
  :last-of-type {
    border-right: none;
  }
`;

export const richTextWrapper = css`
  width: 100%;
`;

export const gameWrapper = css`
  margin: 36px 0;
`;

export const wrapper = css`
  background-color: #EEF8F2;
  border: 1px solid #008D39;
  margin-bottom: 60px;
  color: #008D39;
  padding: 24px;
  border-radius: 12px;
  h1 {
    font-size: 32px;
  }
`;

export const buttonWrapper = css`
  margin-top: 20px;
`;
