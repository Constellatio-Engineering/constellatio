import { css } from "@emotion/react";

export const wrapper = (theme) => css`
    outline: 0;
    border: 0;

    background-color: transparent;
    color: #000;
    /* progressive/body/body-01@medium */
    font-family: Karla;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:12px 16px;
    border-radius: 12px;

    &:hover{
        background-color: #F6F6F5;
    }
    &:active{
        background-color: #F0F0F0;
    }
    &.selected{
        background-color: #000;
        color:#fff;

        .icon{
            background-color: #303030;
        }
    }
`;

export const icon = css`
 margin-right: 16px;
        width: 40px;
        height: 40px;
        background-color: #000;
        color: white;
        display: grid;
        place-items:   center;
        border-radius: 50%;
`;
export const counter = css`
  color: #949494;
        /* progressive/body/body-01@medium */
        font-family: Karla;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 150% */`;
        
