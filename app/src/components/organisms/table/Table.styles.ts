import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const table = css`
  border-radius: 12px;
  box-shadow:0 0 0 1px ${colooors["neutrals-01"][3]};
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

  tr:not(:last-child) {
     border-bottom: 1px solid ${colooors["neutrals-01"][3]};
  }
    
  > * {
    vertical-align: middle;
    white-space: nowrap;
    min-width: max-content;
  }
`;

export const tableHeader = () => css`
  > * {
    &,
    > * {
      vertical-align: middle;
    }
  }
`;

export const tableBody = () => css`
  border-radius: 0 0 12px 12px ;
  > * {
    &,
    > * {
      vertical-align: middle;
    }
  }
`;
