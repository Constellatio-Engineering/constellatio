import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing["spacing-20"]};
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  border: 1px solid ${({ theme }) => theme.colors["neutrals-01"][3]};
  background-color: ${({ theme }) => theme.colors["neutrals-01"][1]};
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing["spacing-8"]};
`;

export const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 2px;
`;

export const RichTextWrapper = styled.div``;
