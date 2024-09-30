import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    padding: 20px 32px;
    background: ${colooors["neutrals-01"][0]};
    border-bottom: 1px solid ${colooors["neutrals-01"][3]};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
`;
