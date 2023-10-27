import { type SerializedStyles, css } from "@emotion/react";
import type { MantineTheme } from "@mantine/styles";

export const wrapper = ({ theme, variant }: {
  theme: MantineTheme;
  variant: "case" | "dictionary";
}): SerializedStyles => css`
  position: relative;
  padding :0 60px;
  background: ${variant === "case"
    ? theme.colors["cc-cases"][2]
    : theme.colors["cc-dictionary"][2]};
  #overlay-lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    z-index: 2;
    color: ${variant === "case"
    ? theme.colors["cc-cases"][2]
    : theme.colors["cc-dictionary"][2]};
  }
  `;

export const body = css`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  min-width: 100%;
  padding: 100px 32px 100px 0;
  @media (max-width: 1100px) {
    padding: 60px 0;
    justify-content: center;
    text-align: center;
    gap: 32px;
  }
`;

export const bodyText = (theme: MantineTheme): SerializedStyles => css`
  width: 45%;
  .icons-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .bread-crumb {
    margin: 32px 0 8px 0;
    a {
      color: ${theme.colors["transparency-01"][5]};
      text-transform: uppercase;
    }
  }
  .title {
    color: ${theme.colors["transparency-02"][1]};
  }
  @media (max-width: 1100px) {
    width: 100%;
    .icons-bar {
    justify-content: center;
      }
        }
`;

export const bodyCard = css`
  width: 45%;
  min-width: 350px;
  max-width: 536px;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;
export const stepsBar = (theme: MantineTheme): SerializedStyles => css`
  position: relative;
  z-index: 2;
  background-color: ${theme.colors["neutrals-01"][0]};
  padding: 16px 32px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  .steps {
    display: flex;
    gap: 8px;
    justify-content: flex-start;
    align-items: center;
    .step {
      outline: 1px solid red;
      display: flex;
      gap: 8px;
      justify-content: flex-start;
      align-items: center;

      span {
        background-color: ${theme.colors["support-notice"][5]};
        color: ${theme.colors["neutrals-01"][0]};
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        border-radius: 50%;
      }
    }
  }
`;

export const container = css`
max-width: 1440px;
`;
