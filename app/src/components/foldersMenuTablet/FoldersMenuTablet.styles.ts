import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
    width: 100%;
`;
export const selectedFolder = css`
display: flex;
justify-content: space-between;
align-items: center;
.mantine-Menu-dropdown{
    padding:0;
    border-radius: 12px !important;
overflow: hidden;
}
.folder-options{
    button{
        margin-left: 8px;
    }
}
.mantine-Text-root{
    .dots{
        display: grid;
        place-items: center;    
    }
}
`;
export const title = css`
display: flex;
justify-content: space-between;
align-items: center;
gap: 8px;
cursor: pointer;

`;
export const foldersItem = (theme: MantineTheme) => css`
padding: 12px 16px;
border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
&:last-of-type{
    border:0;
}
&:hover{
    background-color: ${theme.colors["neutrals-01"][1]};
    cursor: pointer;
}
`;
export const createButton = css`
padding:24px 16px;
`;
