import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
outline: 0;
border: 0;

background-color: transparent;
color: #000;
/* progressive/body/body-01@medium */
display: flex;
justify-content: space-between;
align-items: center;
padding:12px 16px;
border-radius: 12px;

.icon{
    margin-right: 16px;
    width: 40px;
    height: 40px;
    background-color: #000;
    color: white;
    display: grid;
    place-items:   center;
    border-radius: 50%;
}
.counter{
    color: #949494;
    /* progressive/body/body-01@medium */
    font-family: Karla;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
}
&:hover{
    background-color: #F6F6F5;
}
&:active{
    background-color: #F0F0F0;
}
&.selected{
    background-color: ${theme.colors["neutrals-02"][1]};
    color:#fff;

    .icon{
        background-color: #303030;
    }
}
`;
