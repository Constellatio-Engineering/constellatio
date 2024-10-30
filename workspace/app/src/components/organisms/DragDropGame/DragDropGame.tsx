/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";
import { Gamification } from "@/components/Icons/Gamification";
import { Reload } from "@/components/Icons/Reload";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import { DragDropColumn } from "@/components/organisms/DragDropGame/DragDropColumn/DragDropColumn";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useDragDropGameStore, {
  type GameStatus,
  type TDragAndDropGameOptionType,
} from "@/stores/dragDropGame.store";
import { api } from "@/utils/api";

import { type IGenDragNDropGame } from "@constellatio/cms/generated-types";
import { shuffleArray } from "@constellatio/utils/array";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { LoadingOverlay, Title } from "@mantine/core";
import React, { type FC, useCallback, useMemo } from "react";

import {
  Container, Game, GameWrapper, LegendWrapper, TitleWrapper, 
} from "./DragDropGame.styles";

export type TDragDropGame = Pick<IGenDragNDropGame, "game" | "helpNote" | "question"> & {
  readonly caseId: string;
  readonly id: string;
};

export const DragDropGame: FC<TDragDropGame> = ({
  caseId,
  game,
  helpNote,
  id,
  question,
}) => 
{
  const { invalidateGamesProgress } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutate: setGameProgress } = api.gamesProgress.setGameProgress.useMutation({
    onError: (error) => console.error("Error while setting game progress", error),
    onSuccess: async () => invalidateGamesProgress({ caseId })
  });
  const {
    droppedItems,
    gameStatus,
    gameSubmitted,
    optionsItems,
    resultMessage
  } = useDragDropGameStore(s => s.getGameState({ caseId, gameData: game, gameId: id }));
  const updateGameState = useDragDropGameStore((s) => s.updateGameState);
  const gameOptions = game?.options;

  const originalOptions: TDragAndDropGameOptionType[] = useMemo(() =>
  {
    return gameOptions ?? [];
  }, [gameOptions]);

  const onDragEnd = useCallback((result: DropResult) =>
  {
    if(!result.destination)
    {
      return;
    }

    const { moveItem, reorderDroppedItems } = useDragDropGameStore.getState();

    if(result.source.droppableId === result.destination.droppableId)
    {
      reorderDroppedItems({
        gameId: id,
        itemSourceIndex: result.source.index,
        newPositionIndex: result.destination.index
      });
    }
    else
    {
      moveItem({
        gameId: id,
        itemSourceIndex: result.source.index,
        newPositionIndex: result.destination.index,
        to: "droppedItems"
      });
    }
  }, [id]);

  const checkWinCondition = (): boolean =>
  {
    const areAllDroppedItemsCorrect = droppedItems.every((item) => item.correctAnswer);
    const areAllOptionsItemsIncorrect = optionsItems.every((item) => !item.correctAnswer);
    return areAllDroppedItemsCorrect && areAllOptionsItemsIncorrect;
  };

  const correctAnswersOrder = originalOptions
    .filter((item) => item.correctAnswer)
    .sort((a, b) => a.originalIndex - b.originalIndex);

  const checkOrder = (): boolean => 
  {
    for(let i = 0; i < droppedItems.length; i++) 
    {
      if(droppedItems[i]?.id !== correctAnswersOrder[i]?.id) 
      {
        return false;
      }
    }
    return true;
  };

  const onGameFinishHandler = (): void => 
  {
    const winCondition = checkWinCondition();
    let gameStatus: GameStatus = "lose";

    if(game?.orderRequired) 
    {
      const orderCorrect = checkOrder();

      if(winCondition && orderCorrect)
      {
        gameStatus = "win";
        updateGameState({
          gameId: id,
          update: {
            gameStatus: "win",
            resultMessage: "Richtige Antwort",
          }
        });
      }
      else if(winCondition && !orderCorrect) 
      {
        gameStatus = "lose-wrong-order";
        updateGameState({
          gameId: id,
          update: {
            gameStatus: "lose-wrong-order",
            resultMessage: "Richtige Antwort, falsche Reihenfolge",
          }
        });
      }
      else 
      {
        gameStatus = "lose";
        updateGameState({
          gameId: id,
          update: {
            gameStatus: "lose",
            resultMessage: "Falsche Antwort",
          }
        });
      }
    }
    else 
    {
      if(winCondition) 
      {
        gameStatus = "win";
        updateGameState({
          gameId: id,
          update: {
            gameStatus: "win",
            resultMessage: "Richtige Antwort",
          }
        });
      }
      else 
      {
        gameStatus = "lose";
        updateGameState({
          gameId: id,
          update: {
            gameStatus: "lose",
            resultMessage: "Falsche Antwort",
          }
        });
      }
    }

    if(!gameSubmitted) 
    {
      // getNextGameIndex();
      updateGameState({
        gameId: id,
        update: { gameSubmitted: true }
      });
    }

    setGameProgress({
      gameId: id,
      gameResult: {
        correctAnswers: correctAnswersOrder,
        gameStatus,
        gameType: "DragDropGame",
        userAnswers: droppedItems
      },
      progressState: "completed"
    });
  };

  const onGameResetHandler = (): void => 
  {
    const originalOptionsShuffled = shuffleArray<TDragAndDropGameOptionType>(originalOptions);

    updateGameState({
      gameId: id,
      update: {
        droppedItems: [],
        gameStatus: "inprogress",
        optionsItems: originalOptionsShuffled,
        resultMessage: "",
      }
    });
  };

  let renderedOptionsItems = optionsItems;

  if(renderedOptionsItems.length === 0 && droppedItems.length === 0)
  {
    renderedOptionsItems = originalOptions;
  }

  return (
    <Container>
      <TitleWrapper>
        <Gamification/>
        <Title order={4}>
          Drag & Drop
        </Title>
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
              Richtig eingeordnet
            </BodyText>
            <BodyText component="p" styleType="body-01-regular">
              Falsch eingeordnet
            </BodyText>
          </LegendWrapper>
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <Game>
            <LoadingOverlay
              visible={optionsItems?.length === 0 && droppedItems?.length === 0}
              radius="radius-12"
            />
            <DragDropColumn
              gameId={id}
              gameStatus={gameStatus}
              columnType={"options"}
              isDraggingOverEnabled={false}
              isDropDisabled={true}
              items={renderedOptionsItems}
            />
            <DragDropColumn
              gameId={id}
              gameStatus={gameStatus}
              columnType={"dropped"}
              isDraggingOverEnabled={true}
              isDropDisabled={false}
              items={droppedItems}
            />
          </Game>
        </DragDropContext>
        {gameStatus !== "inprogress" && (
          <>
            <ResultCard
              hideCounter={true}
              droppedCorrectCards={droppedItems?.filter((item) => item.correctAnswer).length ?? null}
              totalCorrectCards={originalOptions.filter((item) => item.correctAnswer).length ?? null}
              variant={gameStatus === "win" ? "win" : "lose"}
              message={resultMessage ?? ""}
            />
            {helpNote?.json && <HelpNote data={helpNote}/>}
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
            disabled={gameStatus === "inprogress" && droppedItems.length < 1}>
            {gameStatus === "inprogress" ? "Antwort prüfen" : "Erneut lösen"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
