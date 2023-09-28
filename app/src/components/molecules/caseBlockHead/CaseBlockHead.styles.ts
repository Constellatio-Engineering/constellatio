import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
export const wrapper = css`
width: 240px;
`;

export const detailText = (theme: MantineTheme): SerializedStyles => css`
p{
    margin-top:10px;
}
color:${theme.colors["neutrals-01"][7]};
`;

export const iconWrapper = css`
pointer-events: none;
cursor: default;
`;

export const title = css`
width: 60%;
white-space: nowrap;
margin: 12px 0 24px 0;
`;
