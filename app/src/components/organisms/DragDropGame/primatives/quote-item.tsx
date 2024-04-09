import { type Quote } from "@/components/organisms/DragDropGame/primatives/quote-list";

import styled from "@emotion/styled";
import type { DraggableProvided } from "@hello-pangea/dnd";
import React, { type CSSProperties, type FunctionComponent } from "react";

interface Props
{ 
  readonly index?: number;
  readonly isClone?: boolean;
  readonly isDragging: boolean;
  readonly isGroupedOver?: boolean;
  readonly provided: DraggableProvided;
  readonly quote: Quote;
  readonly style?: CSSProperties; 
}

const getBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
): string =>
{
  if(isDragging) 
  {
    return "purple";
  }

  if(isGroupedOver) 
  {
    return "grey";
  }

  return "pink";
};

const getBorderColor = (isDragging: boolean): string => isDragging ? "black" : "transparent";

const imageSize = 40;
const grid = 8;
const borderRadius = 2;

const CloneBadge = styled.div`
  background: lightblue;
  bottom: ${grid / 2}px;
  border: 2px solid gray;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);

  height: ${imageSize}px;
  width: ${imageSize}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ContainerProps 
{
  isDragging: boolean;
  isGroupedOver: boolean;
}

const Container = styled.div<ContainerProps>`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${(props) => getBorderColor(props.isDragging)};
  background-color: ${(props) =>
    getBackgroundColor(props.isDragging, props.isGroupedOver)};
  box-shadow: ${({ isDragging }) => isDragging ? "2px 2px 1px black" : "none"};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: cornflowerblue;

  &:hover,
  &:active {
    color: cadetblue;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: aliceblue;
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getStyle(provided: DraggableProvided, style?: CSSProperties | null)
{
  if(!style) 
  {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

const QuoteItem: FunctionComponent<Props> = (props) =>
{
  const {
    index,
    isDragging,
    isGroupedOver,
    provided,
    quote,
    style
  } =
    props;

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={Boolean(isGroupedOver)}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={quote.id}
      data-index={index}>
      <div>
        <p>{quote.title}</p>
      </div>
    </Container>
  );
};

export default React.memo<Props>(QuoteItem);
