import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  width:320px;
  min-width:320px;
  background-color: ${theme.colors["neutrals-01"][0]};
  border-radius: 12px;
  box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
  transform: translateY(-170px);
  z-index: 3;
  position: relative;
`;
export const profileInfo = css`
  text-align: center;
  padding: 16px 24px;
`;
export const profileImageWrapper = css`
  img {
    border-radius: 50%;
  }
`;
export const profileNameHandler = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-01"][7]};
`;
export const profileImage = css`
  width: 90px;
  height: 90px;
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