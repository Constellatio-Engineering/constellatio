import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

const CSSHiddenCard = css`
  height: 217px;
  overflow: hidden;
  pointer-events: none;
  * > {
    filter: blur(3px);
  }
`;
const CSSHighlighted = (theme: MantineTheme) => css`
  background: ${colooors["neutrals-01"][3]};
  outline: 1px solid ${colooors["neutrals-01"][1]};
`;

export const wrapper = ({ hidden, theme }: {
  hidden?: boolean;
  theme: MantineTheme;
}) => css`
  position: relative;
  width: 422px;
  border: 1px solid ${colooors["neutrals-01"][4]};
  background-color: ${colooors["neutrals-01"][0]};
  padding-top: 0;
  .switcher {
    padding: 16px 24px 16px 24px;
    background-color: ${colooors["neutrals-01"][0]};
    z-index: 1;
  }
  .card-header{
	  position:relative;
    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap:4px;	
      }
    }
  overflow: visible;
  ${hidden && CSSHiddenCard}
  .hidden-overlay {
    position: absolute;
    bottom: 0;
    height: auto;
    width: 100%;
    background: white;
    color: ${colooors["neutrals-01"][7]};
    svg {
      display: inline-block;
    }
    div {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 12px;
      padding: 20px;
      background-color: ${colooors["neutrals-01"][0]};
      border-top: 2px solid ${colooors["neutrals-01"][4]};
      position: relative;
      z-index: 1;
      &::before {
        content: "";
        position: absolute;
        top: -181%;
        z-index: 1;
        left: 0;
        width: 100%;
        pointer-events: fill;
        height: 180%;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.5) 0%,
          ${colooors["neutrals-01"][0]} 97%
        );
        backdrop-filter: blur(1px);
      }
    }
  }

  border-radius: 12px;
  overflow: auto;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

export const item = ({
  isExpanded,
  // isExpandable,
  isHighlighted,
  // isTopLevel,
  theme
}: {
  isExpandable?: boolean;
  isExpanded?: boolean;
  isHighlighted?: boolean;
  isTopLevel?: boolean;
  theme: MantineTheme;
}) => css`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  color: ${isExpanded
    ? colooors["neutrals-02"][1]
    : colooors["neutrals-01"]?.[9]};
  a {
    color: ${isExpanded
    ? colooors["neutrals-02"][1]
    : colooors["neutrals-01"][9]};
  }
  background: ${isExpanded
    ? colooors["neutrals-01"][1]
    : colooors["neutrals-01"][0]};
  border-bottom: 1px solid ${colooors["neutrals-01"][4]};
  border-left: 3px solid
    ${isExpanded
    ? colooors["neutrals-02"][1]
    : "transparent"};
  &:hover {
    background: ${colooors["neutrals-01"][1]};
  }
  padding: 12px 0 12px 0;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
  }
  position: relative;
  vertical-align: baseline;
  cursor: pointer;
  ${isHighlighted && CSSHighlighted(theme)}
`;

export const facts = css`
  padding: 0 24px;
`;

export const tocWrapper = css`
  padding-right: 22px;
`;

export const renderTOCList = (isExpanded: boolean) => css`
  display: ${isExpanded ? "block" : "none"};
`;

export const itemTextWrapper = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  padding: 0 16px;
`;

export const expandIconButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  width: 24px;
  height: 24px;
  position: relative;
  margin: 0 -6px 0 -12px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 50%;
  transition: background-color 0.15s ease;

  :hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  
  :active {
    background-color: rgba(0, 0, 0, 0.15);
  }
  
  svg {
    transform: translateY(1px);
  }
`;
