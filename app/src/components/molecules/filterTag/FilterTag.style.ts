import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const filterTag = (theme: MantineTheme) => css`
  div {
    background-color:${colooors["neutrals-01"][0]};
    display: flex;
    gap:4px;
    place-items:    center;
    border-radius: 40px;
    padding:4px 12px;
    color: ${colooors["neutrals-02"][1]};
    border:1px solid ${colooors["neutrals-01"][3]};
    cursor: pointer;
    width: max-content;
    svg{
        color: ${colooors["neutrals-01"][7]};
    }
    
    &:hover{
        border:1px solid ${colooors["neutrals-01"][5]};
        svg{
            color: ${colooors["neutrals-02"][1]};
        }
    }
  }
`;
