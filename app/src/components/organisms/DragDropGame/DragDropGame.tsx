/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";
import { Gamification } from "@/components/Icons/Gamification";
import { Reload } from "@/components/Icons/Reload";
import { DragNDropCard } from "@/components/molecules/DraggableCard/DragNDropCard";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type IGenDragNDropGame } from "@/services/graphql/__generated/sdk";
import useDragDropGameStore, {
  type TDragAndDropGameOptionType,
} from "@/stores/dragDropGame.store";
import { api } from "@/utils/api";
import { shuffleArray } from "@/utils/array";

import {
  DragDropContext, Draggable,
  type DraggableProvided,
  type DraggableStateSnapshot,
  Droppable,
  type DroppableProvided,
  type DroppableStateSnapshot,
  type DropResult
} from "@hello-pangea/dnd";
import { Title, LoadingOverlay } from "@mantine/core";
import React, { type FC, useCallback, useEffect, useMemo } from "react";

import { Column } from "./Column/Column";
import {
  Container,
  EmptyPlaceholder,
  Game,
  GameWrapper,
  LegendWrapper,
  Options,
  TitleWrapper,
} from "./DragDropGame.styles";

export type TDragDropGame = Pick<IGenDragNDropGame, "game" | "helpNote" | "question" | "id"> & {
  readonly caseId: string;
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
  const gameState = useDragDropGameStore((s) => s.getGameState(id));
  const allGames = useDragDropGameStore((s) => s.games);
  const updateGameState = useDragDropGameStore((s) => s.updateGameState);
  const initializeNewGameState = useDragDropGameStore((s) => s.initializeNewGameState);

  useEffect(() =>
  {
    if(gameState == null && id != null) 
    {
      initializeNewGameState({ caseId, gameId: id });
    }
  }, [allGames, caseId, gameState, id, initializeNewGameState]);

  const originalOptions: TDragAndDropGameOptionType[] = useMemo(
    () => game?.options ?? [],
    [game?.options]
  );

  useEffect(() => 
  {
    const optionsShuffled = shuffleArray<TDragAndDropGameOptionType>(originalOptions);
    updateGameState({
      caseId,
      gameId: id!,
      update: { optionsItems: optionsShuffled }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalOptions]);

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
        gameId: id!,
        itemSourceIndex: result.source.index,
        newPositionIndex: result.destination.index
      });
    }
    else
    {
      moveItem({
        gameId: id!,
        itemSourceIndex: result.source.index,
        newPositionIndex: result.destination.index,
        to: "droppedItems"
      });
    }
  }, [id]);

  if(!gameState || !id) 
  {
    return null;
  }

  const {
    droppedItems,
    gameStatus,
    gameSubmitted,
    optionsItems,
    resultMessage,
  } = gameState;

  const checkWinCondition = (): boolean =>
    droppedItems.every((item) => item.correctAnswer) &&
		optionsItems.every((item) => !item.correctAnswer);

  const checkOrder = (): boolean => 
  {
    const correctAnswersOrder = originalOptions.filter(
      (item) => item.correctAnswer
    );

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

    if(game?.orderRequired) 
    {
      const orderCorrect = checkOrder();
      if(winCondition && orderCorrect) 
      {
        updateGameState({
          caseId,
          gameId: id,
          update: {
            gameStatus: "win",
            resultMessage: "Sehr gut! Du hast die Frage richtig beantwortet.",
          }
        });
      }
      else if(winCondition && !orderCorrect) 
      {
        updateGameState({
          caseId,
          gameId: id,
          update: {
            gameStatus: "lose",
            resultMessage: "Leider hast du die Antwortmöglichkeiten nicht korrekt angeordnet.",
          }
        });
      }
      else 
      {
        updateGameState({
          caseId,
          gameId: id,
          update: {
            gameStatus: "lose",
            resultMessage: "Deine Antwort war leider nicht korrekt.",
          }
        });
      }
    }
    else 
    {
      if(winCondition) 
      {
        updateGameState({
          caseId,
          gameId: id,
          update: {
            gameStatus: "win",
            resultMessage: "Sehr gut! Du hast die Frage richtig beantwortet.",
          }
        });
      }
      else 
      {
        updateGameState({
          caseId,
          gameId: id,
          update: {
            gameStatus: "lose",
            resultMessage: "Deine Antwort war leider nicht korrekt.",
          }
        });
      }
    }

    if(!gameSubmitted) 
    {
      // getNextGameIndex();
      updateGameState({
        caseId,
        gameId: id,
        update: { gameSubmitted: true }
      });
    }
  };

  const onGameResetHandler = (): void => 
  {
    const originalOptionsShuffled = shuffleArray<TDragAndDropGameOptionType>(originalOptions);

    updateGameState({
      caseId,
      gameId: id,
      update: {
        droppedItems: [],
        gameStatus: "inprogress",
        optionsItems: originalOptionsShuffled,
        resultMessage: "",
      }
    });
  };

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
        <LegendWrapper>
          <BodyText component="p" styleType="body-01-regular">
            Richtige Antwort
          </BodyText>
          <BodyText component="p" styleType="body-01-regular">
            Falsche Antwort
          </BodyText>
        </LegendWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Game>
            <Column>
              <Droppable
                droppableId={"options"}
                type={"dndGameColumn"}
                isDropDisabled={true}
                isCombineEnabled={false}>
                {(dropProvided: DroppableProvided, _dropSnapshot: DroppableStateSnapshot) => (
                  <div {...dropProvided.droppableProps}>
                    <div ref={dropProvided.innerRef}>
                      {optionsItems.map((optionItem, index) => (
                        <Draggable key={optionItem.id} draggableId={optionItem.id} index={index}>
                          {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                            <DragNDropCard
                              dropped={false}
                              status={"default"}
                              label={optionItem.label}
                              id={optionItem.id}
                              index={index}
                              key={optionItem.id}
                              isDragging={dragSnapshot.isDragging}
                              provided={dragProvided}
                            />
                          )}
                        </Draggable>
                      ))}
                      {dropProvided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </Column>
            <Column>
              <Droppable
                droppableId={"submitted"}
                type={"dndGameColumn"}
                isCombineEnabled={false}>
                {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
                  <div
                    {...dropProvided.droppableProps}
                    style={{
                      backgroundColor: dropSnapshot.isDraggingOver ? "rgba(0,0,0,0.05)" : "transparent",
                      height: "100%",
                    }}>
                    <div
                      ref={dropProvided.innerRef}
                      style={{
                        height: "100%",
                      }}>
                      {droppedItems.map((optionItem, index) => (
                        <Draggable key={optionItem.id} draggableId={optionItem.id} index={index}>
                          {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                            <DragNDropCard
                              dropped={true}
                              status={"default"}
                              label={optionItem.label}
                              id={optionItem.id}
                              index={index}
                              key={optionItem.id}
                              isDragging={dragSnapshot.isDragging}
                              provided={dragProvided}
                            />
                          )}
                        </Draggable>
                      ))}
                      {dropProvided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </Column>
          </Game>
        </DragDropContext>
        {gameStatus !== "inprogress" && (
          <>
            <ResultCard
              droppedCorrectCards={
                droppedItems?.filter((item) => item.correctAnswer).length ??
								null
              }
              totalCorrectCards={
                originalOptions.filter((item) => item.correctAnswer).length ??
								null
              }
              variant={gameStatus}
              message={resultMessage}
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
                setGameProgress({ gameId: id, progressState: "completed" });
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
