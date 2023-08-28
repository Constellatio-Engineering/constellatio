import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Pen } from "@/components/Icons/Pen";

import { Title } from "@mantine/core";
import React, { type FC } from "react";

import { Container, GameWrapper, TitleWrapper } from "./SolveCaseGame.styles";

interface TSolveCaseGame 
{
  readonly onGameStartHandler: () => void;
}

export const SolveCaseGame: FC<TSolveCaseGame> = ({ onGameStartHandler }) => 
{
  return (
    <Container>
      <TitleWrapper>
        <Pen/> <Title order={4}>Solve this case</Title>
      </TitleWrapper>
      <GameWrapper>
        <BodyText component="p" styleType="body-01-regular">
          Awesome job! Now, you’re ready to solve the case.
        </BodyText>
        <div>
          <Button<"button"> styleType="primary" size="large" onClick={onGameStartHandler}>
            Start solving this case
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
