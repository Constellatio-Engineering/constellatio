import { colors } from "@/constants/styles/colors";

import { css } from "@emotion/react";

export const profilePicture = (hasProfilePicture: boolean) => css`
  border-radius: 100%;
  border: 1px solid ${colors["neutrals-01"][4]};
  padding: ${hasProfilePicture ? 0 : 3}px;
  object-fit: cover;
`;
