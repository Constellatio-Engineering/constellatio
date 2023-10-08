import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    .mantine-InputWrapper-root{
    margin-bottom: 12px;
    input{
        border-radius: 8px;
    }
    .mantine-Text-root{
        color: ${theme.colors["neutrals-01"][9]};
    }
}
form{
    margin-top: 32px;
    width: 440px;
    button{
        margin-top: 24px;
        width: 100%
    }
}
`;
