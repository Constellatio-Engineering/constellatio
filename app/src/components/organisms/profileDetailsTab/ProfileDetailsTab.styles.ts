import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  width: 440px;

  .mantine-InputWrapper-root {
    input, select, .mantine-PasswordInput-input {
      border-radius: 8px;
      height: 48px;
      display: grid;
      place-items: center;
    }

    .mantine-Input-rightSection {
      svg {
        transform: translateY(6px);
      }
    }

    .mantine-InputWrapper-label {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        color: ${colooors["neutrals-01"][7]};
      }
    }
  }

  h3 {
    margin-bottom: 24px;
  }

  form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;

    .mantine-Button-root {
      width: 100%;
      margin-top: 8px;
    }
  }

  @media screen and (max-width: 1100px) {
    margin: 0 auto;
  }
`;

export const contentDisabled = css`
  user-select: none;
  pointer-events: none;
  opacity: 0.4;
`;

export const profileDetailsTabTitle = css`
  display: block;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
export const changePasswordTitle = css`
  display: block;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
