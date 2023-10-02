import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const tableWrapper = (theme: MantineTheme) => css`
  text-align: left;
  border-radius: 12px;
  overflow: hidden;
  outline: 1px solid ${theme.colors["neutrals-01"][1]};
  td {
    padding: 16px;
  }
  th {
    padding: 8px 16px;
  }
  th,
  td {
    width: max-content;
    vertical-align: middle;
    white-space: nowrap;
  }
  tr {
    border: 1px solid ${theme.colors["neutrals-01"][2]};
  }
  .primaryCell {
    width: 100%;
    
    p {
      max-width: 550px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      svg{
        vertical-align: text-bottom;
        margin-right: 8px;
      }
      gap: 8px;
    }
  }
`;

export const tableHead = (theme: MantineTheme) => css`
  background-color: #f6f6f5;
  color: ${theme.colors["neutrals-01"][7]};
`;

export const tableBody = (theme: MantineTheme) => css`
  background: ${theme.colors["neutrals-01"][0]};

`;

export const callToActionCell = css``;
export const docName = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][1]};
`;
export const docDate = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][7]};
`;
export const docTags = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][9]};
`;
export const cellNote = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][9]};
  svg{
    vertical-align: text-bottom;
    margin-right: 8px;
  }
`;

export const showMoreButton = (theme: MantineTheme) => css`
  position: relative;
  background: red;
  display: grid;
  place-items: center;
  bottom: 45px;
  left: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(
    to top,
    ${theme.colors["neutrals-01"][0]} 40%,
    transparent 100%
  );
`;
