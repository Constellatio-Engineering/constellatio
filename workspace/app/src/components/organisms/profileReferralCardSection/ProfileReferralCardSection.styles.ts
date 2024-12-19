import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    background: ${colooors["neutrals-01"][0]};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
`;
