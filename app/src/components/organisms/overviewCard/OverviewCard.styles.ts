import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

import { type IOverviewCard } from "./OverviewCard";

interface IOverviewCardStyles 
{
  tableTheme?: boolean;
  theme: MantineTheme;
  variant: IOverviewCard["variant"];
}

export const wrapper = (): SerializedStyles => css`
  /* max-width: 486px; */
`;

export const topDetails = ({ theme, variant }: IOverviewCardStyles): SerializedStyles => css`
  background-color: ${variant === "case"
    ? theme.colors["support-notice"][4]
    : theme.colors["cc-dictionary"][4]};
  padding: 16px 16px 32px 16px;
  border-radius: 12px 12px 0 0;
  color: ${theme.colors["neutrals-01"][0]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .left-side {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    & .views div,
    & .time div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
  }
  .right-side {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    span {
      color: ${theme.colors["transparency-02"][8]};
    }
  }
`;

export const cardBody = ({
  theme,
}: IOverviewCardStyles): SerializedStyles => css`
  border-radius: 12px;
  background-color: ${theme.colors["neutrals-01"][0]};
  transform: translateY(-16px);
`;

export const row = ({ tableTheme, theme }: IOverviewCardStyles): SerializedStyles => css`
  padding: 16px;
  border-bottom: 1px solid ${theme.colors["neutrals-01"][2]};
  .row-title {
    color: ${theme.colors["neutrals-01"][7]};
    display: flex;
    gap: 29px;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 8px;
    button {
      padding: 0;
      margin: 0;
      background-color: transparent;
      outline: none;
      border: 0;
    }
  }
  .row-value {
    display: flex;
    /* gap difference in font size */
    gap: ${tableTheme ? "24px" : "8px"};
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    color: ${theme.colors["neutrals-02"][1]};
    .reset-button {
      flex: 1;
      text-align: right;
    }
  }
  .tags-values {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    cursor: pointer;
    position:relative;
    &::-webkit-scrollbar {
      display: none;
    }
    /* padding-bottom: 16px; */
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const tagsModal = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const seeAllTagsButton = (theme: MantineTheme) => css`
margin-left: auto;
display: block;
margin-top: 8px;
border:0;
outline:0;
color: ${theme.colors["neutrals-01"][9]};
background-color: transparent;
`;
