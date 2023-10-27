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
import useSelectionCardGameStore, {
  type TCardGameOption,
  type TCardGameOptionWithCheck,
} from "@/stores/selectionCardGame.store";
import { api } from "@/utils/api";
import { shuffleArray } from "@/utils/array";

import { Title, LoadingOverlay } from "@mantine/core";
import { type FC, useEffect, useMemo, memo } from "react";

import {
  Container,
  Game,
  GameWrapper,
  LegendWrapper,
  Options,
  TitleWrapper,
} from "./SelectionCardGame.styles";

export type SelectionCardGameProps = Pick<IGenCardSelectionGame, "game" | "helpNote" | "question" | "id"> & {
  readonly caseId: string;
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
  const gameState = useSelectionCardGameStore((s) => s.getGameState(id));
  const allGames = useSelectionCardGameStore((s) => s.games);
  const updateGameState = useSelectionCardGameStore((s) => s.updateGameState);
  const initializeNewGameState = useSelectionCardGameStore((s) => s.initializeNewGameState);

  useEffect(() => 
  {
    if(gameState == null && id != null) 
    {
      initializeNewGameState({ caseId, gameId: id });
    }
  }, [allGames, caseId, gameState, id, initializeNewGameState]);

  const optionsWithCheckProp: TCardGameOptionWithCheck[] = useMemo(() =>
    game?.options?.map((option: TCardGameOption) => ({
      ...option,
      checked: false,
    })), [game?.options]
  );

  useEffect(() => 
  {
    const optionsShuffled = shuffleArray<TCardGameOptionWithCheck>(optionsWithCheckProp);

    updateGameState({
      caseId,
      gameId: id!,
      update: { optionsItems: optionsShuffled }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsWithCheckProp]);

  if(!gameState || !id) 
  {
    return null;
  }

  const {
    gameStatus,
    gameSubmitted,
    optionsItems,
    resetCounter,
    resultMessage
  } = gameState ?? {};

  const filteredCorrectAnswers = optionsItems?.filter((item) => item.correctAnswer);

  const checkWinCondition = (): boolean => 
  {
    const checkedAnswers = optionsItems.filter((item) => item.checked);

    return (
      filteredCorrectAnswers.every((item) => item.checked) &&
			checkedAnswers.length === filteredCorrectAnswers.length
    );
  };

  const onGameFinishHandler = (): void => 
  {
    const winCondition = checkWinCondition();

    if(winCondition) 
    {
      updateGameState({
        caseId,
        gameId: id,
        update: { gameStatus: "win", resultMessage: "Sehr gut! Du hast die Frage richtig beantwortet." }
      });
    }
    else 
    {
      updateGameState({
        caseId,
        gameId: id,
        update: { gameStatus: "lose", resultMessage: "Deine Antwort war leider nicht korrekt." }
      });
    }

    if(!gameSubmitted)
    {
      updateGameState({
        caseId,
        gameId: id,
        update: { gameSubmitted: true }
      });
    }
  };

  const onGameResetHandler = (): void => 
  {
    const optionsShuffled = shuffleArray<TCardGameOptionWithCheck>(optionsWithCheckProp);

    updateGameState({
      caseId,
      gameId: id,
      update: {
        gameStatus: "inprogress",
        optionsItems: optionsShuffled,
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
        <LegendWrapper>
          <BodyText component="p" styleType="body-01-regular">
            Richtige Antwort
          </BodyText>
          <BodyText component="p" styleType="body-01-regular">
            Falsche Antwort
          </BodyText>
        </LegendWrapper>
        <Game>
          <Options>
            <LoadingOverlay
              visible={optionsItems.length < 1}
              radius="radius-12"
            />
            {optionsItems.map((option) => (
              <SelectionCard
                onCheckHandler={(e) => 
                {
                  const { checked } = e.target;

                  updateGameState({
                    caseId,
                    gameId: id,
                    update: {
                      optionsItems: optionsItems.map((item) =>
                      {
                        return item.id === option.id ? { ...item, checked } : item;
                      })
                    }
                  });
                }}
                key={`${option.id} - ${resetCounter}`}
                label={option.label}
                disabled={gameStatus !== "inprogress"}
                result={option.correctAnswer ? "Richtig" : "Falsch"}
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
              droppedCorrectCards={filteredCorrectAnswers.filter((item) => item.checked).length ?? null}
              totalCorrectCards={filteredCorrectAnswers.length ?? null}
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
                setGameProgress({ gameId: id, progressState: "completed" });
                onGameFinishHandler();
              }
              else
              {
                onGameResetHandler();
              }
            }}
            disabled={
              gameStatus === "inprogress" &&
							optionsItems.every((item) => !item.checked)
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
