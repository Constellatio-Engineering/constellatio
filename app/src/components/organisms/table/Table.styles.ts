import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const table = css`
  border-radius: 12px;
  overflow: hidden;
  .primaryCell {
    width: 80%;
    max-width: 150px;
    overflow: hidden;
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  vertical-align: middle;

  > * {
    vertical-align: middle;
    white-space: nowrap;
    min-width: max-content;
  }
  border: 1px solid red;
`;

export const tableHeader = (theme: MantineTheme) => css`
  border: 1px solid ${theme.colors["neutrals-01"][3]};

  > * {
    &,
    > * {
      vertical-align: middle;
    }
  }
`;

export const tableBody = (theme: MantineTheme) => css`
border-inline: 2px solid ${theme.colors["neutrals-01"][3]};
  border-radius: 0 0 12px 12px ;
  > * {
    &,
    > * {
      vertical-align: middle;
    }
  }
`;
