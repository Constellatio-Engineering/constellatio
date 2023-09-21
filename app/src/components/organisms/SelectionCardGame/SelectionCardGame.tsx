/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";
import { Gamification } from "@/components/Icons/Gamification";
import { Reload } from "@/components/Icons/Reload";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import { SelectionCard } from "@/components/molecules/SelectionCard/SelectionCard";
import { type IGenCardSelectionGame } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import useSelectionCardGameStore, {
  type TCardGameOption,
  type TCardGameOptionWithCheck,
} from "@/stores/selectionCardGame.store";
import { shuffleArray } from "@/utils/array";

import { Title, LoadingOverlay } from "@mantine/core";
import { type FC, useEffect, useMemo, useState } from "react";

import {
  Container,
  Game,
  GameWrapper,
  LegendWrapper,
  Options,
  TitleWrapper,
} from "./SelectionCardGame.styles";

export type SelectionCardGameProps = Pick<
IGenCardSelectionGame,
"game" | "helpNote" | "question"
>;

export const SelectionCardGame: FC<SelectionCardGameProps> = ({ game, helpNote, question }) => 
{
  // const {
  //   gameStatus,
  //   gameSubmitted,
  //   onOptionCheck,
  //   optionsItems,
  //   resultMessage,
  //   setGameStatus,
  //   setGameSubmitted,
  //   setOptionsItems,
  //   setResultMessage,
  // } = useSelectionCardGameStore();

  const { getNextGameIndex } = useCaseSolvingStore();

  const optionsWithCheckProp = useMemo(
    () =>
      game?.options?.map((option: TCardGameOption) => ({
        ...option,
        checked: false,
      })),
    [game?.options]
  );
  const originalOptions: TCardGameOptionWithCheck[] = useMemo(
    () => optionsWithCheckProp ?? [],
    [optionsWithCheckProp]
  );
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => 
  {
    const optionsShuffled =
			shuffleArray<TCardGameOptionWithCheck>(originalOptions);
    setOptionsItems(optionsShuffled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalOptions]);

  const filteredCorrectAnswers = optionsItems?.filter(
    (item) => item.correctAnswer
  );

  const checkWinCondition = (): boolean => 
  {
    const checkedAnswers = optionsItems.filter((item) => item.checked);

    return (
      filteredCorrectAnswers.every((item) => item.checked) &&
			checkedAnswers.length === filteredCorrectAnswers.length
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

    if(!gameSubmitted)
    {
      setGameSubmitted(true);
      getNextGameIndex();
    }
  };

  const onGameResetHandler = (): void => 
  {
    const optionsShuffled =
			shuffleArray<TCardGameOptionWithCheck>(originalOptions);
    setOptionsItems(optionsShuffled);
    setGameStatus("inprogress");
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
            <LoadingOverlay
              visible={optionsItems.length < 1}
              radius="radius-12"
            />
            {optionsItems.map((option) => (
              <SelectionCard
                onCheckHandler={(e) => 
                {
                  const { checked } = e.target;
                  onOptionCheck(option.id, checked);
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
              droppedCorrectCards={
                filteredCorrectAnswers.filter((item) => item.checked).length ??
								null
              }
              totalCorrectCards={filteredCorrectAnswers.length ?? null}
              variant={gameStatus}
              message={resultMessage}
            />
            {helpNote?.json && (
              <HelpNote data={helpNote}/>
            )}
          </>
        )}
        <div>
          <Button<"button">
            styleType="primary"
            size="large"
            leftIcon={gameStatus === "inprogress" ? <Check/> : <Reload/>}
            onClick={
              gameStatus === "inprogress"
                ? onGameFinishHandler
                : onGameResetHandler
            }
            disabled={
              gameStatus === "inprogress" &&
							optionsItems.every((item) => !item.checked)
            }>
            {gameStatus === "inprogress" ? "Check my answers" : "Solve again"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
