import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";
import { IOverviewCard } from "./OverviewCard";

interface IOverviewCardStyles {
    variant: IOverviewCard["variant"];
    theme: MantineTheme;
}

export const wrapper = ({ variant, theme }: IOverviewCardStyles) => css`
  border-radius: 12px;
  height: 450px;
`;
export const topDetails = ({ variant, theme }: IOverviewCardStyles) => css`
  background-color: ${variant === "case"
        ? theme.colors["support-notice"][4]
        : theme.colors["cc-dictionary"][4]};
  padding: 16px 16px 32px 16px;
  border-radius: 12px 12px 0 0;
  color: ${theme.colors["neutrals-01"][0]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-side {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    & .views div,
    & .time div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
  }
  .right-side {
    display: flex;
    justify-content: center;
    align-items: center;
    gap:8px;
    span {
      color: ${theme.colors["transparency-02"][8]};
    }
  }
`;

export const cardBody = ({ variant, theme }: IOverviewCardStyles) => css`
border-radius: 12px;
background-color: white;
transform: translateY(-16px);
`;

export const row = ({ variant, theme }: IOverviewCardStyles) => css`
    padding:16px;
    color:green;
    border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
    .row-title{
        color: ${theme.colors["neutrals-01"][7]};
        display: flex;
        gap: 29px;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 8px;
    }
    .row-value{
        display: flex;
        /* gap difference in font size */
        gap: 24px;
        align-items: center;
        justify-content: flex-start;
        color: ${theme.colors["neutrals-02"][1]};
    }
`