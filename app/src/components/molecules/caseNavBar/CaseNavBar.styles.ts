import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding:0 60px;
    height:72px;
    background-color: ${theme.colors["neutrals-01"][0]};
`;

export const tabs = css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

`;
export const tab = ({ active, completed, theme }: {active: boolean; completed?: boolean; theme: MantineTheme}): SerializedStyles => css`
    color: ${active ? "blue" : "black"};

    display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            color:${active || completed ? theme.colors["neutrals-02"][1] : theme.colors["cc-cases"][4]};
        span{
            background-color: ${active || completed ? theme.colors["cc-cases"][4] : theme.colors["cc-cases"][1]};
            width: 24px;
            height: 24px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            color: ${active || completed ? theme.colors["neutrals-01"][0] : theme.colors["cc-cases"][4]};
        }
`;
export const callToAction = css`
`;
