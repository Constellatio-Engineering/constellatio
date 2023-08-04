import styled from "@emotion/styled";

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing["spacing-8"]};
  padding: ${({ theme }) => theme.spacing["spacing-12"]};
  border-radius: ${({ theme }) => theme.radius["radius-8"]};
  border: 1px solid ${({ theme }) => theme.colors["neutrals-01"][3]};
  background-color: ${({ theme }) => theme.colors["neutrals-01"][3]};
  color: ${({ theme }) => theme.colors["neutrals-01"][7]};
  width: 286px;
`;
