import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
padding:32px;
border-radius: 8px;
background-color: ${theme.colors["neutrals-01"][0]};
display: flex;
justify-content: stretch;
align-items: flex-start;    
gap: 32px;
margin:24px 0;
position:relative;
z-index: 3;
/* color doesn't exist in Mantine Theme Colors array */
box-shadow: 0px 8px 44px 0px #0000000a;
span > table {
    width:100%;
    tbody tr:hover{
        div,td div, div button,td button{
            cursor: pointer;
            background-color: ${theme.colors["neutrals-01"][2]};
        }
    }
}

@media screen and (max-width: 1200px) {
    flex-direction: column;
    padding: 24px;
}
`;
export const expandTableButton = css`
    margin: 0 auto;
    display: block;
`;
const CSSCommonExpandButtonStyles = (theme: MantineTheme): SerializedStyles => css`
    content: "";
    position: absolute;
    width: 38%;
    background: ${theme.colors["neutrals-01"][3]};
    height: 2px;
    top: 50%;
`;

export const expandTableButtonArea = (theme: MantineTheme) => css`
    background-color: ${theme.colors["neutrals-01"][0]};
    position: relative;
    .linearGredient{
        content: "";
        position: absolute;
        width: 100%;
        background:linear-gradient(to bottom, transparent 0%,${theme.colors["neutrals-01"][0]} 100%) ;
        height: 350%;
        top: -350%;
    pointer-events: none;
        left: 0;
    }
    &::after{
        ${CSSCommonExpandButtonStyles(theme)}
    }
    &::before{
        right: 0;
        ${CSSCommonExpandButtonStyles(theme)}
    }
`;

export const topicCell = css`
min-width: 100px;
p{
    text-align: left;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
`;
