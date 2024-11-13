import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = () => css`
  background-color: ${colooors["neutrals-01"][0]};
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0px 8px 44px 0px rgba(0, 0, 0, 0.04);
`;

export const uploadedMaterialBlockHead = () => css`
  color: ${colooors["neutrals-02"][0]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
  }
  h4{
    color: ${colooors["neutrals-02"][1]};
  }
  padding: 24px;
  border-bottom: 1px solid ${colooors["neutrals-01"][2]};
`;

export const filesCount = css`
  color: ${colooors["neutrals-01"][7]};
`;

export const badge = css`
  width: 100%;
  height: 200px;
  position: relative;
  cursor: pointer;
  overflow: auto;
  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 200px;  cursor: pointer;
  }
  .uploadBtn {
    position: absolute;
    top: 31px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const uploader = (isVisible: boolean) => css`
  padding: 24px 24px 0;
  display: ${isVisible ? "block" : "none"};
`;

export const content = css`
  padding: 24px;
  max-width: 100%;
`;
