import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

import { type IEmptyStateCardProps } from "./EmptyStateCard";

interface IEmptyCardProps 
{
  isFiltered?: boolean;
  theme?: MantineTheme;
  variant?: IEmptyStateCardProps["variant"];
}

const CSSForTinyAreas = css`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 10px 20px;
`;

const CSSForSmallAreas = css`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 20px 50px;
`;

const CSSForLargeAreas = css`
  max-width: 450px;
  margin: 0 auto;
  padding: 50px 0;
`;

export const wrapper = css`
  margin: 0 auto;
`;

export const emptyStateCard = ({ variant }: IEmptyCardProps) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${variant === "For-tiny-areas" ? CSSForTinyAreas : ""};
  ${variant === "For-small-areas" ? CSSForSmallAreas : ""};
  ${variant === "For-large-areas" ? CSSForLargeAreas : ""};
`;

export const emptyStateCardImage = ({ variant }: IEmptyCardProps) => css`
  margin-bottom: ${variant === "For-tiny-areas" ? 4 : 20}px;
  margin-top: ${variant === "For-tiny-areas" ? -10 : 0}px;
`;

export const emptyStateCardTitle = ({ theme, variant }: IEmptyCardProps) => css`
  margin-bottom: ${variant === "For-tiny-areas" ? 8 : 16}px;
  color: ${variant === "For-large-areas" ? theme?.colors?.["neutrals-02"][1] : theme?.colors?.["neutrals-01"][9]};
`;

export const emptyStateCardText = ({ theme, variant }: IEmptyCardProps) => css`
  margin-bottom: ${variant === "For-tiny-areas" ? 8 : 24}px;
  color: ${theme?.colors["neutrals-01"][7]};
  padding: 0 20px;
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
