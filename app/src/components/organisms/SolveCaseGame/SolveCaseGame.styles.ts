import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius["radius-12"]} ${({ theme }) => theme.radius["radius-12"]} 14.5px 14.5px;
  border: 1px solid ${colooors["neutrals-01"][3]};
  background-color: ${colooors["cc-cases"][4]};
`;

export const TitleWrapper = styled.div`
  display: flex;
  padding: ${spaciiing["spacing-16"]} ${spaciiing["spacing-20"]};
  gap: ${spaciiing["spacing-8"]};
  color: ${colooors["neutrals-01"][0]};
`;

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spaciiing["spacing-24"]} ${spaciiing["spacing-20"]};
  gap: ${spaciiing["spacing-24"]};
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  background-color: ${colooors["neutrals-01"][0]};
`;

