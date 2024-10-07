import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    padding: 20px 32px;
    background: ${colooors["neutrals-01"][0]};
    border-bottom: 1px solid ${colooors["neutrals-01"][3]};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
`;
