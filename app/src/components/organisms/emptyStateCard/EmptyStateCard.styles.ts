import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

import { type IEmptyStateCardProps } from "./EmptyStateCard";

interface IEmptyCardProps 
{
  isFiltered?: boolean;
  theme?: MantineTheme;
  variant?: IEmptyStateCardProps["variant"];
}

const CSSForSmallAreas = css`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
`;
const CSSForLargeAreas = css`
  max-width: 450px;
  margin: 0 auto;
`;

export const wrapper = (theme: MantineTheme) => css`
  /* background-color: ${theme?.colors["neutrals-01"][2]}; */
`;

export const emptyStateCard = ({ theme, variant }: IEmptyCardProps) => css`
  padding: ${variant === "For-small-areas" ? "32px 20px 40px 20px" : "32px 0"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${variant === "For-small-areas" ? CSSForSmallAreas : CSSForLargeAreas};
`;

export const emptyStateCardImage = ({ variant }: IEmptyCardProps) => css`
  margin-bottom: ${variant === "For-small-areas" ? "32px" : "40px"};
`;

export const emptyStateCardTitle = ({ theme, variant }: IEmptyCardProps) => css`
  margin-bottom: 16px;
  color: ${variant === "For-large-areas" ? theme?.colors?.["neutrals-02"][1] : theme?.colors?.["neutrals-01"][9]};
`;

export const emptyStateCardText = ({ theme, variant }: IEmptyCardProps) => css`
  margin-bottom: 40px;
  color: ${variant === "For-small-areas"
    ? theme?.colors["neutrals-01"][7]
    : theme?.colors["neutrals-01"][9]};
`;
export const callToAction = ({ theme }: IEmptyCardProps) => css`
    color: ${theme?.colors["neutrals-01"][0]};
  & * {
    color: ${theme?.colors["neutrals-01"][0]};
  }
  svg {
    margin-right: 4px;
  }
`;
