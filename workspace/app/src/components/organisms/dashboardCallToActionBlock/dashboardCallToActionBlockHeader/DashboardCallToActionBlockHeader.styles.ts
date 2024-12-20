import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  width: 280px;
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

export const casesHeaderTitle = () => css`
    color: ${colooors["neutrals-02"][1]};
    margin :24px 0;
`;
