import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  width: 422px;
  /* padding:20px 16px 0 16px; */
  background-color: ${theme.colors["neutrals-01"][0]};
  border-radius: 12px;
  margin-left: auto;
  padding-top: 20px;
  .switcher {
    margin: 0px 24px 8px 24px;
  }
`;

export const item = ({ isExpandable, isExpanded, theme }: {
  isExpandable?: boolean;
  isExpanded?: boolean;
  theme: MantineTheme;
}) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${isExpanded
    ? theme?.colors["neutrals-02"][1]
    : theme?.colors?.["neutrals-01"]?.[9]};
  background: ${isExpandable && isExpanded
    ? theme?.colors["neutrals-01"][2]
    : theme?.colors?.["neutrals-01"]?.[0]};
  border-bottom: 1px solid ${theme.colors["neutrals-01"][4]};
  border-left: 3px solid ${isExpandable && isExpanded ? theme.colors["neutrals-02"][1] : "transparent"};
  &:hover {
    background: ${theme.colors["neutrals-01"][1]};
}
padding: 12px 0 12px 0;
p{
    display: flex;
  align-items: center;
    justify-content: center;
}
`;
