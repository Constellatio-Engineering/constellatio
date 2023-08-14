import { BodyText } from "@/components/atoms/BodyText/BodyText";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Container, Game, GameWrapper, Options, TitleWrapper, stylesOverwrite } from "./FillGapsGame.styles";
import { Button } from "@/components/atoms/Button/Button";
import { Gamification } from "@/components/Icons/Gamification";
import { Title } from "@mantine/core";
import { IGenFillInGapsGame } from "@/services/graphql/__generated/sdk";
import { Check } from "@/components/Icons/Check";
import { Reload } from "@/components/Icons/Reload";
import { LoadingOverlay } from "@mantine/core";
import { ResultCard } from "@/components/molecules/ResultCard/ResultCard";
import { HelpNote } from "@/components/molecules/HelpNote/HelpNote";
import { SelectionCard } from "@/components/molecules/SelectionCard/SelectionCard";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { css } from "@emotion/react";
import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { RichtextOverwrite } from "./RichtextOverwrite";
import { distance } from "fastest-levenshtein";
import { set } from "zod";

type TFillGapsGame = Pick<IGenFillInGapsGame, "fillGameParagraph" | "helpNote" | "question">;

const countPlaceholders = (content) => {
  let count = 0;
  const regex = /{{.*?}}/g;

  content.forEach((item) => {
    if (item.type === "text" && item.text) {
      const matches = item.text.match(regex) || [];
      count += matches.length;
    }
    if (item.content) {
      count += countPlaceholders(item.content);
    }
  });

  return count;
};

export const FillGapsGame: FC<TFillGapsGame> = ({ fillGameParagraph, helpNote, question }) => {
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | "inprogress">("inprogress");
  const [resultMessage, setResultMessage] = useState<string>("");
  const totalPlaceholders = countPlaceholders(fillGameParagraph?.richTextContent?.json?.content || {});
  const [userAnswers, setUserAnswers] = useState(new Array(totalPlaceholders).fill(""));
  const inputCounter = useRef(0);
  const correctAnswers = useRef<string[]>([]);
  const focusedIndex = useRef<number | null>(null);

  const handleInputChange = (index: number, value: string) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  // console.log("userAnswers", userAnswers);
  // console.log("correctAnswers", correctAnswers.current);
  // console.log(gameStatus);
  // console.log(resetCounter);

  const checkAnswers = (): boolean => {
    if (userAnswers.length !== correctAnswers.current.length) return false;

    for (let i = 0; i < userAnswers.length; i++) {
      const possibleCorrectAnswers = correctAnswers.current[i].split(";");
      let isAnswerCorrect = false;

      for (const possibleAnswer of possibleCorrectAnswers) {
        const dist = distance(userAnswers[i], possibleAnswer);
        if (dist <= 2) {
          isAnswerCorrect = true;
          break;
        }
      }

      if (!isAnswerCorrect) {
        return false;
      }
    }

    return true;
  };

  const handleCheckAnswers = () => {
    if (checkAnswers()) {
      // all answers are correct
      setGameStatus("win");
      setResultMessage("All answers are correct!");
    } else {
      // at least one answer is incorrect
      setGameStatus("lose");
      setResultMessage("Some answers are incorrect. Please try again.");
    }
  };

  const handleResetGame = () => {
    setGameStatus("inprogress");
    setResultMessage("");
    inputCounter.current = 0;
    correctAnswers.current = [];
    setUserAnswers(new Array(totalPlaceholders).fill(""));
  };

  return (
    <Container>
      <TitleWrapper>
        <Gamification /> <Title order={4}>Choose the right answers</Title>
      </TitleWrapper>
      <GameWrapper>
        {question && (
          <BodyText component="p" styleType="body-01-regular">
            {question}
          </BodyText>
        )}
        <Game>
          <Options status={gameStatus}>
            {fillGameParagraph?.richTextContent?.json && (
              <Richtext
                richTextContent={fillGameParagraph.richTextContent}
                richTextOverwrite={{
                  paragraph: (props) => {
                    return (
                      <RichtextOverwrite
                        //@ts-ignore
                        text={props?.children?.[0]?.props?.node.text}
                        correctAnswers={correctAnswers}
                        handleInputChange={handleInputChange}
                        inputCounter={inputCounter}
                        userAnswers={userAnswers}
                        focusedIndex={focusedIndex}
                      />
                    );
                  },
                }}
                stylesOverwrite={stylesOverwrite}
              />
            )}
          </Options>
        </Game>
        {/* {gameStatus !== "inprogress" && (
          <>
            <ResultCard
              droppedCorrectCards={filteredCorrectAnswers.filter((item) => item.checked).length ?? null}
              totalCorrectCards={filteredCorrectAnswers.length ?? null}
              variant={gameStatus}
              message={resultMessage}
            />
            {helpNote?.richTextContent?.json && <HelpNote richTextContent={helpNote?.richTextContent} />}
          </>
        )} */}
        <div>
          <Button
            styleType="primary"
            size="large"
            leftIcon={gameStatus === "inprogress" ? <Check /> : <Reload />}
            onClick={gameStatus === "inprogress" ? handleCheckAnswers : handleResetGame}
            disabled={gameStatus === "inprogress" && null}
          >
            {gameStatus === "inprogress" ? "Check my answers" : "Solve again"}
          </Button>
        </div>
      </GameWrapper>
    </Container>
  );
};
