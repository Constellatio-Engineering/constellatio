/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import { type IStatusLabel } from "@/components/atoms/statusLabel/StatusLabel";
import FloatingPanelTablet from "@/components/floatingPanelTablet/FloatingPanelTablet";
import { RichTextHeadingOverwrite } from "@/components/helpers/RichTextHeadingOverwrite";
import { type GameProgress } from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type Maybe, type IGenCase_Facts, type IGenCase_FullTextTasks, type IGenArticle_FullTextTasks } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { api } from "@/utils/api";
import { type Games } from "@/utils/case";
import type { IDocumentLink, IHeadingNode } from "types/richtext";

import { Container, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  type FunctionComponent, useMemo, useCallback
} from "react";

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
  readonly currentGameIndexInFullTextTasksJson: number;
  readonly facts: Maybe<IGenCase_Facts> | undefined;
  readonly fullTextTasks: Maybe<IGenCase_FullTextTasks> | Maybe<IGenArticle_FullTextTasks>;
  readonly games: Games;
  readonly gamesProgress: GameProgress[];
  readonly isLastGame: boolean;
  readonly progressState: IStatusLabel["progressState"] | undefined;
  readonly variant?: "case" | "dictionary";
}

const CaseCompleteTestsStep: FunctionComponent<ICaseCompleteTestsStepProps> = ({
  caseId,
  currentGameIndexInFullTextTasksJson,
  facts,
  fullTextTasks,
  games,
  gamesProgress,
  isLastGame,
  progressState,
  variant
}) =>
{
  // TODO: What happens when there are no games at all in the case
  // TODO: What happens when there is just one game in the case
  // TODO: Go trough the code again and make sure every case is handled

  const completedGames = gamesProgress.filter(({ progressState }) => progressState === "completed");
  const areAllGamesCompleted = completedGames.length === games.length;
  const { invalidateCaseProgress } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutate: setProgressState } = api.casesProgress.setProgressState.useMutation({
    onError: (error) => console.error(error),
    onSuccess: async () => invalidateCaseProgress({ caseId })
  });
  const overrideCaseStepIndex = useCaseSolvingStore(s => s.overrideCaseStepIndex);

  let renderedCaseContent: IGenCase_FullTextTasks | IGenArticle_FullTextTasks | null;
  const isBigScreen = useMediaQuery("(min-width: 1100px)");

  /* console.log("-----------------");
  console.log("completedGames", completedGames);
  console.log("areAllGamesCompleted", areAllGamesCompleted);
  console.log("gamesProgress", gamesProgress);
  console.log("games", games);
  console.log("currentGameIndexInFullTextTasksJson", currentGameIndexInFullTextTasksJson);*/

  if(fullTextTasks?.json?.content?.length >= 1 && !areAllGamesCompleted)
  {
    renderedCaseContent = {
      ...fullTextTasks,
      json: {
        ...fullTextTasks?.json,
        content: isLastGame ? fullTextTasks?.json?.content : fullTextTasks?.json?.content?.slice(0, (currentGameIndexInFullTextTasksJson || 0) + 1),
      },
    };
  }
  else
  {
    renderedCaseContent = fullTextTasks;
  }

  const content = useMemo(() =>
  {
    const items = variant === "case" ? renderedCaseContent?.json?.content : fullTextTasks?.json?.content;
    return items?.filter((contentItem: { content: Array<{ text: string }>; type: string }) => contentItem?.type === "heading");
  }, [fullTextTasks?.json?.content, renderedCaseContent?.json?.content, variant]);

  const allHeadings = fullTextTasks?.json?.content?.filter((x: { attrs: { level: number }; type: "heading" }) => x.type === "heading");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const documentLinkOverwrite = useCallback((props: any) =>
  {
    const node = props.node as unknown as IDocumentLink;
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
                  <SelectionCardGame {...component} caseId={caseId}/>
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
                  <DragDropGame {...component} caseId={caseId}/>
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
                  <FillGapsGame {...component} caseId={caseId}/>
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
  }, [caseId, fullTextTasks?.connections]);

  return (
    <Container p={0} maw={1440}>
      <div css={styles.contentWrapper} id="completeTestsStepContent">
        {variant === "case" && (
          <div css={styles.facts}>
            <Title order={2}>Sachverhalt</Title>
            <Richtext
              data={facts}
              richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}
            />
          </div>
        )}
        {progressState === "not-started" && (
          <Button<"button">
            styleType="primary"
            size="large"
            type="button"
            onClick={() => setProgressState({ caseId, progressState: "completing-tests" })}>
            Geführte Lösung starten
          </Button>
        )}
        <div css={styles.content}>
          {isBigScreen && (
            <div css={styles.toc}>
              <FloatingPanel
                hidden={progressState === "not-started"}
                facts={facts}
                content={content}
                variant={variant}
              />
            </div>
          )}
          {!isBigScreen && (
            <FloatingPanelTablet
              hidden={progressState === "not-started"}
              facts={facts}
              content={content}
              variant={variant}
            />
          )}
          {progressState !== "not-started" && (
            <div css={styles.fullTextAndTasksWrapper}>
              <Richtext
                data={variant === "case" ? renderedCaseContent : fullTextTasks}
                richTextOverwrite={{
                  documentLink: documentLinkOverwrite,
                  heading: (props) => 
                  {
                    const node = props!.node as unknown as IHeadingNode;
                    return RichTextHeadingOverwrite({ index: getNestedHeadingIndex(node, allHeadings), ...props });
                  },
                  paragraph: richTextParagraphOverwrite,
                }}
              />
              {(areAllGamesCompleted && variant === "case") && (
                <SolveCaseGame onGameStartHandler={() => 
                {
                  if(progressState === "completing-tests") { setProgressState({ caseId, progressState: "solving-case" }); }
                  else { overrideCaseStepIndex(1, progressState ?? "not-started"); }
                }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CaseCompleteTestsStep;
