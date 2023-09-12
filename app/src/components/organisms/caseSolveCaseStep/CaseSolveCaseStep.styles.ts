import { css } from "@emotion/react";

export const wrapper = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    @media screen and (max-width: 1000px) {
        flex-direction: column-reverse;
        }

        max-width: 1440px;
        margin:0 auto;
`;
export const textAreaWrapper = css`
    padding:0 44px;
    h2{
        margin-bottom: 24px;
    }
    p{
        margin-bottom: 48px;
    }
`;
export const factsWrapper = css`
    max-width:50%;
    padding:8px 24px 16px 24px;
    h3{
        margin-bottom: 16px;
    }
    @media screen and (max-width: 1000px) {
    max-width:100%;
        }
`;
