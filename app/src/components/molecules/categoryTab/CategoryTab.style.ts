import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

import { type } from "os";

type ICategoryTabStyleProps =
    {
      theme: MantineTheme;
      variant?: "case" | "dictionary" | "red";
    };

export const wrapper = ({ theme, variant }: ICategoryTabStyleProps) => css`
outline: 0;
border: 0;

background-color: ${variant === "case" ? "transparent" : variant === "dictionary" ? "transparent" : variant === "red" ? theme.colors["neutrals-02"][1] : "transparent"};
color: ${variant === "case" ? theme.colors["neutrals-02"][1] : variant === "dictionary" ? theme.colors["neutrals-02"][1] : variant === "red" ? theme.colors["neutrals-01"][0] : theme.colors["neutrals-02"][1]};
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
    background-color: ${variant === "case" ? theme.colors["neutrals-02"][1] : variant === "dictionary" ? theme.colors["neutrals-02"][1] : variant === "red" ? theme.colors["neutrals-02"][0] : "blue"};
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
    background-color: ${theme.colors["neutrals-01"][1]};
border-radius: 12px;
    color: ${theme.colors["neutrals-02"][1]};
    .icon{
        background-color: ${theme.colors["neutrals-02"][1]};
    }
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
