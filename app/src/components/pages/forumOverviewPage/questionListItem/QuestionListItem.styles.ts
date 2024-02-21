import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const questionContentWrapper = css`
  display: flex;
  gap: 24px;
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
  gap: 24px;
`;

export const titleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
`;

export const titleAndCheckmarkWrapper = css`
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
`;

export const title = css`
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 24px;
  min-width: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const checkmark = css`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 22px;
  background-color: ${colors["brand-01"][4]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  svg {
    transform: translateX(-1px);
  }
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
  margin-bottom: 6px;
`;

export const authorWrapper = css`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const profilePicture = (hasProfilePicture: boolean) => css`
  border-radius: 100%;
  border: 1px solid ${colors["neutrals-01"][4]};
  padding: ${hasProfilePicture ? 0 : 3}px;
  object-fit: cover;
`;

export const author = css`
  font-weight: 600;
`;

export const authorAndDateSeparator = css`
  height: 20px;
  width: 1px;
  background-color: ${colors["neutrals-01"][5]};
`;

export const date = css`
  color: ${colors["neutrals-01"][7]};
`;

export const excerpt = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 140%;
  font-size: 16px;
  font-weight: 400;
`;

export const bottomWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const answersCountWrapper = css`
  min-width: max-content;
  padding-left: 50px;
  height: 28px;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: flex-end;
  color: ${colors["neutrals-01"][9]};
  font-weight: 500;
  svg {
    transform: translateY(1px);
  }
`;
