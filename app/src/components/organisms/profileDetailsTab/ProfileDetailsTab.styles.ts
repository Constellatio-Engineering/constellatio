import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
        width: 440px;
    .mantine-InputWrapper-root{
    margin-bottom: 12px;
    input{
        border-radius: 8px;
    }
    .mantine-Text-root{
        color: ${theme.colors["neutrals-01"][9]};
    }
}
h3{
    margin-bottom: 24px;
}
form{
    margin-top: 24px;
    display:inline-block;
    width: 100%;
    button{
        margin-top: 24px;
        width: 100%
    }
}
@media screen and (max-width: 1024px) {
        margin: 0 auto;
    }

`;
