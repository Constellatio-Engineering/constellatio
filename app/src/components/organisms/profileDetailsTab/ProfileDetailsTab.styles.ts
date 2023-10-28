import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
        width: 440px;
    .mantine-InputWrapper-root{
    margin-bottom: 12px;
    input, select,.mantine-PasswordInput-input{
        border-radius: 8px;
        height: 48px;
        display: grid;
        place-items: center;
    }
   .mantine-Input-rightSection{
    svg{
        transform: translateY(6px);
    }
   }
   .mantine-InputWrapper-label{
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    span{
        color: ${theme.colors["neutrals-01"][7]};
    }
   }
}
h3{
    margin-bottom: 24px;
}
form{
    margin-top: 24px;
    display:inline-block;
    width: 100%;
    .mantine-Button-root {
        margin-top: 24px;
        width: 100%
    } 
}
@media screen and (max-width: 1100px) {
        margin: 0 auto;
    }

`;
