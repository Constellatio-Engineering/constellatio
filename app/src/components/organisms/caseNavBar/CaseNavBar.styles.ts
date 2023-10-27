import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

const DictionaryCSS = css`
  height: 0px;
  padding:0;
  max-width: 100%;
`;

export const componentArea = ({ theme, variant }: {theme: MantineTheme;variant: "case"|"dictionary"}): SerializedStyles => css`
 background-color: ${theme.colors["neutrals-01"][0]};
 border-bottom: 6px solid ${theme.colors["neutrals-01"][4]};
 position: sticky;
  top: ${variant === "case" ? "0px" : "60px"};
  z-index: 41;
  width: 100%;
  padding: 0px ;
 `;

export const wrapper = ({ variant }: {
  variant: "case" | "dictionary";
}) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1440px;
  margin: 0 auto;  
  padding:16px 48px;
  ${variant === "dictionary" && DictionaryCSS}

  @media (max-width: 800px) {
    padding: 16px 12px;
  } 
`;

export const tabs = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-left: 12px;
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
