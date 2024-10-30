/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";
import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { Gamification } from "@/components/Icons/Gamification";
import { Reload } from "@/components/Icons/Reload";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";
import { HintsAccordion } from "@/components/molecules/HintsAccordion/HintsAccordion";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import RichtextOverwrite from "@/components/organisms/FillGapsGame/RichtextOverwrite";
import { colooors } from "@/constants/styles/colors";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useFillGapsGameStore from "@/stores/fillGapsGame.store";
import { api } from "@/utils/api";

import { type IGenFillInGapsGame } from "@constellatio/cms/generated-types";
import { Title } from "@mantine/core";
import React, {
  type FC, memo, type ReactElement, useCallback, useEffect, useMemo, 
} from "react";

import {
  Container, Game, GameWrapper, LegendWrapper, Options, stylesOverwrite, TitleWrapper, 
} from "./FillGapsGame.styles";

export type TFillGapsGame = Pick<IGenFillInGapsGame, "fillGameParagraph" | "helpNote" | "question" | "id"> & {
  readonly caseId: string;
};

let FillGapsGame: FC<TFillGapsGame> = ({
  caseId,
  fillGameParagraph,
  helpNote,
  id,
  question,
}) => 
{
  const { invalidateGamesProgress } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutate: setGameProgress } = api.gamesProgress.setGameProgress.useMutation({
    onError: (error) => console.error("Error while setting game progress", error),
    onSuccess: async () => invalidateGamesProgress({ caseId })
  });
  const gameState = useFillGapsGameStore((s) => s.getGameState(id));
  const allGames = useFillGapsGameStore((s) => s.games);
  const updateGameState = useFillGapsGameStore((s) => s.updateGameState);
  const initializeNewGameState = useFillGapsGameStore((s) => s.initializeNewGameState);
  const checkAnswers = useFillGapsGameStore((s) => s.checkAnswers);
  const getUserAnswers = useFillGapsGameStore((s) => s.getUserAnswers);
  useEffect(() => 
  {
    if(gameState == null && id != null) 
    {
      initializeNewGameState({ caseId, id });
    }
  }, [allGames, caseId, gameState, id, initializeNewGameState]);

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
  } = gameState;

  const handleCheckAnswers = (): void => 
  {
    if(!gameSubmitted) 
    {
      updateGameState({
        caseId,
        id,
        update: { gameSubmitted: true },
      });
      // getNextGameIndex(); TODO
      // Store game progress in the database
    }

    const allCorrect = checkAnswers({ gameId: id });

    updateGameState({
      caseId,
      id,
      update: {
        gameStatus: allCorrect ? "win" : "lose",
        resultMessage: allCorrect ? "Sehr gut! Du hast die Frage richtig beantwortet." : "Deine Antwort war leider nicht korrekt.",
      },
    });

    const userAnswersPerParagraph = getUserAnswers(id);
    const userAnswers = userAnswersPerParagraph?.map(paragraph => paragraph.answers).flat();

    setGameProgress({
      gameId: id,
      gameResult: {
        correct: allCorrect,
        correctAnswers: correctAnswersArr,
        gameType: "FillGapsGame",
        userAnswers: userAnswers ?? [],
      },
      progressState: "completed" 
    });
  };

  const handleResetGame = (): void => 
  {
    updateGameState({
      caseId,
      id,
      update: {
        answerResult: [],
        gameStatus: "inprogress",
        resultMessage: "",
        userAnswers: [],
      },
    });
  };

  return (
    <Container>
      <TitleWrapper>
        <Gamification/>
        <Title order={4}>Lückentext</Title>
      </TitleWrapper>
      <GameWrapper>
        {question && (
          <BodyText component="p" styleType="body-01-regular">
            {question}
          </BodyText>
        )}
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
          <LegendWrapper>
            <BodyText component="p" styleType="body-01-regular">
              <span style={{ color: colooors["support-success"][4] }}>
                <CheckFilled size={16}/>
              </span>{" "}
              Richtige Antwort
            </BodyText>
            <BodyText component="p" styleType="body-01-regular">
              <span style={{ color: colooors["support-error"][3] }}>
                <CrossFilled size={16}/>
              </span>{" "}
              Falsche Antwort
            </BodyText>
          </LegendWrapper>
        )}
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
            onClick={() =>
            {
              if(gameStatus === "inprogress")
              {
                handleCheckAnswers();
              }
              else
              {
                handleResetGame();
              }
            }}
            disabled={
              (gameStatus === "inprogress") &&
              (userEntriesArr.filter(Boolean).length !== correctAnswersArr.length)
            }>
            {gameStatus === "inprogress" ? "Antwort prüfen" : "Erneut lösen"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};

FillGapsGame = memo(FillGapsGame);

export default FillGapsGame;
