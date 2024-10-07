import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    background: ${colooors["neutrals-01"][0]};
    padding:32px 24px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex:1;
    min-width: 270px;
    border-right: 1px solid ${colooors["neutrals-01"][3]};
    color: #000000;
    &:hover{
        background-color: ${colooors["neutrals-01"][1]};
    };
    &:active{
        background-color: ${colooors["neutrals-01"][2]};
    };
`;

export const link = () => css`
    color: ${colooors["neutrals-01"][9]};
    svg{
        vertical-align:middle;
    }
`;

export const icon = () => css`
    display:grid;
    place-items: center;
    svg{
        width: 20px;
        height: 20px;
    }
    border-radius: 50%;
    background-color: ${colooors["neutrals-01"][0]};
    border: 1px solid ${colooors["neutrals-01"][3]};
    width: 40px;
    height: 40px;
`;
