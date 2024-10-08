import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
    width:100%;
    min-height: 200px;
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
    padding:24px;
    background: ${colooors["neutrals-01"][1]};
    border-radius: 12px;
    border:1px solid ${colooors["neutrals-01"][2]};
    gap:8px;
    text-align: center;
    button{
        margin: 6px auto 8px auto;
    }
    .text{
        color: ${colooors["neutrals-01"][7]};
        p{
            margin:8px auto;
            text-align: left;
            width: 250px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;
