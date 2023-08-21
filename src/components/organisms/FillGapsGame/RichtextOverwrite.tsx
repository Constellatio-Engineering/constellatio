/* eslint-disable react-hooks/exhaustive-deps */
import { FillGapInput } from "@/components/molecules/FillGapInput/FillGapInput";

import {
  type FC, type MutableRefObject, type RefObject, createRef, memo, useEffect, useRef 
} from "react";

interface TRichtextOverwrite 
{
  readonly answerResult: string[];
  readonly correctAnswers: MutableRefObject<string[]>;
  readonly focusedIndex: MutableRefObject<number | null>;
  readonly gameStatus: "win" | "lose" | "inprogress";
  readonly handleInputChange: (index: number, value: string) => void;
  readonly inputCounter: MutableRefObject<number>;
  readonly text: string;
  readonly userAnswers: string[];
}

let RichtextOverwrite: FC<TRichtextOverwrite> = ({
  answerResult,
  correctAnswers,
  focusedIndex,
  gameStatus,
  handleInputChange,
  inputCounter,
  text,
  userAnswers
}) =>  
{
  const inputRefs = useRef<RefObject<HTMLInputElement>[]>([]);

  // Splitting the text based on {{...}} pattern using regex
  const parts = text.split(/({{.*?}})/g);

  const createChangeHandler = (index) => (e) => 
  {
    handleInputChange(index, e.target.value);
    focusedIndex.current = index;
  };

  useEffect(() => 
  {
    inputCounter.current = 0;
  }, []);

  useEffect(() => 
  {
    if(focusedIndex.current !== null && inputRefs.current[focusedIndex.current]) 
    {
      inputRefs.current[focusedIndex.current].current?.focus();
    }
  }, [focusedIndex]);

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

          const currentInputIndex = inputCounter.current;
          inputCounter.current += 1;

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

RichtextOverwrite.displayName = "RichtextOverwrite";
RichtextOverwrite = memo(RichtextOverwrite);

export default RichtextOverwrite;
