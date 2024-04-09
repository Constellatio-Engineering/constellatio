/* eslint-disable max-lines */
import styled from "@emotion/styled";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type {
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd"; 
import React, { type CSSProperties, type FunctionComponent, type ReactElement } from "react";

import QuoteItem from "./quote-item";

export type Quote = {
  readonly id: string;
  readonly title: string;
};

const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean,
): string => 
{
  if(isDraggingOver) 
  {
    return "red";
  }
  if(isDraggingFrom) 
  {
    return "green";
  }
  return "blue";
};

interface WrapperProps 
{
  isDraggingFrom: boolean;
  isDraggingOver: boolean;
  isDropDisabled: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background-color: ${(props) => getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : "inherit")};
  padding: ${8}px;
  border: ${8}px;
  padding-bottom: 0;
  transition:
    background-color 0.2s ease,
    opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const scrollContainerHeight = 250;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;

  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${8}px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

interface Props
{
  // may not be provided - and might be null
  readonly ignoreContainerClipping?: boolean;
  readonly internalScroll?: boolean;
  readonly isCombineEnabled?: boolean;
  readonly isDropDisabled?: boolean;
  readonly listId?: string;
  readonly listType?: string;
  readonly quotes: Quote[];
  readonly scrollContainerStyle?: CSSProperties;
  readonly style?: CSSProperties;
  readonly title?: string;
  readonly useClone?: boolean;
}

interface QuoteListProps 
{
  readonly quotes: Quote[];
}

function InnerQuoteList(props: QuoteListProps): ReactElement 
{
  return (
    <>
      {props.quotes.map((quote: Quote, index: number) => (
        <Draggable key={quote.id} draggableId={quote.id} index={index}>
          {(
            dragProvided: DraggableProvided,
            dragSnapshot: DraggableStateSnapshot,
          ) => (
            <QuoteItem
              key={quote.id}
              quote={quote}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
            />
          )}
        </Draggable>
      ))}
    </>
  );
}

const InnerQuoteListMemo = React.memo<QuoteListProps>(InnerQuoteList);

interface InnerListProps 
{
  readonly dropProvided: DroppableProvided;
  readonly quotes: Quote[];
}

const InnerList: FunctionComponent<InnerListProps> = (props) =>
{
  const { dropProvided, quotes } = props;

  return (
    <DropZone ref={dropProvided.innerRef}>
      <InnerQuoteListMemo quotes={quotes}/>
      {dropProvided.placeholder}
    </DropZone>
  );
};

export default function QuoteList(props: Props): ReactElement 
{
  const {
    ignoreContainerClipping,
    isCombineEnabled,
    isDropDisabled,
    listId = "LIST",
    listType,
    quotes,
    style,
    title,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}>
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={Boolean(isDropDisabled)}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}>
          <InnerList
            quotes={quotes}
            dropProvided={dropProvided}
          />
        </Wrapper>
      )}
    </Droppable>
  );
}
