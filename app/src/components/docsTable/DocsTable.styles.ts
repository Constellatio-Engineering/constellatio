import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
export const wrapper = css`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const tableWrapper = (theme: MantineTheme) => css`
  text-align: left;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
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
  }
`;

export const tableHead = (theme: MantineTheme) => css`
  background-color: #f6f6f5;
  color: ${theme.colors["neutrals-01"][7]}
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

export const showMoreButton = (theme: MantineTheme) => css`
  position: absolute;
  background: red;
  display: grid;
  place-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${theme.colors["neutrals-01"][0]}
  );
`;
