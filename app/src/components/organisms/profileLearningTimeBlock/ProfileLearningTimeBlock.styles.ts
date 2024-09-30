import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    padding: 24px;
    border-radius: 12px;
    background: ${colooors["neutrals-01"][0]};
    box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
    margin: 24px 0;
`;
