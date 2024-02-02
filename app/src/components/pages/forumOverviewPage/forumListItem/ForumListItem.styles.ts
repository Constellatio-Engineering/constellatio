import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const wrapper = css`
  padding: 24px;
  background-color: ${colors["neutrals-01"][0]};
  border-radius: 12px;
  border: 1px solid ${colors["neutrals-01"][4]};
  overflow: hidden;
  min-height: 100vh;
`;
