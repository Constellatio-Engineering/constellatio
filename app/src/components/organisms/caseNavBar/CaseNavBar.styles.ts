import { headerHeightPx } from "@/components/organisms/Header/Header.styles";
import { colooors } from "@/constants/styles/colors";

import { css, type SerializedStyles } from "@emotion/react";

const DictionaryCSS = css`
  height: 0px;
  padding:0;
  max-width: 100%;
`;

export const componentArea = (): SerializedStyles => css`
  background-color: ${colooors["neutrals-01"][0]};
  border-bottom: 6px solid ${colooors["neutrals-01"][4]};
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
}: {
  active: boolean;
  completed: boolean;
  isClickable: boolean;
}): SerializedStyles => css`
  color: ${active ? "blue" : "black"};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: ${active || completed
    ? colooors["neutrals-02"][1]
    : colooors["cc-cases"][4]};
  span {
    background-color: ${active || completed
    ? colooors["cc-cases"][4]
    : colooors["cc-cases"][1]};
    width: 24px;
    height: 24px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: ${active || completed
    ? colooors["neutrals-01"][0]
    : colooors["cc-cases"][4]};
  }
  cursor: ${isClickable ? "pointer" : "not-allowed"};
`;
export const callToAction = css`
margin-right: 12px;

`;
export const progressBar = ({ progress, variant }: {
  progress: number;
  variant: "case" | "dictionary";
}): SerializedStyles => css`
  height: 6px;
  width: ${`${progress}%`};
  background-color: ${variant === "case"
    ? colooors["cc-cases"][4]
    : colooors["cc-dictionary"][4]};
  position: absolute;
  bottom: -6px;
  transition: width 0.3s ease-in-out;
`;
