import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

type ICategoryTabStyleProps = {
  theme: MantineTheme;
  variant?: "case" | "dictionary" | "red";
};

export const wrapper = ({ theme }: ICategoryTabStyleProps) => css`
  outline: 0;
  border: 0;

  background-color: ${theme.colors["neutrals-01"][0]};
  color: ${theme.colors["neutrals-02"][1]};
  /* progressive/body/body-01@medium */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;

  .icon {
    margin-right: 16px;
    width: 40px;
    height: 40px;
    background-color: ${theme.colors["neutrals-02"][1]};
    color: white;
    display: grid;
    place-items: center;
    border-radius: 50%;
  }
  .counter {
    color: ${theme.colors["neutrals-01"][7]};
  }
  &:hover {
    background-color: ${theme.colors["neutrals-01"][2]};
    border-radius: 12px;
    color: ${theme.colors["neutrals-02"][1]};
    .icon {
      background-color: ${theme.colors["neutrals-02"][1]};
    }
  }
  &:active {
    background-color: ${theme.colors["neutrals-01"][3]};
  }
  &.selected {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: calc(100% + 6px);
      height: calc(100% + 6px);
      top: -3px;
      left: -3px;
      border-radius: 14px;
      outline: 2px solid white;
    }
  }
`;
