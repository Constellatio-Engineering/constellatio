import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background: ${colooors["neutrals-01"][0]};
    padding:32px 24px;
    height: 230px;
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
    * {
        text-align: center;
    }
`;

export const icon = (theme: MantineTheme) => css`
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

export const labelWrapper = (theme: MantineTheme) => css`
      padding: 4px 8px;
      background-color: ${colooors["cc-cases"][2]};
      color: ${colooors["neutrals-02"][1]};
      border-radius: 14px;
      display: inline-block;
    `;
