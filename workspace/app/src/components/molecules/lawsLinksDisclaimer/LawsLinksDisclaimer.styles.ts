import { css } from "@emotion/react";

export const wrapper = (marginBottom?: number) => css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    justify-content: center;
    align-items: flex-start;
    padding: 30px 35px;
    border: solid 1px #dadada;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: ${marginBottom || 0}px;

    > p {
        line-height: 1.3;
        margin-bottom: 10px;

        &:nth-last-child(2) {
            margin-bottom: 20px;
        }
    }
`;

export const heading = css`
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    
    >svg {
        margin-right: 7px;
    }
`;

export const buttonWrapper = css`
    display: flex;
    width: 100%;
    gap: 10px;
    justify-content: flex-end;
`;
