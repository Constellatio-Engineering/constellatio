import styled from "@emotion/styled";

export const Column = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["spacing-8"]};
  padding: ${({ theme }) => theme.spacing["spacing-12"]};
  flex: 1 0 0;
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  border: 1px solid ${({ theme }) => theme.colors["neutrals-01"][3]};
  background-color: ${({ theme }) => theme.colors["neutrals-01"][2]};
`;
