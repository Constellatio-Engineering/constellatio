import { BodyText } from "@/components/atoms/BodyText/BodyText";
import React, { FC } from "react";
import { Container, GameWrapper, TitleWrapper } from "./SolveCaseGame.styles";
import { Button } from "@/components/atoms/Button/Button";
import { Title } from "@mantine/core";
import { Pen } from "@/components/Icons/Pen";

type TSolveCaseGame = {
  onGameStartHandler: () => void;
};

export const SolveCaseGame: FC<TSolveCaseGame> = ({ onGameStartHandler }) => {
  return (
    <Container>
      <TitleWrapper>
        <Pen /> <Title order={4}>Solve this case</Title>
      </TitleWrapper>
      <GameWrapper>
        <BodyText component="p" styleType="body-01-regular">
          Awesome job! Now, you’re ready to solve the case.
        </BodyText>
        <div>
          <Button styleType="primary" size="large" onClick={onGameStartHandler}>
            Start solving this case
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
