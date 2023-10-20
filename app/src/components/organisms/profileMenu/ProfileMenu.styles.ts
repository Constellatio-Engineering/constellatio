import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  width: 320px;
  min-width: 320px;
  background-color: ${theme.colors["neutrals-01"][0]};
  border-radius: 12px;
  box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
  margin-top: -220px;
  z-index: 3;
  position: relative;
  
  @media screen and (max-width: 1024px) {
    margin-top: -250px;
    width: 100%;
    }
`;
export const profileInfo = css`
  text-align: center;
  padding: 16px 24px;
`;
export const profileImageWrapper = css`
  position: relative;
  svg {
    position: absolute;
    color: white;
    top: 70px;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }
  span {
    pointer-events: none;
    display: none;
    content: "";
    position: absolute;
    width: 90px;
    height: 90px;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 40%;
      background: rgba(0, 0, 0, 0.5);
      bottom: 0px;
      left: 0px;
    }
  }
  img:hover + span + svg {
    display: block;
    pointer-events: none;
  }
  img:hover + span {
    display: block;
  }
`;
export const profileNameHandler = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][7]};
`;
export const profileImage = css`
  width: 90px;
  height: 90px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
`;
export const profileName = css`
  margin-top: 8px;
  width: 100%;
`;
export const profileNameText = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][1]};
`;
export const tabsList = css``;
export const groupedLinks = css`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
