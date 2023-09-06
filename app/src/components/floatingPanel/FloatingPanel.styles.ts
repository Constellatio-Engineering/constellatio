import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  width: 422px;
  /* padding:20px 16px 0 16px; */
  background-color: ${theme.colors["neutrals-01"][0]};
  border-radius: 12px;
  margin: 50px 50px 50px auto;
  padding-top: 20px;
  .switcher {
    margin: 0px 24px 8px 24px;
  }
  max-height: 600px;
  overflow:auto;

  &::-webkit-scrollbar{
    width: 8px;
    background-color: white;
    &-thumb{
      background-color:${theme.colors["neutrals-01"][4]};
      border-radius:4px;
      margin:0 5px;
    }
  }
`;

export const item = ({
  isExpandable,
  isExpanded,
  isTopLevel,
  theme
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
  background: ${isTopLevel && isExpandable && isExpanded
    ? theme?.colors["neutrals-01"][2]
    : theme?.colors?.["neutrals-01"]?.[0]};
  border-bottom: 1px solid ${theme.colors["neutrals-01"][4]};
  border-left: 3px solid ${isTopLevel && isExpandable && isExpanded ? theme.colors["neutrals-02"][1] : "transparent"};
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

export const facts = (theme: MantineTheme) => css`
padding:8px 24px 0 24px;
`;
