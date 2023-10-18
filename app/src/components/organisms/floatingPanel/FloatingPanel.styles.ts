import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

const CSSHiddenCard = css`
  height: 217px;
  overflow: hidden;
  pointer-events: none;
  margin-left: auto;
  * > {
    filter: blur(3px);
  }
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
      background-color: transparent;
      border-top: 2px solid ${theme.colors["neutrals-01"][4]};
      position: relative;
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
`;

export const item = ({
  isExpandable,
  isExpanded,
  isTopLevel,
  theme,
}: {
  isExpandable?: boolean;
  isExpanded?: boolean;
  isTopLevel?: boolean;
  theme: MantineTheme;
}) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${isTopLevel && isExpanded
    ? theme?.colors["neutrals-02"][1]
    : theme?.colors?.["neutrals-01"]?.[9]};
  a {
    color: ${isTopLevel && isExpanded
    ? theme?.colors["neutrals-02"][1]
    : theme?.colors?.["neutrals-01"]?.[9]};
  }
  background: ${isTopLevel && isExpandable && isExpanded
    ? theme?.colors["neutrals-01"][2]
    : theme?.colors?.["neutrals-01"]?.[0]};
  border-bottom: 1px solid ${theme.colors["neutrals-01"][4]};
  border-left: 3px solid
    ${isTopLevel && isExpandable && isExpanded
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
`;

export const facts = css`
  padding: 0 24px;
`;
