import { headerHeightPx } from "@/components/organisms/Header/Header.styles";

import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

const DictionaryCSS = css`
  height: 0px;
  padding:0;
  max-width: 100%;
`;

export const componentArea = ({ theme }: {theme: MantineTheme}): SerializedStyles => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  border-bottom: 6px solid ${theme.colors["neutrals-01"][4]};
  position: sticky;
  top: ${headerHeightPx}px;
  z-index: 41;
  border-top: 1px solid #e8e8e8;
  width: 100%;
`;

export const wrapper = ({ variant }: {
  variant: "case" | "dictionary";
}) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;  
  padding:16px 0px;
  ${variant === "dictionary" && DictionaryCSS};

  @media (max-width: 800px) {
    padding: 16px 0px;
  } 
`;

export const tabs = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  /* margin-left: 12px; */
`;
export const tab = ({
  active,
  completed,
  isClickable,
  theme
}: {
  active: boolean;
  completed: boolean;
  isClickable: boolean;
  theme: MantineTheme;
}): SerializedStyles => css`
  color: ${active ? "blue" : "black"};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: ${active || completed
    ? theme.colors["neutrals-02"][1]
    : theme.colors["cc-cases"][4]};
  span {
    background-color: ${active || completed
    ? theme.colors["cc-cases"][4]
    : theme.colors["cc-cases"][1]};
    width: 24px;
    height: 24px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: ${active || completed
    ? theme.colors["neutrals-01"][0]
    : theme.colors["cc-cases"][4]};
  }
  cursor: ${isClickable ? "pointer" : "not-allowed"};
`;
export const callToAction = css`
margin-right: 12px;

`;
export const progressBar = ({
  progress,
  theme,
  variant,
}: {
  progress: number;
  theme: MantineTheme;
  variant: "case" | "dictionary";
}): SerializedStyles => css`
  height: 6px;
  width: ${`${progress}%`};
  background-color: ${variant === "case"
    ? theme.colors["cc-cases"][4]
    : theme.colors["cc-dictionary"][4]};
  position: absolute;
  bottom: -6px;
  transition: width 0.3s ease-in-out;
`;
