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

export const emptyStateCard = ({ variant }: IEmptyCardProps) => css`
  height: 500px;
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

export const emptyStateCardTitle = css`
  margin-bottom: 16px;
`;
export const emptyStateCardText = ({ theme, variant }: IEmptyCardProps) => css`
  margin-bottom: 40px;
  color: ${variant === "For-small-areas"
    ? theme?.colors["neutrals-01"][7]
    : theme?.colors["neutrals-01"][9]};
`;
export const callToAction = css`
  svg {
    margin-right: 4px;
  }
`;