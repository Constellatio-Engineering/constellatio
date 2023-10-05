import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

const CSSActiveStyles = (theme: MantineTheme) => css`
  background: ${theme.colors["neutrals-01"][2]};
  border-left: 3px solid ${theme.colors["neutrals-02"][1]};
`;

export const wrapper = ({
  theme,
  selected,
}: {
  theme: MantineTheme;
  selected: boolean;
}) => css`
  outline: 0;
  border: 0;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  background: ${theme.colors["neutrals-01"][0]};
  border-bottom:1px solid ${theme.colors['neutrals-01'][3]};
  &:hover {
    background: ${theme.colors["neutrals-01"][1]};
  }
  svg{
    vertical-align: text-bottom;
    margin-right: 8px;
  }
  ${selected && CSSActiveStyles(theme)}
`;
