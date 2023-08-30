/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Draggable } from "@/components/helpers/Draggable";
import { Droppable } from "@/components/helpers/Droppable";
import { Check } from "@/components/Icons/Check";
import { Flag } from "@/components/Icons/Flag";
import { Gamification } from "@/components/Icons/Gamification";
import { Reload } from "@/components/Icons/Reload";
import { DragNDropCard } from "@/components/molecules/DraggableCard/DragNDropCard";
import { GhostDropCard } from "@/components/molecules/GhostDropCard/GhostDropCard";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import { type TValue } from "@/components/Wrappers/DndGame/DndGame";
import { type IGenDragNDrop } from "@/services/graphql/__generated/sdk";
import { shuffleArray } from "@/utils/array";

import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core";
import { Title, LoadingOverlay } from "@mantine/core";
import React, { type FC, useEffect, useMemo, useState } from "react";

import {
  Container,
  EmptyPlaceholder,
  Game,
  GameWrapper,
  LegendWrapper,
  Options,
  TitleWrapper,
} from "./DragDropGame.styles";

export type TDragDropGame = Pick<IGenDragNDrop, "game" | "helpNote" | "question">;

type TOptionType = TValue["options"][number];

export const DragDropGame: FC<TDragDropGame> = ({ game: { options, orderRequired }, helpNote, question }) =>
{
  const originalOptions: TOptionType[] = useMemo(() => options ?? [], [options]);
  const [optionsItems, setOptionsItems] = useState<TOptionType[]>([]);
  const [droppedItems, setDroppedItems] = useState<TOptionType[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | "inprogress">("inprogress");
  const [resultMessage, setResultMessage] = useState<string>("");

  useEffect(() =>
  {
    const optionsShuffled = shuffleArray<TOptionType>(originalOptions);
    setOptionsItems(optionsShuffled);
  }, [originalOptions]);

  const handleDragEnd = (event: DragEndEvent): void => 
  {
    const { active, over } = event;
    setActiveId(null);
    if(over && over.id === "droppable") 
    {
      const activeItem = optionsItems.find((item) => item.id === active.id);
      if(activeItem) 
      {
        setDroppedItems((items) => [...items, activeItem]);
        setOptionsItems((items) => items.filter((item) => item.id !== active.id));
      }
    }
  };

  const handleDragStart = (event: DragStartEvent): void => 
  {
    setActiveId(event.active.id.toString());
  };

  const checkWinCondition = (): boolean =>
    droppedItems.every((item) => item.correctAnswer) && optionsItems.every((item) => !item.correctAnswer);

  const checkOrder = (): boolean => 
  {
    const correctAnswersOrder = originalOptions.filter((item) => item.correctAnswer);

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

    if(orderRequired)
    {
      const orderCorrect = checkOrder();
      if(winCondition && orderCorrect) 
      {
        setGameStatus("win");
        setResultMessage("Congrats! all answers are correct!");
      }
      else if(winCondition && !orderCorrect) 
      {
        setGameStatus("lose");
        setResultMessage("You have all correct answers but in wrong order!");
      }
      else 
      {
        setGameStatus("lose");
        setResultMessage("Answers are incorrect!");
      }
    }
    else 
    {
      if(winCondition) 
      {
        setGameStatus("win");
        setResultMessage("Congrats! all answers are correct!");
      }
      else 
      {
        setGameStatus("lose");
        setResultMessage("Answers are incorrect!");
      }
    }
  };

  const onGameResetHandler = (): void => 
  {
    const originalOptionsShuffled = shuffleArray<TOptionType>(originalOptions);
    setOptionsItems(originalOptionsShuffled);
    setGameStatus("inprogress");
    setDroppedItems([]);
  };

  return (
    <Container>
      <TitleWrapper>
        <Gamification/> <Title order={4}>Drag all correct answers into the box on the right</Title>
      </TitleWrapper>
      <GameWrapper>
        {question && (
          <BodyText component="p" styleType="body-01-regular">
            {question}
          </BodyText>
        )}
        <LegendWrapper>
          <BodyText component="p" styleType="body-01-regular">
            Correct answer
          </BodyText>
          <BodyText component="p" styleType="body-01-regular">
            Incorrect answer
          </BodyText>
        </LegendWrapper>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <Game>
            <Options>
              <LoadingOverlay visible={optionsItems.length < 1} radius="radius-12"/>
              {optionsItems.map((option) =>
                gameStatus === "inprogress" ? (
                  <Draggable key={option.id} id={option.id}>
                    <DragNDropCard label={option.label} status="default"/>
                  </Draggable>
                ) : (
                  <DragNDropCard
                    key={option.id}
                    label={option.label}
                    status={option.correctAnswer ? "success" : "error"}
                    result={option.correctAnswer ? "Correct" : "Incorrect"}
                  />
                ),
              )}
              <DragOverlay
                className="drag-overlay"
                style={{
                  opacity: 0.7,
                  transform: "translate3d(0, 0, 0)",
                  zIndex: 1,
                }}>
                {activeId && (
                  <DragNDropCard
                    label={optionsItems.find((item) => item.id === activeId)?.label}
                    id={activeId}
                    status="default"
                  />
                )}
              </DragOverlay>
            </Options>
            <Droppable>
              {droppedItems.length < 1 ? (
                activeId ? (
                  <GhostDropCard/>                                
                ) : (
                  <EmptyPlaceholder>
                    <Flag/>
                    <BodyText component="p" align="center" styleType="body-02-medium">
                      Drag and drop correct answers from the left column
                    </BodyText>
                  </EmptyPlaceholder>
                )
              ) : (
                droppedItems.map((item) => 
                {
                  return gameStatus === "inprogress" ? (
                    <DragNDropCard
                      key={item.id}
                      label={item.label}
                      id={item.id}
                      status="default"
                      dropped
                      onDeleteHandler={() => 
                      {
                        setDroppedItems((items) => items.filter((i) => i.id !== item.id));
                        setOptionsItems((items) => [...items, item]);
                      }}
                    />
                  ) : (
                    <DragNDropCard
                      key={item.id}
                      label={item.label}
                      id={item.id}
                      dropped
                      status={item.correctAnswer ? "success" : "error"}
                      result={item.correctAnswer ? "Correct" : "Incorrect"}
                    />
                  );
                })
              )}
            </Droppable>
          </Game>
        </DndContext>
        {gameStatus !== "inprogress" && (
          <>
            <ResultCard
              droppedCorrectCards={droppedItems.filter((item) => item.correctAnswer).length ?? null}
              totalCorrectCards={originalOptions.filter((item) => item.correctAnswer).length ?? null}
              variant={gameStatus}
              message={resultMessage}
            />
            {helpNote?.richTextContent?.json && <HelpNote richTextContent={helpNote?.richTextContent}/>}
          </>
        )}
        <div>
          
          <Button<"button">
            styleType="primary"
            size="large"
            leftIcon={gameStatus === "inprogress" ? <Check/> : <Reload/>}
            onClick={gameStatus === "inprogress" ? onGameFinishHandler : onGameResetHandler}
            disabled={gameStatus === "inprogress" && droppedItems.length < 1}>
            {gameStatus === "inprogress" ? "Check my answers" : "Solve again"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
