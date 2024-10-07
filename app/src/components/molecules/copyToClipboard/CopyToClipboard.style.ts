import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const copyTextWrapper = () => css`
    border: 1px solid ${colooors["neutrals-01"][3]};
    border-radius: 12px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: ${colooors["neutrals-01"][0]};
    color: ${colooors["neutrals-02"][1]};
`;
