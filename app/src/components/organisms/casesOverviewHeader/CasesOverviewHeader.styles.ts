import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const contentHeader = ({ theme, variant }: {
  theme: MantineTheme;
  variant: "case" | "dictionary";
}) => css`
  position: relative;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  min-height: 70vh;
  background: ${variant === "case" ? theme.colors["cc-cases"][2] : theme.colors["cc-dictionary"][2]};
#overlay-lines{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  z-index: 2;
  color: ${variant === "case" ? theme.colors["cc-cases"][2] : theme.colors["cc-dictionary"][2]};
}
`;

export const categoriesButtons = () => 
{
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    position: relative;
    z-index: 3;
  `;
};

export const itemsList = () => css`
  transform: translateY(-150px);    position: relative;
    z-index: 3;
  .item {
    outline: 1px solid;
    padding: 16px;
    border-radius: 12px;
    height: 200px;
    width: 90%;
    margin: 32px auto;
  }
`;

export const filtersArea = () => 
{
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;    position: relative;
    z-index: 3;
  `;
};

export const filterButtons = css`
  background-color: transparent;
  border-radius: 100px;
  display: flex;
  gap: 4px;
  place-items: center;
  cursor: pointer;
  outline: 0;
  border: 0;
  &.reset {
    right: 2.5%;
  }
  &.dropdown {
    left: 2.5%;
  }    position: relative;
    z-index: 3;
`;

export const selectedFiltersArea = css`
  flex: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;    position: relative;
    z-index: 3;
`;
export const title = css`
    position: relative;
    z-index: 3;
`;
