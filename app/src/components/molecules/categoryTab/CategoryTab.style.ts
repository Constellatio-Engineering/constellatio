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

background-color: ${theme.colors["neutrals-01"][0]};
color: ${theme.colors["neutrals-02"][1]};
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
    background-color: ${theme.colors["neutrals-02"][1]};
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
    background-color: ${theme.colors["neutrals-01"][2]};
border-radius: 12px;
    color: ${theme.colors["neutrals-02"][1]};
    .icon{
        background-color: ${theme.colors["neutrals-02"][1]};
    }
}
&:active{
    background-color: ${theme.colors["neutrals-01"][3]};
}
&.selected{
    background-color: ${theme.colors["neutrals-02"][1]};
    color: ${theme.colors["neutrals-01"][0]};

    .icon{
        background-color: ${theme.colors["neutrals-02"][2]};
    }
}
`;
