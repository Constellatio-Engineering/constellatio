import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
width: 100%;
`;
export const casesTable = (theme: MantineTheme) => css`
    min-width: 100%;
    text-align: left;
    border-radius:12px;
    overflow: hidden;
    thead{
        background: ${theme.colors["neutrals-01"][2]};
    }
    
    td,th{
        border-block: 1px solid ${theme.colors["neutrals-01"][3]};
        width: max-content;
        padding:0 16px;
        white-space: nowrap;
        &:first-of-type{
            border-left:1px solid ${theme.colors["neutrals-01"][3]};
        }
        &:last-of-type{
            border-right:1px solid ${theme.colors["neutrals-01"][3]};
        }
    }
    th{
        padding:8px 16px;
        color: ${theme.colors["neutrals-01"][7]};
    }
    td{
        height: 60px;
        vertical-align: middle;
    }
    td.primaryCell{
        &:hover{
            background-color: ${theme.colors["neutrals-01"][1]};
            cursor:     pointer;
        }
    }
    .primaryCell{
        width: 100%;
      p{
        /* max-width: 100%; */
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
`;
