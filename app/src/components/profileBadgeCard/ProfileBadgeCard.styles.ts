import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

interface IProfilePageProps 
{
  isExpanded?: boolean;
  theme: MantineTheme;
}

const CSSIsExpandedStyles = css`
  min-width: 270px;
  min-height: 176px;
  flex: 1;
`;
export const wrapper = ({ isExpanded }: IProfilePageProps) => css`
  min-width: 160px;
  min-height: 176px;
  border-radius: 12px;
  overflow: hidden;
  ${isExpanded && CSSIsExpandedStyles}
`;
export const badgeWrapper = ({ theme }: IProfilePageProps) => css`
  background-color: ${theme.colors["neutrals-01"][1]};
  border: 1px solid ${theme.colors["neutrals-01"][3]};
  padding: 24px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  svg{
    fill: red;
  }
  position: relative;
`;
export const badgeTitle = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][1]};
`;
export const badgeDescriptionArea = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  text-align: center;
  color: ${theme.colors["neutrals-01"][7]};
  padding: 16px;
  border-radius: 0 0 12px 12px;
  border:1px solid ${theme.colors["neutrals-01"][3]};
`;
export const badgeDescriptionText = css``;
export const checkCircle = css`
    position: absolute;
    top: 12px;
    right: 12px;
`;
