import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
    width: 100%;
`;
export const title = (theme: MantineTheme) => css`
color: ${colooors["neutrals-02"][1]};
margin-bottom:32px;
@media screen and (max-width: 1100px) {
    display: none;
}
`;
