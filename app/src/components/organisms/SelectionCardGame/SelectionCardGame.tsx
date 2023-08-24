import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";
import { Gamification } from "@/components/Icons/Gamification";
import { Reload } from "@/components/Icons/Reload";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import { SelectionCard } from "@/components/molecules/SelectionCard/SelectionCard";
import { type TValue } from "@/components/Wrappers/SelectionGame/SelectionGame";
import { type IGenSelectionCard } from "@/services/graphql/__generated/sdk";

import { Title, LoadingOverlay } from "@mantine/core";
import { type FC, useEffect, useState } from "react";

import {
  Container, Game, GameWrapper, LegendWrapper, Options, TitleWrapper 
} from "./SelectionCardGame.styles";

type TSelectionCardGame = Pick<IGenSelectionCard, "game" | "helpNote" | "question">;

type TOptionType = TValue["options"][number];

const shuffleOptions = (arr: TOptionType[]): TOptionType[] => 
{
  for(let i = arr.length - 1; i > 0; i--) 
  {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i] as TOptionType;
    arr[i] = arr[j] as TOptionType;
    arr[j] = temp; 
  }
  return arr;
};

export const SelectionCardGame: FC<TSelectionCardGame> = ({ game, helpNote, question }) => 
{
  const optionsWithCheckProp = game?.options?.map((option: TOptionType) => ({ ...option, checked: false }));
  const originalOptions = JSON.parse(JSON.stringify(optionsWithCheckProp ?? []));
  const [optionsItems, setOptionsItems] = useState<any[]>([]);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | "inprogress">("inprogress");
  const [resultMessage, setResultMessage] = useState<string>("");
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => 
  {
    setOptionsItems(shuffleOptions(originalOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCorrectAnswers = optionsItems.filter((item) => item.correctAnswer);

  const checkWinCondition = (): boolean => 
  {
    const checkedAnswers = optionsItems.filter((item) => item.checked);

    return (
      filteredCorrectAnswers.every((item) => item.checked) && checkedAnswers.length === filteredCorrectAnswers.length
    );
  };

  const onGameFinishHandler = (): void => 
  {
    const winCondition = checkWinCondition();

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
  };

  const onGameResetHandler = (): void => 
  {
    setGameStatus("inprogress");
    setOptionsItems(shuffleOptions(originalOptions));
    setResetCount((prevCount) => prevCount + 1);
  };

  return (
    <Container>
      <TitleWrapper>
        <Gamification/> <Title order={4}>Choose the right answers</Title>
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
        <Game>
          <Options>
            <LoadingOverlay visible={optionsItems.length < 1} radius="radius-12"/>
            {optionsItems.map((option) => (
              <SelectionCard
                onCheckHandler={(e) => 
                {
                  const { checked } = e.target;
                  setOptionsItems((prev) => prev.map((item) => (item.id === option.id ? { ...item, checked } : item)));
                }}
                key={`${option.id} - ${resetCount}`}
                label={option.label}
                disabled={gameStatus !== "inprogress"}
                result={option.correctAnswer ? "Correct" : "Incorrect"}
                status={
                  gameStatus === "inprogress"
                    ? "default"
                    : option.correctAnswer
                      ? "success"
                      : !option.correctAnswer
                        ? "error"
                        : "default"
                }
              />
            ))}
          </Options>
        </Game>
        {gameStatus !== "inprogress" && (
          <>
            <ResultCard
              droppedCorrectCards={filteredCorrectAnswers.filter((item) => item.checked).length ?? null}
              totalCorrectCards={filteredCorrectAnswers.length ?? null}
              variant={gameStatus}
              message={resultMessage}
            />
            {helpNote?.richTextContent?.json && <HelpNote richTextContent={helpNote?.richTextContent}/>}
          </>
        )}
        <div>
          <Button
            // Disabled this rule because ESLint doesn't recognize the type of the Button component
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            styleType="primary"
            size="large"
            leftIcon={gameStatus === "inprogress" ? <Check/> : <Reload/>}
            onClick={gameStatus === "inprogress" ? onGameFinishHandler : onGameResetHandler}
            disabled={gameStatus === "inprogress" && optionsItems.every((item) => !item.checked)}>
            {gameStatus === "inprogress" ? "Check my answers" : "Solve again"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
