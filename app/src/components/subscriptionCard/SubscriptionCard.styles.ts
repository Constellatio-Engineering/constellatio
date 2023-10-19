import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background: ${theme.colors["neutrals-01"][0]};
    padding: 24px;
 margin: 32px 0;
 border-radius: 12px;
 border: 1px solid ${theme.colors["neutrals-01"][3]};

`;
export const discountBadge = (theme: MantineTheme) => css`
    padding: 4px 8px;
    background: ${theme.colors["brand-02"][4]};
    color: ${theme.colors["neutrals-02"][1]};
    margin-bottom:32px ;
    display: inline-block;
    border-radius: 12px;
`;
export const price = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-02"][1]};
`
export const totalPrice = css`
/* Couldn't find it's typography */
font-size: 44px;
font-style: normal;
font-weight: 500;
line-height: 68px; /* 154.545% */
margin-right: 16px;
`;
export const undiscountedPrice = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-01"][7]};
    text-decoration: line-through;
    margin-right: 8px;

`
