import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    background: ${colooors["neutrals-01"][0]};
    margin-top: 36px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
`;
