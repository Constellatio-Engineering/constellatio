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
background: ${theme.colors["neutrals-01"][3]};
outline: 1px solid ${theme.colors["neutrals-01"][1]};
`;

export const wrapper = ({ hidden, theme }: {
  hidden?: boolean;
  theme: MantineTheme;
}) => css`
  position: relative;
  width: 422px;
  background-color: ${theme.colors["neutrals-01"][0]};
  padding-top: 0;
  .switcher {
    padding: 16px 24px 16px 24px;
    position: sticky;
    top: 0;
    right:0;
    background-color: ${theme.colors["neutrals-01"][0]};
    z-index: 1;
  }
  .card-header{
	position:relative;
	p{
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
    color: ${theme.colors["neutrals-01"][7]};
    svg {
      display: inline-block;
    }
    div {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 12px;
      padding: 20px;
      background-color: ${theme.colors["neutrals-01"][0]};
      border-top: 2px solid ${theme.colors["neutrals-01"][4]};
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
          ${theme.colors["neutrals-01"][0]} 97%
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
  padding-bottom: 24px;
`;

export const item = ({
  highlighted,
  // isExpandable,
  isExpanded,
  // isTopLevel,
  theme
}: {
  highlighted?: boolean;
  isExpandable?: boolean;
  isExpanded?: boolean;
  isTopLevel?: boolean;
  theme: MantineTheme;
}) => css`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  color: ${isExpanded
    ? theme?.colors["neutrals-02"][1]
    : theme?.colors?.["neutrals-01"]?.[9]};
  a {
    color: ${isExpanded
    ? theme?.colors["neutrals-02"][1]
    : theme?.colors?.["neutrals-01"]?.[9]};
  }
  background: ${isExpanded
    ? theme?.colors["neutrals-01"][1]
    : theme?.colors?.["neutrals-01"]?.[0]};
  border-bottom: 1px solid ${theme.colors["neutrals-01"][4]};
  border-left: 3px solid
    ${isExpanded
    ? theme.colors["neutrals-02"][1]
    : "transparent"};
  &:hover {
    background: ${theme.colors["neutrals-01"][1]};
  }
  padding: 12px 0 12px 0;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
  }
  position: relative;
  svg {
    position: absolute;
    left: 3px;
  }
  vertical-align: baseline;
  cursor: pointer;
  ${highlighted && CSSHighlighted(theme)}
  
`;

export const facts = css`
  padding: 0 24px;
`;
export const renderTOCList = css`
`;
