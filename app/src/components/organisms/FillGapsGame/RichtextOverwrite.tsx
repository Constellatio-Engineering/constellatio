/* eslint-disable react-hooks/exhaustive-deps */
import { FillGapInput } from "@/components/molecules/FillGapInput/FillGapInput";
import useFillGapsGameStore from "@/stores/fillGapsGame.store";

import {
  type FC, type MutableRefObject, memo, type ChangeEvent, useEffect, useMemo 
} from "react";

interface TRichtextOverwrite 
{
  readonly id: string;
  readonly path: string;
  readonly text: string;
}

let RichtextOverwrite: FC<TRichtextOverwrite> = ({ id, path, text }) => 
{
  const gameState = useFillGapsGameStore((s) => s.getGameState(id))!;

  const updateUserAnswer = useFillGapsGameStore((s) => s.updateUserAnswer);

  const updateCorrectAnswers = useFillGapsGameStore(s => s.updateCorrectAnswer);

  let inputCounter = 0;

  const { answerResult, gameStatus, userAnswers } = gameState;

  // Splitting the text based on {{...}} pattern using regex
  const parts = useMemo(() => text.split(/({{.*?}})/), [text]);
  const innerContent = useMemo(() => parts.filter((part) => part.startsWith("{{") && part.endsWith("}}")).map((part) => part.slice(2, -2)), [parts]);

  const createChangeHandler =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => 
    {
      updateUserAnswer({
        gameId: id,
        index,
        path,
        value: e.target.value,
      });
    };

  useEffect(() => 
  { 
    if(innerContent.length > 0)
    {
      updateCorrectAnswers({
        gameId: id, innerContent, path
      });
    }
  }, [innerContent]);

  return (
    <div className="richtextOverwrite">
      {parts.map((part, index) => 
      {
        if(part.startsWith("{{") && part.endsWith("}}")) 
        {

          const currentInputIndex = inputCounter;
          inputCounter++;

          const answerValue =
            userAnswers.find((answer) => answer.path === path)?.answers[currentInputIndex] || "";

          return gameStatus === "inprogress" ? (
            <FillGapInput
              value={answerValue}
              key={`${index}${currentInputIndex}}`}
              onChange={createChangeHandler(currentInputIndex)}
              status="default"
              placeholder="fill the gap"
            />
          ) : (
            <FillGapInput
              value={answerValue}
              key={`${index}${currentInputIndex}}`}
              onChange={createChangeHandler(currentInputIndex)}
              index={currentInputIndex + 1}
              // status={
              //   answerResult[currentInputIndex] === "correct"
              //     ? "success"
              //     : "error"
              // }
              placeholder="fill the gap"
            />
          );
        }
        else 
        {
          return <span key={`span-${index}`}>{part}</span>;
        }
      })}
    </div>
  );
};

RichtextOverwrite.displayName = "RichtextOverwrite";
RichtextOverwrite = memo(RichtextOverwrite);

export default RichtextOverwrite;
