import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

interface IProfilePageProps 
{
  isExpanded?: boolean;
  isSelected?: boolean;
  theme: MantineTheme;
}
const CSSIsExpandedStyles = css`
  width: 270px;
  min-width: 270px;
  flex: 1;
`;
export const wrapper = ({ isExpanded }: IProfilePageProps) => css`
  width: 160px;
  min-width: 160px;
  border-radius: 12px;
  ${isExpanded && CSSIsExpandedStyles};
`;
export const badgeWrapper = ({ isExpanded, isSelected, theme }: IProfilePageProps) => css`
  background-color: ${theme.colors["neutrals-01"][1]};
  border-top: 1px solid ${isSelected ? theme.colors["neutrals-01"][7] : theme.colors["neutrals-01"][3]};
  border-left: 1px solid ${isSelected ? theme.colors["neutrals-01"][7] : theme.colors["neutrals-01"][3]};
  border-right: 1px solid ${isSelected ? theme.colors["neutrals-01"][7] : theme.colors["neutrals-01"][3]};
  border-bottom: 1px solid ${!isExpanded ? isSelected ? theme.colors["neutrals-01"][7] : theme.colors["neutrals-01"][3] : theme.colors["neutrals-01"][3]};
  padding: 24px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: relative;
  border-radius: ${!isExpanded ? "12px" : "12px 12px 0 0"};
  width: 100%;
  `;

export const imageWrapper = css`
  width: 100%;
  height: 100px;
  position: relative;
`;

export const image = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const badgeTitle = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][1]};
  text-align: center;
  `;
export const badgeDescriptionArea = ({ isSelected, theme }: IProfilePageProps) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  text-align: center;
  color: ${theme.colors["neutrals-01"][7]};
  padding: 16px;
  border-radius: 0 0 12px 12px;
  
  border-bottom:1px solid ${isSelected ? theme.colors["neutrals-01"][7] : theme.colors["neutrals-01"][3]};
  border-right:1px solid ${isSelected ? theme.colors["neutrals-01"][7] : theme.colors["neutrals-01"][3]};
  border-left:1px solid ${isSelected ? theme.colors["neutrals-01"][7] : theme.colors["neutrals-01"][3]};
`;
export const badgeDescriptionText = css``;
export const checkCircle = css`
    position: absolute;
    top: 12px;
    right: 12px;
`;
