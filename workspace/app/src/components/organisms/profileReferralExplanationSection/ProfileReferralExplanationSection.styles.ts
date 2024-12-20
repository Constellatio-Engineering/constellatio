import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const title = () => css`
color: ${colooors["neutrals-02"][1]};
margin-bottom:32px;
@media screen and (max-width: 1100px) {
    display: none;
}
`;

export const wrapper = () => css`
    background: ${colooors["neutrals-01"][0]};
    padding: 24px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
`;

export const noReferralCode = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

export const hinweis = css`
    margin-top: 16px;
    font-size: 16px;
`;
