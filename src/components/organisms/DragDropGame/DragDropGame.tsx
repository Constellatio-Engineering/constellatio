import { BodyText } from "@/components/atoms/BodyText/BodyText";
import React, { FC, useEffect, useState } from "react";
import { Container, EmptyPlaceholder, Game, GameWrapper, Options, TitleWrapper } from "./DragDropGame.styles";
import { Button } from "@/components/atoms/Button/Button";
import { Gamification } from "@/components/Icons/Gamification";
import { Loader, Title } from "@mantine/core";
import { DragNDropCard } from "@/components/atoms/DraggableCard/DragNDropCard";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Droppable } from "../../Helpers/Droppable";
import { Flag } from "@/components/Icons/Flag";
import { GhostDropCard } from "@/components/atoms/GhostDropCard/GhostDropCard";
import { IGenDragNDrop } from "@/services/graphql/__generated/sdk";
import { TValue } from "@/components/Wrappers/DndWrapper";
import { Check } from "@/components/Icons/Check";
import { Draggable } from "@/components/Helpers/Draggable";
import { Reload } from "@/components/Icons/Reload";
import { LoadingOverlay } from "@mantine/core";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";

type TDragDropGame = Pick<IGenDragNDrop, "game" | "helpNote">;

const shuffleOptions = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const DragDropGame: FC<TDragDropGame> = ({ game, helpNote }) => {
  const originalOptions = JSON.parse(JSON.stringify(game?.options));
  const [optionsItems, setOptionsItems] = useState<any[]>([]);
  const [droppedItems, setDroppedItems] = useState<any[]>([]);
  const [activeId, setActiveId] = useState(null);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | "inprogress">("inprogress");
  const [resultMessage, setResultMessage] = useState<string>("");

  useEffect(() => {
    setOptionsItems(shuffleOptions(originalOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && over.id === "droppable") {
      const activeItem = optionsItems.find((item) => item.id === active.id);
      if (activeItem) {
        setDroppedItems((items) => [...items, activeItem]);
        setOptionsItems((items) => items.filter((item) => item.id !== active.id));
      }
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const checkWinCondition = () =>
    droppedItems.every((item) => item.correctAnswer) && optionsItems.every((item) => !item.correctAnswer);

  const checkOrder = () => {
    const correctAnswersOrder = originalOptions?.filter((item) => item.correctAnswer)!;

    for (let i = 0; i < droppedItems.length; i++) {
      if (droppedItems[i].id !== correctAnswersOrder[i].id) {
        return false;
      }
    }
    return true;
  };

  const onGameFinishHandler = () => {
    const winCondition = checkWinCondition();

    if (game?.orderRequired) {
      const orderCorrect = checkOrder();
      if (winCondition && orderCorrect) {
        setGameStatus("win");
        setResultMessage("Congrats! all answers are correct!");
      } else if (winCondition && !orderCorrect) {
        setGameStatus("lose");
        setResultMessage("You have all correct answers but in wrong order!");
      } else {
        setGameStatus("lose");
        setResultMessage("Answers are incorrect!");
      }
    } else {
      if (winCondition) {
        setGameStatus("win");
        setResultMessage("Congrats! all answers are correct!");
      } else {
        setGameStatus("lose");
        setResultMessage("Answers are incorrect!");
      }
    }
  };

  const onGameResetHandler = () => {
    setGameStatus("inprogress");
    setOptionsItems(shuffleOptions(originalOptions));
    setDroppedItems([]);
  };

  return (
    <Container>
      <TitleWrapper>
        <Gamification /> <Title order={4}>Drag all correct answers into the box on the right</Title>
      </TitleWrapper>
      <GameWrapper>
        <BodyText component="p" styleType="body-01-regular">
          Based on the above definition of the term and its prerequisites: Which of the following {'"organizations"'}
          constitute companies in the sense of company law. Skim the respective norms!
        </BodyText>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <Game>
            <Options>
              <LoadingOverlay visible={optionsItems.length < 1} radius={"radius-12"} />
              {optionsItems.map((option) =>
                gameStatus === "inprogress" ? (
                  <Draggable key={option.id} id={option.id}>
                    <DragNDropCard label={option.label} status="default" />
                  </Draggable>
                ) : (
                  <DragNDropCard
                    key={option.id}
                    label={option.label}
                    status={option.correctAnswer ? "success" : "default"}
                  />
                ),
              )}
              <DragOverlay
                className="drag-overlay"
                style={{
                  transform: "translate3d(0, 0, 0)",
                  zIndex: 1,
                  opacity: 0.7,
                }}
              >
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
                  <GhostDropCard />
                ) : (
                  <EmptyPlaceholder>
                    <Flag />
                    <BodyText component="p" align="center" styleType="body-02-medium">
                      Drag and drop correct answers from the left column
                    </BodyText>
                  </EmptyPlaceholder>
                )
              ) : (
                droppedItems.map((item) => {
                  return gameStatus === "inprogress" ? (
                    <DragNDropCard
                      key={item.id}
                      label={item.label}
                      id={item.id}
                      status="default"
                      dropped
                      onDeleteHandler={() => {
                        setDroppedItems((items) => items.filter((i) => i.id !== item.id));
                        setOptionsItems((items) => [...items, item]);
                      }}
                    />
                  ) : (
                    <DragNDropCard
                      key={item.id}
                      label={item.label}
                      id={item.id}
                      status={item.correctAnswer ? "success" : "error"}
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
            {helpNote?.richTextContent?.json && <HelpNote richTextContent={helpNote?.richTextContent} />}
          </>
        )}
        <div>
          <Button
            styleType="primary"
            size="large"
            leftIcon={gameStatus === "inprogress" ? <Check /> : <Reload />}
            onClick={gameStatus === "inprogress" ? onGameFinishHandler : onGameResetHandler}
            disabled={gameStatus === "inprogress" && droppedItems.length < 1}
          >
            {gameStatus === "inprogress" ? "Check my answers" : "Solve again"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
