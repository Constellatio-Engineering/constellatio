import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
    width: 100%;
`;
export const title = () => css`
color: ${colooors["neutrals-02"][1]};
margin-bottom:32px;
@media screen and (max-width: 1100px) {
    display: none;
}
`;
