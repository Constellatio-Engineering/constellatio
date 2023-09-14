/* eslint-disable react-hooks/exhaustive-deps */
import { FillGapInput } from "@/components/molecules/FillGapInput/FillGapInput";
import useFillGapsGameStore from "@/stores/fillGapsGame.store";

import {
  type FC, type MutableRefObject, type RefObject, createRef, memo, useEffect, useRef, type ChangeEvent 
} from "react";

interface TRichtextOverwrite 
{
  readonly correctAnswers: MutableRefObject<string[]>;
  readonly focusedIndex: MutableRefObject<number | null>;
  readonly text: string;
}

const _RichtextOverwrite: FC<TRichtextOverwrite> = ({ correctAnswers, focusedIndex, text }) =>  
{
  const {
    answerResult,
    gameStatus,
    updateUserAnswers,
    userAnswers
  } = useFillGapsGameStore();
  const inputRefs = useRef<RefObject<HTMLInputElement>[]>([]);

  // Splitting the text based on {{...}} pattern using regex
  const parts = text.split(/({{.*?}})/g);

  const createChangeHandler = (index: number) => (e: ChangeEvent<HTMLInputElement>) => 
  {
    updateUserAnswers(index, e.target.value);
    focusedIndex.current = index;
  };

  useEffect(() =>
  {
    if(focusedIndex.current !== null && inputRefs.current[focusedIndex.current]) 
    {
      inputRefs.current?.[focusedIndex.current]?.current?.focus();
    }
  }, [focusedIndex]);

  let inputCounter = 0;

  return (
    <div className="richtextOverwrite">
      {parts.map((part, index) => 
      {
        if(part.startsWith("{{") && part.endsWith("}}")) 
        {
          const innerContent = part.slice(2, -2);
          if(correctAnswers.current.length <= userAnswers.length - 1) 
          {
            correctAnswers.current.push(innerContent);
          }

          const currentInputIndex = inputCounter;
          inputCounter++;

          if(!inputRefs.current[currentInputIndex])
          {
            inputRefs.current[currentInputIndex] = createRef();
          }

          return gameStatus === "inprogress" ? (
            <FillGapInput
              ref={inputRefs.current[currentInputIndex]}
              value={userAnswers[currentInputIndex]}
              key={`${index}${currentInputIndex}}`}
              onChange={createChangeHandler(currentInputIndex)}
              status="default"
              placeholder="fill the gap"
            />
          ) : (
            <FillGapInput
              ref={inputRefs.current[currentInputIndex]}
              value={userAnswers[currentInputIndex]}
              key={`${index}${currentInputIndex}}`}
              onChange={createChangeHandler(currentInputIndex)}
              index={currentInputIndex + 1}
              status={answerResult[currentInputIndex] === "correct" ? "success" : "error"}
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

_RichtextOverwrite.displayName = "RichtextOverwrite";
const RichtextOverwrite = memo(_RichtextOverwrite);

export default RichtextOverwrite;
