import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
  flex: 1;
`;

export const casesTable = (theme: MantineTheme) => css`
  min-width: 100%;
  text-align: left;
  border-radius: 12px;
  thead {
    background: ${theme.colors["neutrals-01"][2]};
  }
  tbody {
    tr {
      transition: all 300ms ease-in-out;
      &:hover {
        transition: all 300ms ease-in-out;
        background: ${theme.colors["neutrals-01"][2]};
        > td > button {
          background: ${theme.colors["neutrals-01"][2]};
        }
        > td > div {
          background: ${theme.colors["neutrals-01"][2]};
        }
      }
    }
  }
  td,
  th {
    border-block: 1px solid ${theme.colors["neutrals-01"][3]};
    width: max-content;
    padding: 0 16px;
    white-space: nowrap;
    &:first-of-type {
      border-left: 1px solid ${theme.colors["neutrals-01"][3]};
    }
    &:last-of-type {
      border-right: 1px solid ${theme.colors["neutrals-01"][3]};
    }
  }
  th {
    padding: 8px 16px;
    color: ${theme.colors["neutrals-01"][7]};
    text-transform: uppercase;
  }
  td {
    height: 60px;
    vertical-align: middle;
    cursor: pointer;
  }

  td.primaryCell {
    &:hover {
      background-color: ${theme.colors["neutrals-01"][1]};
      cursor: pointer;
    }
  }
  .primaryCell {
    width: 100%;
    p {
      max-width: 150px;
      overflow: hidden;
      width: max-content;
      text-overflow: ellipsis;
    }
  }
  @media screen and (max-width: 1200px) {
    .hide-on-tablet {
      display: none;
    }
  }
`;
export const durationCell = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][9]};
  overflow: hidden;
  text-overflow: ellipsis;
  svg {
    vertical-align: text-bottom;
    margin-right: 8px;
  }
`;
