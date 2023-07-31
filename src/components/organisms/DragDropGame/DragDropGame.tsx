import { BodyText } from "@/components/atoms/BodyText/BodyText";
import React, { useState } from "react";
import { Container, EmptyPlaceholder, Game, GameWrapper, Options, TitleWrapper } from "./DragDropGame.styles";
import { Button } from "@/components/atoms/Button/Button";
import { Gamification } from "@/components/Icons/Gamification";
import { Title } from "@mantine/core";
import { DraggableCard } from "@/components/atoms/DraggableCard/DraggableCard";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Droppable } from "./Droppable";
import { Flag } from "@/components/Icons/Flag";
import { GhostDropCard } from "@/components/atoms/GhostDropCard/GhostDropCard";

export const DragDropGame = () => {
  const [droppedItems, setDroppedItems] = useState<any[]>([]);
  const [activeId, setActiveId] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && over.id === "droppable") {
      setDroppedItems((items) => [...items, active.id]);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  return (
    <Container>
      <TitleWrapper>
        <Gamification /> <Title order={4}>Drag all correct answers into the box on the right</Title>
      </TitleWrapper>
      <GameWrapper>
        <BodyText styleType="body-01-regular">
          Based on the above definition of the term and its prerequisites: Which of the following {'"organizations"'}
          constitute companies in the sense of company law. Skim the respective norms!
        </BodyText>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <Game>
            <Options>
              <DraggableCard label={"Drag Card"} id={"1"} status="default" />
              <DraggableCard label={"Drag Card"} id={"2"} status="default"/>
              <DraggableCard label={"Drag Card"} id={"3"} status="default"/>
              <DraggableCard label={"Drag Card"} id={"4"} status="default"/>
              <DraggableCard label={"Drag Card"} id={"5"} status="default"/>
              <DraggableCard label={"Drag Card"} id={"6"} status="default"/>
              <DragOverlay
                className="drag-overlay"
                style={{
                  transform: "translate3d(0, 0, 0)",
                  zIndex: 1,
                  opacity: 0.5,
                }}
              >
                {activeId ? <DraggableCard label={"Drag Card"} id={activeId} status="default" /> : null}
              </DragOverlay>
            </Options>
            <Droppable>
              {droppedItems.length < 1 ? (
                activeId ? (
                  <GhostDropCard />
                ) : (
                  <EmptyPlaceholder>
                    <Flag />
                    <BodyText align="center" styleType="body-02-medium">
                      Drag and drop correct answers from the left column
                    </BodyText>
                  </EmptyPlaceholder>
                )
              ) : (
                droppedItems.map((id) => {
                  return <DraggableCard key={id} label={"Drag Card"} id={id} status="default" dropped />;
                })
              )}
            </Droppable>
          </Game>
        </DndContext>
        <div>
          <Button styleType="primary" size="large">
            Check Answers
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
