import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
padding: 16px;
border-bottom:1px solid ${theme.colors["neutrals-01"][2]};

display:flex;
justify-content:space-between;
align-items:center;
p{
svg{
    vertical-align: text-bottom;
    margin-right: 8px;
}
max-width: 240px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
.failed-text{
    svg{
        vertical-align: text-bottom;
    }
    color:${theme.colors["support-error"][3]};

}
`;
