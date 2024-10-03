import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: ${spaciiing["spacing-20"]};
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  border: 1px solid ${colooors["neutrals-01"][3]};
  background-color: ${colooors["neutrals-01"][1]};
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spaciiing["spacing-8"]};
`;

export const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 2px;
`;

export const RichTextWrapper = styled.div``;
