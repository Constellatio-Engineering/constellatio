import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const wrapper = css``;
export const contentHeader = (theme: MantineTheme) => css`
  height: 80vh;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  background: var(
    --gradients-fader-cases-radial,
    radial-gradient(
      50% 50% at 50% 50%,
      rgba(199, 211, 251, 0) 0%,
      ${theme.colors["cc-cases"][2]} 100%
    )
  );
`;
export const categoriesButtons = () => {
  return css`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  `;
};

export const itemsList = () => css`
  transform: translateY(-150px);
  .item {
    outline: 1px solid;
    padding: 16px;
    border-radius: 12px;
    height: 200px;
    width: 90%;
    margin: 32px auto;
  }
`;

export const filtersArea = () => {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
  `;
}

export const filterButtons = (theme: MantineTheme) => css`
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
  }
`;

export const selectedFiltersArea = css`
flex: .7;
display: flex;
justify-content:center;
align-items: center;
gap: 8px;
flex-wrap: wrap;
`;
