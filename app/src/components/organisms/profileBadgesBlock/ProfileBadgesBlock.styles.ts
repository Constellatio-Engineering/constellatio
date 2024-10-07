import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    padding: 24px;
    background-color: ${colooors["neutrals-01"][0]};
    border-radius: 12px;
    margin-top: 32px;
    width: 100%;
    box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
    display:flex;
    flex-direction:column;
    gap:36px;
`;
export const badgesBlockHeader = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
`;
export const title = () => css`
color: ${colooors["neutrals-01"][7]};
`;
export const counter = () => css`
color: ${colooors["neutrals-02"][1]};
`;
export const headerLayout = css`
   align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    `;
