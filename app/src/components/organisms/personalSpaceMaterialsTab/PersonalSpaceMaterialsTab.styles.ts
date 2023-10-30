import { css } from "@emotion/react";
export const container = css`
    max-width: 1440px;
    padding: 0 61px;
    margin: 0 auto;
    @media screen and (min-width: 1200px) {
        padding: 0 32px;
    }
`;
export const materialTabContainerContent = css`
    align-items: flex-start;
    display: flex;
    gap: 32px;
    justify-content: space-between;
    margin-top: 40px;
    flex-direction: column; 
    @media screen and (min-width: 1200px) {
        flex-direction: row;
    }
`;
