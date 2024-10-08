import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
padding: 16px;
border-bottom:1px solid ${colooors["neutrals-01"][2]};

display:flex;
justify-content:space-between;
align-items:center;
p{
svg{
    vertical-align: text-bottom;
    margin-right: 8px;
}
max-width: 240px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
.failed-text{
    svg{
        vertical-align: text-bottom;
    }
    color:${colooors["support-error"][3]};

}
`;
