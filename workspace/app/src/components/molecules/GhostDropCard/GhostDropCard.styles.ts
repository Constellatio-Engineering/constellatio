import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import styled from "@emotion/styled";

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaciiing["spacing-8"]};
  padding: ${spaciiing["spacing-12"]};
  border-radius: ${({ theme }) => theme.radius["radius-8"]};
  border: 1px solid ${colooors["neutrals-01"][3]};
  background-color: ${colooors["neutrals-01"][3]};
  color: ${colooors["neutrals-01"][7]};
  width: 286px;
`;
