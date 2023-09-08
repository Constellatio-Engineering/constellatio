import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

const DictionaryCSS = css`
  height: 5px;
`;

export const wrapper = ({ theme, variant }: {
  theme: MantineTheme;
  variant: "case" | "dictionary";
}) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  /* height: 72px; */
  padding:12px 0;
  background-color: ${theme.colors["neutrals-01"][0]};
  /* position: relative; */
  ${variant === "dictionary" && DictionaryCSS}
border-bottom: 8px solid ${theme.colors["neutrals-01"][4]};
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 41;
  width: 100%;
`;

export const tabs = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-left: 60px;
`;
export const tab = ({ active, completed, theme }: {
  active: boolean;
  completed?: boolean;
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
  cursor: pointer;
`;
export const callToAction = css`
  margin-inline: 60px;
  @media screen and (max-width: 1000px) {
    margin:12px 60px;
  }
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
  bottom: -7px;
  transition: width 0.3s ease-in-out;
`;
