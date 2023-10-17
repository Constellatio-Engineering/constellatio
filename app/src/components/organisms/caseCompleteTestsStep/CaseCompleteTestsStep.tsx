/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import { type IStatusLabel } from "@/components/atoms/statusLabel/StatusLabel";
import { richTextHeadingOverwrite } from "@/components/helpers/richTextHeadingOverwrite";
import { casesProgress } from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { type GamesProgress } from "@/hooks/useGamesProgress";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type Maybe, type IGenCase_Facts, type IGenCase_FullTextTasks, type IGenArticle_FullTextTasks } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { api } from "@/utils/api";
import { type Games } from "@/utils/case";
import type { IDocumentLink, IHeadingNode } from "types/richtext";

import { Container, Title } from "@mantine/core";
import {
  type FunctionComponent, useEffect, useMemo, useCallback
} from "react";

import { getGamesIndexes } from "./caseCompleteTestsStep.helper";
import * as styles from "./CaseCompleteTestsStep.styles";
import { richTextParagraphOverwrite } from "../../helpers/richTextParagraphOverwrite";
import { ImageWrapperCard } from "../../molecules/ImageWrapperCard/ImageWrapperCard";
import { Richtext } from "../../molecules/Richtext/Richtext";
import { Callout } from "../Callout/Callout";
import { DragDropGame } from "../DragDropGame/DragDropGame";
import FillGapsGame from "../FillGapsGame/FillGapsGame";
import FloatingPanel from "../floatingPanel/FloatingPanel";
import { getNestedHeadingIndex } from "../floatingPanel/generateTocHelper";
import SelectionCardGame from "../SelectionCardGame/SelectionCardGame";
import { SolveCaseGame } from "../SolveCaseGame/SolveCaseGame";

interface ICaseCompleteTestsStepProps 
{
  readonly caseId: string;
  readonly facts: Maybe<IGenCase_Facts> | undefined;
  readonly fullTextTasks: Maybe<IGenCase_FullTextTasks> | Maybe<IGenArticle_FullTextTasks>;
  readonly games: Games;
  readonly gamesProgress: GamesProgress;
  readonly progressState: IStatusLabel["progressState"] | undefined;
  readonly variant?: "case" | "dictionary";
}

const CaseCompleteTestsStep: FunctionComponent<ICaseCompleteTestsStepProps> = ({
  caseId,
  facts,
  fullTextTasks,
  games,
  gamesProgress,
  progressState,
  variant
}) =>
{
  const { invalidateCaseProgress } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutate: setProgressState } = api.casesProgress.setProgressState.useMutation({
    onError: (error) => console.error(error),
    onSuccess: async () => invalidateCaseProgress({ caseId })
  });

  // TODO: What happens when there are no games at all in the case
  // TODO: What happens when there is just one game in the case
  // TODO: Go trough the code again and make sure every case is handled

  // console.log("games", games);
  console.log("gamesProgress", gamesProgress);
  // console.log("fullTextTasks", fullTextTasks);

  const currentGameIndex = games.findIndex(game =>
  {
    // this gets the first game that is not completed, which is effectively the current game
    const gameProgress = gamesProgress.find(gameProgress => gameProgress.gameId === game.id);
    return (!gameProgress || gameProgress?.progressState === "not-started");
  });
  const currentGame = games[currentGameIndex];
  const currentGameIndexInContentArray = currentGame?.indexInContentArray || 0;

  // TODO Error handling if there is no next game
  const nextGameIndex = currentGameIndex + 1;
  const nextGame = games[nextGameIndex];
  const nextGameIndexInContentArray = nextGame?.indexInContentArray;

  // console.log("currentGameIndex", currentGameIndex);
  // console.log("currentGame", currentGame);
  // console.log("nextGameIndex", nextGameIndex);
  // console.log("nextGame", nextGame);

  const isLastGame = currentGameIndex === games.length - 1;

  // TODO: If there is only one game in the case this wont work
  /* const secondLastGame = games.at(-2);
  const progressForSecondLastGame = gamesProgress.find(gameProgress => gameProgress.gameId === secondLastGame?.id);
  const isLastGame = progressForSecondLastGame?.progressState === "completed";*/

  const renderedCaseContent = useMemo(() => 
  {
    if(fullTextTasks?.json?.content?.length >= 1)
    {
      return {
        ...fullTextTasks,
        json: {
          ...fullTextTasks?.json,
          content: isLastGame ? fullTextTasks?.json?.content : fullTextTasks?.json?.content?.slice(0, (nextGameIndexInContentArray || 0) + 1),
        },
      };
    }
    else 
    {
      return fullTextTasks;
    }
  }, [fullTextTasks, isLastGame, nextGameIndexInContentArray]);

  const content = useMemo(() =>
  {
    const items = variant === "case" ? renderedCaseContent?.json?.content : fullTextTasks?.json?.content;
    return items?.filter((contentItem: { content: Array<{ text: string }>; type: string }) =>
      contentItem?.type === "heading"
    );
  }, [fullTextTasks?.json?.content, renderedCaseContent?.json?.content, variant]);

  /* useEffect(() =>
  {
    if(variant === "case" && fullTextTasks?.__typename === "Case_fullTextTasks")
    {
      setGamesIndexes(getGamesIndexes({ fullTextTasks })); 
    }
  }, [fullTextTasks, setGamesIndexes, variant]);*/

  const allHeadings = fullTextTasks?.json?.content?.filter((x: { attrs: { level: number }; type: "heading" }) => x.type === "heading");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const documentLinkOverwrite = useCallback((props: any) => 
  {
    const node = props!.node as unknown as IDocumentLink;
    return node && fullTextTasks?.connections
      ? fullTextTasks.connections?.map((component, index) => 
      {
        switch (component?.__typename) 
        {
          case "Callout":
            if(node?.attrs?.documentId === component?.id) 
            {
              return (
                <div
                  css={styles.componentWrapper}
                  key={`${component?.__typename}-${index}`}>
                  <Callout {...component}/>
                </div>
              );
            }
            break;
          case "CardSelectionGame":
            if(node?.attrs?.documentId === component?.id) 
            {
              return (
                <div
                  css={styles.gameComponentWrapper}
                  key={`${component?.__typename}-${index}`}>
                  <SelectionCardGame {...component}/>
                </div>
              );
            }
            break;
          case "DragNDropGame":
            if(node?.attrs?.documentId === component?.id)                                     
            {
              return (
                <div
                  css={styles.gameComponentWrapper}
                  key={`${component?.__typename}-${index}`}>
                  <DragDropGame {...component}/>
                </div>
              );
            }
            break;
          case "FillInGapsGame":
            if(node?.attrs?.documentId === component?.id) 
            {
              return (
                <div
                  css={styles.gameComponentWrapper}
                  key={`${component?.__typename}-${index}`}>
                  <FillGapsGame {...component}/>
                </div>
              );
            }
            break;
          case "Asset":
            if(node?.attrs?.documentId === component?.id) 
            {
              return (
                <div
                  css={styles.componentWrapper}
                  key={`${component?.__typename}-${index}`}>
                  <ImageWrapperCard {...component}/>
                </div>
              );
            }
            break;
          default:
            console.warn(
              `Unknown component type: ${component?.__typename}`
            );
            return null;
        }
        return null;
      })
      : null;
  }, [fullTextTasks]);

  return (
    <Container maw={1440}>
      <div css={styles.contentWrapper} id="completeTestsStepContent">
        <div css={styles.facts}>
          <Title order={2}>Facts</Title>
          <Richtext
            data={facts}
            richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}
          />
          {progressState === "not-started" && (
            <Button<"button">
              styleType="primary"
              size="large"
              type="button"
              onClick={() => 
              {
                setProgressState({ caseId, progressState: "in-progress" });
                // getNextGameIndex();
              }}>
              Start solving case
            </Button>
          )}
        </div>
        {progressState === "in-progress" && (
          <div css={styles.content}>
            <div css={styles.toc}>
              <FloatingPanel
                hidden={false}
                facts={facts}
                content={content}
                variant={variant}
              />
            </div>
            <div css={styles.fullTextAndTasksWrapper}>
              <Richtext
                data={variant === "case" ? renderedCaseContent : fullTextTasks}
                richTextOverwrite={{
                  documentLink: documentLinkOverwrite,
                  heading: (props) => 
                  {
                    const node = props!.node as unknown as IHeadingNode;
                    return richTextHeadingOverwrite({ depth: node?.attrs?.level, index: getNestedHeadingIndex(node, allHeadings), ...props });
                  },
                  paragraph: richTextParagraphOverwrite
                }}
              />
              {isLastGame && variant === "case" && (
                <SolveCaseGame
                  onGameStartHandler={() =>
                  {
                    console.log("TODO");
                  // setCaseStepIndex(1);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CaseCompleteTestsStep;
