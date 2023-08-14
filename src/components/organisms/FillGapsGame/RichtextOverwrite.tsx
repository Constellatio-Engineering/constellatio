import { FillGapInput } from "@/components/molecules/FillGapInput/FillGapInput";
import { FC, MutableRefObject, RefObject, createRef, memo, useEffect, useRef } from "react";

type TRichtextOverwrite = {
  text: string;
  handleInputChange: (index: number, value: string) => void;
  inputCounter: MutableRefObject<number>;
  correctAnswers: MutableRefObject<string[]>;
  userAnswers: string[];
  focusedIndex: MutableRefObject<number | null>;
};

const _RichtextOverwrite: FC<TRichtextOverwrite> = memo(
  ({ text, correctAnswers, handleInputChange, inputCounter, userAnswers, focusedIndex }) => {
    const inputRefs = useRef<Array<RefObject<HTMLInputElement>>>([]);

    // Splitting the text based on {{...}} pattern using regex
    const parts = text.split(/({{.*?}})/g);

    const createChangeHandler = (index) => (e) => {
      handleInputChange(index, e.target.value.toLocaleLowerCase());
      focusedIndex.current = index;
    };

    useEffect(() => {
      inputCounter.current = 0;
    }, []);

    useEffect(() => {
      if (focusedIndex.current !== null && inputRefs.current[focusedIndex.current]) {
        inputRefs.current[focusedIndex.current].current?.focus();
      }
    }, [focusedIndex]);

    return (
      <div className="richtextOverwrite">
        {parts.map((part, index) => {
          if (part.startsWith("{{") && part.endsWith("}}")) {
            const innerContent = part.slice(2, -2).toLocaleLowerCase();
            if (correctAnswers.current.length <= userAnswers.length - 1) {
              correctAnswers.current.push(innerContent);
            }

            const currentInputIndex = inputCounter.current;
            inputCounter.current += 1;

            if (!inputRefs.current[currentInputIndex]) {
              inputRefs.current[currentInputIndex] = createRef();
            }

            return (
              <FillGapInput
                ref={inputRefs.current[currentInputIndex]}
                value={userAnswers[currentInputIndex]}
                key={`${index}${currentInputIndex}}`}
                onChange={createChangeHandler(currentInputIndex)}
                hint="Enter Answer"
                status="default"
                placeholder="fill the gap"
              />
            );
          } else {
            return <span key={`span-${index}`}>{part}</span>;
          }
        })}
      </div>
    );
  },
);

_RichtextOverwrite.displayName = "RichtextOverwrite";

export const RichtextOverwrite = _RichtextOverwrite;
