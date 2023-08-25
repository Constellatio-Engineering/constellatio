import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const wrapper = css``;
export const contentHeader = (theme: MantineTheme) => css`
  height: 80vh;
  position:relative;
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

export const filtersButton = (theme: MantineTheme) => css`
  background-color: ${theme.colors[`neutrals-01`][0]};
  padding: 8px 16px;
  border-radius: 100px;
  display: flex;
  gap: 4px;
  place-items: center;
  position:absolute;
  bottom: 150px;
  left:5%;
  cursor: pointer;
`;
