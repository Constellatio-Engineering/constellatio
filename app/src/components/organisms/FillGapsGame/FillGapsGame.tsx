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

import { Title } from "@mantine/core";
import {
  type FC,
  type ReactElement,
  memo,
  useEffect,
  useCallback,
  useMemo,
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

let FillGapsGame: FC<TFillGapsGame> = ({
  fillGameParagraph,
  helpNote,
  id,
  question,
}) => 
{
  const getNextGameIndex = useCaseSolvingStore((s) => s.getNextGameIndex);
  const gameState = useFillGapsGameStore((s) => s.getGameState(id));
  const allGames = useFillGapsGameStore((s) => s.games);
  const updateGameState = useFillGapsGameStore((s) => s.updateGameState);
  const initializeNewGameState = useFillGapsGameStore((s) => s.initializeNewGameState);
  const checkAnswers = useFillGapsGameStore((s) => s.checkAnswers);
  useEffect(() => 
  {
    if(gameState == null && id != null) 
    {
      initializeNewGameState(id);
    }
  }, [allGames, gameState, id, initializeNewGameState]);

  const correctAnswersArr = useMemo(() => 
  {
    if(!gameState?.correctAnswers) 
    {
      return [];
    }
    return gameState.correctAnswers?.reduce<string[]>(
      (acc, curr) => acc.concat(curr.correctAnswers),
      []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.correctAnswers]);
  const userEntriesArr = useMemo(() => 
  {
    if(!gameState?.userAnswers) 
    {
      return [];
    }
    return gameState.userAnswers.reduce<string[]>(
      (acc, curr) => acc.concat(curr.answers),
      []
    );
  }, [gameState?.userAnswers]);
  const richtextOverwrite = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props: any): ReactElement => 
    {
      const textArr: string[] = [];

      if(!props.node.content || props.node?.content?.length <= 0) { return <></>; }

      for(const el of props.node.content) 
      {
        textArr.push(el.text);
      }
      
      const text = textArr?.join(" ");

      return (
        <RichtextOverwrite
          id={id!}
          path={props.path}
          text={text}
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
    answerResult,
    gameStatus,
    gameSubmitted,
    resultMessage,
  } = gameState ?? {};

  const handleCheckAnswers = (): void => 
  {
    if(!gameSubmitted) 
    {
      updateGameState(id, { gameSubmitted: true });
      getNextGameIndex();
    }

    const allCorrect = checkAnswers({ gameId: id });

    updateGameState(id, {
      gameStatus: allCorrect ? "win" : "lose",
      resultMessage: allCorrect
        ? "Congrats! all answers are correct!"
        : "Some answers are incorrect. Please try again.",
    });
  };

  const handleResetGame = (): void => 
  {
    updateGameState(id, {
      answerResult: [],
      gameStatus: "inprogress",
      resultMessage: "",
      userAnswers: [],
    });
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
            <HintsAccordion items={correctAnswersArr}/>
            <ResultCard
              droppedCorrectCards={
                answerResult
                  .reduce<string[]>(
                  (acc, curr) => acc.concat(curr.answersResult),
                  []
                )
                  .filter((item) => item === "correct").length ?? null
              }
              totalCorrectCards={correctAnswersArr.length}
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
            disabled={
              gameStatus === "inprogress" &&
							userEntriesArr.length !== correctAnswersArr.length
            }>
            {gameStatus === "inprogress" ? "Check my answers" : "Solve again"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};

FillGapsGame = memo(FillGapsGame);

export default FillGapsGame;
