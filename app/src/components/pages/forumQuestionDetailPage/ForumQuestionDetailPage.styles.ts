import { colooors } from "@/constants/styles/colors";
import type { UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import type { ModalStylesNames } from "@mantine/core";
import type { Styles } from "@mantine/styles";

const questionOffset = 120;

export const questionWrapper = css`
  background-color: ${colooors["cc-forum"][2]};
  position: relative;
  z-index: 1;
  min-height: 400px;
`;

export const backToForumLink = css`
  position: relative;
  top: ${questionOffset - 20}px;
  display: flex;
  align-items: center;
  span {
    color: black;
    font-weight: 500;
  }
  svg {
    transform: rotate(90deg);
  }
`;

export const contentWrapper = css`
  max-width: 920px;
`;

export const editAndDeleteButtonsWrapper = css`
  margin-top: 40px;
`;

export const forumListItem = css`
  overflow: hidden;
  transform: translateY(${questionOffset}px);
  position: relative;
  box-shadow: 0 8px 44px rgba(0, 0, 0, 0.04);
  border: none;
  z-index: 4;
  padding: 12px 0px 6px;
`;

export const yellowTopBar = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: ${colooors["cc-forum"][3]};
`;

export const questionContentWrapper = css`
  display: flex;
  gap: 24px;
  background-color: white;
`;

export const upvoteColumn = css`
  width: 24px;
  min-width: 24px;
  padding-top: 6px;
`;

export const contentColumn = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const titleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const title = css`
  font-weight: 700;
  font-size: 28px;
  min-width: 0;
`;

export const bookmarkButtonWrapper = css`
  min-width: max-content;
  padding-left: 40px;
  padding-top: 4px;
`;

export const authorAndDateWrapper = css`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  margin: 40px 0;
`;

export const authorAndDateSeparator = css`
  height: 20px;
  width: 1px;
  background-color: ${colooors["neutrals-01"][5]};
`;

export const date = css`
  color: ${colooors["neutrals-01"][7]};
`;

export const tagsWrapper = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
`;

export const head = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
`;

export const totalAmountAndSortingWrapper = (fullWidth: boolean) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${fullWidth ? "100%" : "auto"};
  color: ${colooors["neutrals-01"][9]};
`;

export const totalAmount = css`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
`;

export const sortWrapper = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const sortWrapperHidden = css`
  visibility: hidden;
`;

export const selectSorting = css`
  background-color: transparent;
  border: none;
  outline: none;
  color: inherit;
  font: inherit;
`;

export const answersWrapper = css`
  padding-top: ${questionOffset + 60}px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const answerWrapper = css`
  
`;

export const separator = css`
  width: 80%;
  background-color: #d1d1d1;
  height: 1px;
  margin: 20px auto;
`;

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = (): ModalStyles =>
{
  const styles: ModalStyles = () => ({
    body: {
      padding: "36px",
    },
    content: {
      ".close-btn": {
        cursor: "pointer",
        position: "absolute",
        right: "24px",
        top: "24px",
      },
      borderRadius: "12px",
      position: "relative",
    },
    header: {
      padding: 0,
    },
    root: {
      minWidth: "520px",
    },
  });
  return styles;
};
