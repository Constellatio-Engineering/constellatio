import { css } from "@emotion/react";
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

  > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing["spacing-8"]};
    padding: ${({ theme }) => theme.spacing["spacing-16"]};
    flex: 1 0 0;
    border-radius: ${({ theme }) => theme.radius["radius-12"]};
    border: 1px solid ${({ theme }) => theme.colors["neutrals-01"][3]};
    background-color: ${({ theme }) => theme.colors["neutrals-01"][2]};
  }
`;

export const Options = styled.div<{ status: "win" | "lose" | "inprogress" }>`
  position: relative;
  > div > .richtextOverwrite {
    > * {
      padding-bottom: ${({ status }) => (status === "lose" ? "16px" : "8px")};
    }
  }
`;

export const stylesOverwrite = css`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ul,
  ol {
    li {
      padding-bottom: 8px;
    }
  }

  .richtextOverwrite {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    font-style: normal;
  }
`;
