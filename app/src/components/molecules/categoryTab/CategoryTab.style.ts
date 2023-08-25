import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => 
{
  return (css`
  outline: 0;
  border: 0;
  background: transparent;
  color: ${theme?.colors["neutrals-02"][1]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;

  &:hover {
    background-color: ${theme?.colors["neutrals-01"][2]};
  } 
   &:active {
    background-color: ${theme?.colors["neutrals-01"][3]};
  }

  &.selected{
    background-color: ${theme?.colors["neutrals-02"][1]};
    color: ${theme?.colors["neutrals-01"][0]};
  }
`);
};

export const icon = ({ isSelected, theme }: {
  isSelected: boolean;
  theme: MantineTheme;
}) => css`
    margin-right: 16px;
    width: 40px;
    height: 40px;
    background-color: ${isSelected ? theme?.colors["neutrals-02"][2] : theme.colors["neutrals-02"][1]};
    color: white;
    display: grid;
    place-items:   center;
    border-radius: 50%;
`;

export const counter = (theme: MantineTheme) => css`
  color: ${theme?.colors["neutrals-01"][7]};
`;
