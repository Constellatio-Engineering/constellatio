import { colooors } from "@/constants/styles/colors";
import type { UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import type { ModalStylesNames } from "@mantine/core";
import type { Styles } from "@mantine/styles";

export const forumListItem = css`
  position: relative;

  &:hover .markAsCorrectButton {
    display: flex;
  }

  .markAsCorrectButton {
    all: unset;
    cursor: pointer;
    position: absolute;
    right: 6px;
    top: 6px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: ${colooors["support-success"][1]};
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
    display: none;
    align-items: center;
    justify-content: center;
    transition: background-color .1s ease;
    background-color: ${colooors["support-success"][1]};
    border: 1px solid ${colooors["support-success"][2]};
    &:hover, &:active {
      background-color: #d2ecde;
    }
  }
`;

export const wrapper = css`
  display: flex;
  gap: 24px;
`;

export const upvoteColumn = css`
  width: 24px;
  min-width: 24px;
`;

export const contentColumn = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const authorAndDateWrapper = css`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 24px;
`;

export const authorWrapper = css`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const profilePicture = css`
  border-radius: 100%;
  border: 1px solid ${colooors["neutrals-01"][4]};
  padding: 3px;
`;

export const author = css`
  font-weight: 600;
`;

export const date = css`
  color: ${colooors["neutrals-01"][7]};
  font-weight: 500;
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

export const bottomWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  gap: 24px;
`;

export const toggleRepliesButton = (isExpanded: boolean) => css`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0px;
  color: ${colooors["neutrals-01"][9]};
  transition: opacity .2s ease;
  svg {
    fill: ${colooors["neutrals-01"][9]};
    transform: rotate(${isExpanded ? 180 : 0}deg) translateY(${isExpanded ? 0 : 1}px);
  }
  &:hover, &:active {
    opacity: .8;
  }
`;

export const replyWrapper = css`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: flex-end;
`;
