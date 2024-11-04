import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    background: ${colooors["neutrals-01"][1]};
    padding: 4px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 1000px;
    width: fit-content;
    svg{
        color: ${colooors["neutrals-01"][7]};
    }
    border: 1px solid ${colooors["neutrals-01"][3]};
`;
