import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import { css } from "@emotion/react";
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

export const Game = styled.div`
  display: flex;
  gap: ${spaciiing["spacing-12"]};

  > div {
    display: flex;
    flex-direction: column;
    gap: ${spaciiing["spacing-8"]};
    padding: ${spaciiing["spacing-16"]};
    flex: 1 0 0;
    border-radius: ${({ theme }) => theme.radius["radius-12"]};
    border: 1px solid ${colooors["neutrals-01"][3]};
    background-color: ${colooors["neutrals-01"][2]};
  }
`;

export const Options = styled.div`
  position: relative;
  > div > .richtextOverwrite {
    > * {
      padding-bottom: 8px;
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

export const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: -12px;

  > p {
    display: flex;
    align-items: center;
    gap: ${spaciiing["spacing-4"]};
    span {
      display: flex;
      align-items: center;
    }
  }
`;
