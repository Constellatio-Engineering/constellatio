/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";
import { Gamification } from "@/components/Icons/Gamification";
import { Reload } from "@/components/Icons/Reload";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";
import { HintsAccordion } from "@/components/molecules/HintsAccordion/HintsAccordion";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import RichtextOverwrite from "@/components/organisms/FillGapsGame/RichtextOverwrite";
import { type IGenFillInGapsGame } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import useFillGapsGameStore from "@/stores/fillGapsGame.store";
import { type TextElement } from "types/richtext";

import { Title } from "@mantine/core";
import { distance } from "fastest-levenshtein";
import {
  type FC,
  type ReactElement,
  useRef,
  memo,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import {
  Container,
  Game,
  GameWrapper,
  LegendWrapper,
  Options,
  TitleWrapper,
  stylesOverwrite,
} from "./FillGapsGame.styles";

export type TFillGapsGame = Pick<
IGenFillInGapsGame,
"fillGameParagraph" | "helpNote" | "question" | "id"
>;

/* const countPlaceholders = (content: TextElement[]): number =>
{
  let count = 0;
  const regex = /{{.*?}}/g;

  content.forEach((item: TextElement) =>
  {
    switch (item.type) 
    {
      case "text":
        if(item.text) 
        {
          const matches = item.text.match(regex) || [];
          count += matches.length;
        }
        break;
    }

    if(item.content) 
    {
      count += countPlaceholders(item.content);
    }
  });

  return count;
};*/

let FillGapsGame: FC<TFillGapsGame> = ({
  fillGameParagraph,
  helpNote,
  id,
  question,
}) => 
{
  // const totalPlaceholders = useMemo(() => countPlaceholders(fillGameParagraph?.richTextContent?.json?.content), [fillGameParagraph]);
  const { getNextGameIndex } = useCaseSolvingStore();

  const gameState = useFillGapsGameStore((s) => s.getGameState(id));

  const allGames = useFillGapsGameStore((s) => s.games);

  const updateGameState = useFillGapsGameStore((s) => s.updateGameState);

  const initializeNewGameState = useFillGapsGameStore(
    (s) => s.initializeNewGameState
  );

  const updateAnswersResult = useFillGapsGameStore((s) => s.updateAnswersResult);

  // const setGameSubmitted = useFillGapsGameStore((s) => s.setGameSubmitted);
  // console.log(`gameState for game with ID '${id}'`, gameState);

  useEffect(() => 
  {
    if(gameState == null && id != null) 
    {
      initializeNewGameState(id);
    }
  }, [allGames, gameState, id, initializeNewGameState]);

  const richtextOverwrite = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (props): ReactElement => 
    {
      return (
        <RichtextOverwrite
          id={id!}
          path={props.path}
          text={props?.children?.[0]?.props?.node.text}
        />
      );
    },
    [id]
  );

  if(!gameState || !id) 
  {
    return null;
  }

  const {
    allCorrect,
    answerResult,
    correctAnswers,
    gameStatus,
    gameSubmitted,
    resultMessage,
    userAnswers
  } = gameState ?? {};

  console.log("answerResult", answerResult, "correctAnswers", correctAnswers, "gameStatus", gameStatus, "resultMessage", resultMessage, "userAnswers", userAnswers, "allCorrect", allCorrect);

  const handleCheckAnswers = (): void => 
  {
    console.log("handleCheckAnswers");

    updateAnswersResult({ gameId: id });
    if(!gameSubmitted)
    {
      updateGameState(id, { gameSubmitted: true });
      getNextGameIndex();
    }

    updateGameState(id, { gameStatus: allCorrect ? "win" : "lose", resultMessage: allCorrect ? "Congrats! all answers are correct!" : "Some answers are incorrect. Please try again." });

    if(allCorrect)
    {
      // all answers are correct
      // setGameStatus("win");
      // setResultMessage("Congrats! all answers are correct!");
    }
    else
    {
      // at least one answer is incorrect
      // setGameStatus("lose");
      // setResultMessage("Some answers are incorrect. Please try again.");
    }
  };

  const handleResetGame = (): void => 
  {
    console.log("handleResetGame");

    /* setGameStatus("inprogress");
    correctAnswers.current = [];
    setUserAnswers(new Array(totalPlaceholders).fill(""));
    setAnswerResult(new Array(totalPlaceholders).fill(""));*/
  };

  return (
    <Container>
      <TitleWrapper>
        <Gamification/>
        <Title order={4}>Fill in the gaps</Title>
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
            {fillGameParagraph?.json && (
              <Richtext
                data={fillGameParagraph}
                richTextOverwrite={{
                  paragraph: richtextOverwrite,
                }}
                stylesOverwrite={stylesOverwrite}
              />
            )}
          </Options>
        </Game>
        {gameStatus !== "inprogress" && (
          <>
            <HintsAccordion items={correctAnswers.current}/>
            <ResultCard
              droppedCorrectCards={answerResult.filter((item) => item === "correct").length ?? null}
              totalCorrectCards={correctAnswers.current.length ?? null}
              variant={gameStatus}
              message={resultMessage}
            />
            {helpNote?.json && <HelpNote data={helpNote}/>}
          </>
        )}
        <div>
          <Button<"button">
            styleType="primary"
            size="large"
            leftIcon={gameStatus === "inprogress" ? <Check/> : <Reload/>}
            onClick={gameStatus === "inprogress" ? handleCheckAnswers : handleResetGame}
            /* disabled={gameStatus === "inprogress" && userAnswers.some((answer) => answer.trim() === "")}*/
            disabled={false}>
            {gameStatus === "inprogress" ? "Check my answers" : "Solve again"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};

FillGapsGame = memo(FillGapsGame);

export default FillGapsGame;
