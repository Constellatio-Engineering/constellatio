/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import { RichTextHeadingOverwrite, richTextHeadingOverwriteClassName } from "@/components/helpers/RichTextHeadingOverwrite";
import GameComponentWrapper from "@/components/molecules/gameComponentWrapper/GameComponentWrapper";
import { LawsLinksDisclaimer } from "@/components/molecules/lawsLinksDisclaimer/LawsLinksDisclaimer";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { api } from "@/utils/api";
import type { IDocumentLink, IHeadingNode } from "@/utils/richtext";

import { type GetCaseProgressResult } from "@constellatio/api/routers/caseProgress.router";
import { type GetGamesProgressResult } from "@constellatio/api/routers/gamesProgress.router";
import { type IGenArticle_FullTextTasks, type IGenCase_Facts, type IGenCase_FullTextTasks, type Maybe } from "@constellatio/cms/generated-types";
import { type Games } from "@constellatio/cms/utils/case";
import { type Nullable } from "@constellatio/utility-types";
import { Container, Title } from "@mantine/core";
import {
  type FunctionComponent, useCallback, useEffect, useMemo, useRef 
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
import FloatingPanelTablet from "../floatingPanelTablet/FloatingPanelTablet";
import SelectionCardGame from "../SelectionCardGame/SelectionCardGame";
import { SolveCaseGame } from "../SolveCaseGame/SolveCaseGame";

export const headingObservedThreshold = 0.23;

interface ICaseCompleteTestsStepProps 
{
  readonly caseId: string;
  readonly currentGame: Games[number];
  readonly currentGameIndexInFullTextTasksJson: number;
  readonly facts: Maybe<IGenCase_Facts> | undefined;
  readonly fullTextTasks: Maybe<IGenCase_FullTextTasks> | Maybe<IGenArticle_FullTextTasks>;
  readonly games: Games;
  readonly gamesProgress: Nullable<GetGamesProgressResult>;
  readonly progressState: Nullable<GetCaseProgressResult["progressState"]>;
  readonly variant?: "case" | "dictionary";
}

const CaseCompleteTestsStep: FunctionComponent<ICaseCompleteTestsStepProps> = ({
  caseId,
  currentGame,
  currentGameIndexInFullTextTasksJson,
  facts,
  fullTextTasks,
  games,
  gamesProgress,
  progressState,
  variant
}) =>
{
  // TODO: What happens when there are no games at all in the case
  // TODO: What happens when there is just one game in the case
  // TODO: Go trough the code again and make sure every case is handled

  const windowDimensions = useWindowDimensions();
  const windowHeight = windowDimensions?.height;
  const completedGamesCount = games.filter(game => 
  {
    const gameProgress = gamesProgress?.find(gameProgress => gameProgress.gameId === game.id);
    const hasCompletedGame = gameProgress?.results.some(({ progressState }) => progressState === "completed");
    return hasCompletedGame;
  }).length;
  const currentGameId = currentGame?.id;
  const areAllGamesCompleted = completedGamesCount === games.length;
  const { invalidateCaseProgress } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutate: setProgressState } = api.casesProgress.setProgressState.useMutation({
    onError: (error) => console.error(error),
    onSuccess: async () => invalidateCaseProgress({ caseId })
  });
  const overrideCaseStepIndex = useCaseSolvingStore(s => s.overrideCaseStepIndex);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() =>
  {
    if(!contentWrapperRef.current || windowHeight == null)
    {
      return;
    }

    const { setObservedHeadlineId } = useCaseSolvingStore.getState();
    const headings = contentWrapperRef.current.getElementsByClassName(richTextHeadingOverwriteClassName);

    for(let i = 0; i < headings.length; i++)
    {
      const isLastHeading = i === headings.length - 1;
      const heading = headings[i] as HTMLHeadingElement;
      const headingBefore = headings[i - 1] as HTMLHeadingElement | undefined;
      const { top } = heading.getBoundingClientRect();

      const headingId = heading.getAttribute("data-id");
      const headingBeforeId = headingBefore?.getAttribute("data-id");

      if(!headingId)
      {
        throw new Error(`Heading ID is missing for '${heading.innerHTML}'`);
      }

      if(top > (windowHeight * headingObservedThreshold))
      {
        setObservedHeadlineId(headingBeforeId ?? headingId);
        break;
      }
      else if(isLastHeading && top <= (windowHeight * headingObservedThreshold))
      {
        setObservedHeadlineId(headingId);
      }
    }
  }, [windowHeight]);

  useEffect(() =>
  {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  let renderedCaseContent: IGenCase_FullTextTasks | IGenArticle_FullTextTasks | null;

  if(fullTextTasks?.json?.content?.length >= 1 && !areAllGamesCompleted)
  {
    renderedCaseContent = {
      ...fullTextTasks,
      json: {
        ...fullTextTasks?.json,
        content: areAllGamesCompleted ? fullTextTasks?.json?.content : fullTextTasks?.json?.content?.slice(0, (currentGameIndexInFullTextTasksJson || 0) + 1),
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
            if(component.id != null && node?.attrs?.documentId === component?.id)
            {
              return (
                <GameComponentWrapper key={`${component?.__typename}-${index}`} currentGameId={currentGameId} gameId={component.id}>
                  <SelectionCardGame {...component} caseId={caseId} id={component.id}/>
                </GameComponentWrapper>
              );
            }
            break;
          case "DragNDropGame":
            if(component.id != null && node?.attrs?.documentId === component?.id)
            {
              return (
                <GameComponentWrapper key={`${component?.__typename}-${index}`} currentGameId={currentGameId} gameId={component.id}>
                  <DragDropGame {...component} caseId={caseId} id={component.id}/>
                </GameComponentWrapper>
              );
            }
            break;
          case "FillInGapsGame":
            if(node?.attrs?.documentId === component?.id) 
            {
              return (
                <GameComponentWrapper key={`${component?.__typename}-${index}`} currentGameId={currentGameId} gameId={component.id}>
                  <FillGapsGame {...component} caseId={caseId}/>
                </GameComponentWrapper>
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
  }, [caseId, fullTextTasks?.connections, currentGameId]);

  return (
    <Container p={0} maw={1440}>
      <div css={styles.contentWrapper} ref={contentWrapperRef} id="completeTestsStepContent">
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
            onClick={() => 
            {
              setProgressState({ caseId, progressState: "completing-tests" });
            }}>
            Geführte Lösung starten
          </Button>
        )}
        <div css={styles.content}>
          <div css={styles.toc}>
            <FloatingPanel
              hidden={progressState === "not-started"}
              facts={facts}
              content={content}
              variant={variant}
              selectedTab="Gliederung"
            />
          </div>
          <FloatingPanelTablet
            hidden={progressState === "not-started"}
            facts={facts}
            content={content}
            variant={variant}
          />
          {progressState !== "not-started" && (
            <div css={styles.fullTextAndTasksWrapper}>
              <Richtext
                data={variant === "case" ? renderedCaseContent : fullTextTasks}
                prefixComponent={<LawsLinksDisclaimer marginBottomInPx={variant === "dictionary" ? 45 : undefined}/>}
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
                <SolveCaseGame
                  onGameStartHandler={() =>
                  {
                    if(progressState === "completing-tests")
                    {
                      setProgressState({ caseId, progressState: "solving-case" }); 
                    }
                    else
                    {
                      overrideCaseStepIndex(1, progressState ?? "not-started"); 
                    }
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
