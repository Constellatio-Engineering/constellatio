import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
`;

export const uploadedMaterialBlockHead = (theme: MantineTheme) => css`
  color: ${theme.colors["neutrals-02"][0]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
  }
  h4{
    color: ${theme.colors["neutrals-02"][1]};
  }
  padding: 24px;
  border-bottom: 1px solid ${theme.colors["neutrals-01"][2]};
`;

export const filesCount = css`
  color: ${colors["neutrals-01"][7]};
`;

export const badge = css`
  width: 100%;
  height: 300px;
  position: relative;
  cursor: pointer;
  overflow: auto;
  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 300px;  cursor: pointer;
  }
  .uploadBtn {
    position: absolute;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const uploader = (isVisible: boolean) => css`
  padding: 24px;
  display: ${isVisible ? "block" : "none"};
`;

export const content = css`
  padding: 24px;
  max-width: 100%;
`;
