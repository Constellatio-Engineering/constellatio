import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius["radius-12"]} ${({ theme }) => theme.radius["radius-12"]} 14.5px 14.5px;
  border: 1px solid ${({ theme }) => theme.colors["neutrals-01"][3]};
  background-color: ${({ theme }) => theme.colors["cc-cases"][4]};
`;

export const TitleWrapper = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing["spacing-16"]} ${({ theme }) => theme.spacing["spacing-20"]};
  gap: ${({ theme }) => theme.spacing["spacing-8"]};
  color: ${({ theme }) => theme.colors["neutrals-01"][0]};
`;

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing["spacing-24"]} ${({ theme }) => theme.spacing["spacing-20"]};
  gap: ${({ theme }) => theme.spacing["spacing-24"]};
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  background-color: ${({ theme }) => theme.colors["neutrals-01"][0]};
`;

export const Game = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing["spacing-12"]};
  position: relative;
  
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  > p {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing["spacing-4"]};

    &::before {
      content: "";
      display: inline-block;
      width: 11px;
      height: 11px;
      border: 1px solid transparent;
    }

    &:first-of-type::before {
      border-color: ${({ theme }) => theme.colors["support-success"][4]};
    }

    &:last-of-type::before {
      border-color: ${({ theme }) => theme.colors["support-error"][3]};
    }
  }
`;
