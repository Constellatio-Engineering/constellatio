import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  flex: 1;
  border: 1px solid ${colooors["neutrals-01"][3]};
  border-radius: 12px;
  overflow: hidden;
`;

export const casesTable = (numberOfCasesShown: number) => css`
  min-width: 100%;
  text-align: left;
  thead {
    background: ${colooors["neutrals-01"][2]};
  }
  tbody {
    &:hover {
        cursor: pointer;        
    }
    tr {
      &:nth-child(n):not(:nth-child(${numberOfCasesShown})) {
        border-bottom: 1px solid ${colooors["neutrals-01"][3]};
      }
      transition: all 300ms ease-in-out;
      &:hover {
        transition: all 300ms ease-in-out;
        background: ${colooors["neutrals-01"][2]};
        > td > button {
          cursor: pointer;
          background: ${colooors["neutrals-01"][2]};
        }
      }
    }
  }
  td,
  th {
    width: max-content;
    white-space: nowrap;
  }
  th {
    padding: 8px 16px;
    color: ${colooors["neutrals-01"][7]};
    text-transform: uppercase;
  }
  td {
    padding: 0 16px;
    height: 60px;
    vertical-align: middle;
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
export const durationCell = () => css`
  color: ${colooors["neutrals-01"][9]};
  overflow: hidden;
  text-overflow: ellipsis;
  svg {
    vertical-align: text-bottom;
    margin-right: 8px;
  }
`;
