/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";
import { Gamification } from "@/components/Icons/Gamification";
import { Reload } from "@/components/Icons/Reload";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import { SelectionCard } from "@/components/molecules/SelectionCard/SelectionCard";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type IGenCardSelectionGame } from "@/services/graphql/__generated/sdk";
import useSelectionCardGameStore, { type TCardGameOption, } from "@/stores/selectionCardGame.store";
import { api } from "@/utils/api";

import { LoadingOverlay, Title } from "@mantine/core";
import React, { type FC, memo, useMemo } from "react";

import {
  Container, Game, GameWrapper, LegendWrapper, Options, TitleWrapper, 
} from "./SelectionCardGame.styles";

export type SelectionCardGameProps = Pick<IGenCardSelectionGame, "game" | "helpNote" | "question"> & {
  readonly caseId: string;
  readonly id: string;
};

let SelectionCardGame: FC<SelectionCardGameProps> = ({
  caseId,
  game,
  helpNote,
  id,
  question
}) => 
{
  const { invalidateGamesProgress } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutate: setGameProgress } = api.gamesProgress.setGameProgress.useMutation({
    onError: (error) => console.error("Error while setting game progress", error),
    onSuccess: async () => invalidateGamesProgress({ caseId })
  });
  const {
    checkedAnswersIds,
    gameStatus,
    gameSubmitted,
    resetCounter,
    resultMessage
  } = useSelectionCardGameStore((s) => s.getGameState({ caseId, gameId: id }));
  const updateGameState = useSelectionCardGameStore((s) => s.updateGameState);
  const toggleAnswer = useSelectionCardGameStore((s) => s.toggleAnswer);
  const gameOptions = game?.options;

  const originalOptions: TCardGameOption[] = useMemo(() =>
  {
    return gameOptions ?? [];
  }, [gameOptions]);

  const filteredCorrectAnswers = originalOptions?.filter((item) => item.correctAnswer);

  const checkWinCondition = (): boolean => 
  {
    const areAllCorrectAnswersChecked = filteredCorrectAnswers.every((item) => checkedAnswersIds.includes(item.id));
    const isAmountOfCheckedAnswersCorrect = checkedAnswersIds.length === filteredCorrectAnswers.length;

    return areAllCorrectAnswersChecked && isAmountOfCheckedAnswersCorrect;
  };

  const onGameFinishHandler = (): void => 
  {
    const winCondition = checkWinCondition();

    updateGameState({
      gameId: id,
      update: winCondition ? {
        gameStatus: "win",
        resultMessage: "Richtige Antwort" 
      } : {
        gameStatus: "lose",
        resultMessage: "Falsche Antwort"
      }
    });

    if(!gameSubmitted)
    {
      updateGameState({
        gameId: id,
        update: { gameSubmitted: true }
      });
    }

    setGameProgress({
      gameId: id,
      gameResult: {
        correct: winCondition,
        correctAnswers: filteredCorrectAnswers.map((item) => item.id),
        gameType: "SelectionCardGame",
        originalOptions,
        userAnswers: checkedAnswersIds
      },
      progressState: "completed" 
    });
  };

  const onGameResetHandler = (): void => 
  {
    updateGameState({
      gameId: id,
      update: {
        checkedAnswersIds: [],
        gameStatus: "inprogress",
        resetCounter: resetCounter + 1,
        resultMessage: ""
      }
    });
  };

  return (
    <Container>
      <TitleWrapper>
        <Gamification/> <Title order={4}>Multiple Choice</Title>
      </TitleWrapper>
      <GameWrapper>
        {question && (
          <BodyText component="p" styleType="body-01-regular">
            {question}
          </BodyText>
        )}
        {gameStatus !== "inprogress" && (
          <LegendWrapper>
            <BodyText component="p" styleType="body-01-regular">
              Richtig ausgewählt
            </BodyText>
            <BodyText component="p" styleType="body-01-regular">
              Falsch ausgewählt
            </BodyText>
          </LegendWrapper>
        )}
        <Game>
          <Options>
            <LoadingOverlay
              visible={originalOptions.length === 0}
              radius="radius-12"
            />
            {originalOptions.map((option) => (
              <SelectionCard
                onCheckHandler={() => toggleAnswer({ answerId: option.id, gameId: id })}
                key={`${option.id} - ${resetCounter}`}
                label={option.label}
                disabled={gameStatus !== "inprogress"}
                isChecked={checkedAnswersIds.includes(option.id)}
                // result={option.correctAnswer ? "Richtig" : "Falsch"}
                status={
                  gameStatus === "inprogress"
                    ? "default"
                    : option.correctAnswer
                      ? "success"
                      : !option.correctAnswer
                        ? "error"
                        : "default"
                }
              />
            ))}
          </Options>
        </Game>
        {gameStatus !== "inprogress" && (
          <>
            <ResultCard
              hideCounter={true}
              // droppedCorrectCards={filteredCorrectAnswers.filter((item) => item.checked).length ?? null}
              droppedCorrectCards={0}
              // totalCorrectCards={filteredCorrectAnswers.length ?? null}
              totalCorrectCards={0}
              variant={gameStatus}
              message={resultMessage}
            />
            {helpNote?.json && (
              <HelpNote data={helpNote}/>
            )}
          </>
        )}
        <div>
          <Button<"button">
            styleType="primary"
            size="large"
            leftIcon={gameStatus === "inprogress" ? <Check/> : <Reload/>}
            onClick={() =>
            {
              if(gameStatus === "inprogress")
              {
                onGameFinishHandler();
              }
              else
              {
                onGameResetHandler();
              }
            }}
            disabled={
              gameStatus === "inprogress" &&
              checkedAnswersIds.length === 0
            }>
            {gameStatus === "inprogress" ? "Antwort prüfen" : "Erneut lösen"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};

SelectionCardGame = memo(SelectionCardGame);

export default SelectionCardGame;
