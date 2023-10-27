import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Pen } from "@/components/Icons/Pen";

import { Title } from "@mantine/core";
import React, { type FC } from "react";

import { Container, GameWrapper, TitleWrapper } from "./SolveCaseGame.styles";

export interface SolveCaseGameProps
{
  readonly onGameStartHandler: () => void;
}

export const SolveCaseGame: FC<SolveCaseGameProps> = ({ onGameStartHandler }) =>
{
  return (
    <Container>
      <TitleWrapper>
        <Pen/> <Title order={4}>Lösung verfassen</Title>
      </TitleWrapper>
      <GameWrapper>
        <BodyText component="p" styleType="body-01-regular">
          Sehr gut. Du hast die Schwerpunkte des Sachverhaltes erarbeitet.
        </BodyText>
        <div>
          <Button<"button"> styleType="primary" size="large" onClick={onGameStartHandler}>
            Jetzt starten!
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
