import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

const CSSActiveStyles = () => css`
  background: ${colooors["neutrals-01"][2]};
  border-left: 3px solid ${colooors["neutrals-02"][1]};
`;

export const wrapper = ({ selected }: {
  selected?: boolean;
}) => css`
  outline: 0;
  border: 0;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  background: ${colooors["neutrals-01"][0]};
  border-bottom:1px solid ${colooors["neutrals-01"][3]};
  &:hover {
    background: ${colooors["neutrals-01"][1]};
  }
  svg{
    vertical-align: text-bottom;
    margin-right: 8px;
  }
  ${selected && CSSActiveStyles()}
`;
