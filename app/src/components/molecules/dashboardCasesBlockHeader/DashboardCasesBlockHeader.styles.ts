import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
  min-width: 220px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
@media screen and (max-width: 1200px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
}
`;

export const casesHeaderTitle = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-02"][1]};
    margin :24px 0;
    
`;
