/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import { richTextHeadingOverwrite } from "@/components/helpers/richTextHeadingOverwrite";
import { type Maybe, type IGenCase_Facts, type IGenCase_FullTextTasks, type IGenArticle_FullTextTasks } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
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
  readonly facts: Maybe<IGenCase_Facts> | undefined;
  readonly fullTextTasks: Maybe<IGenCase_FullTextTasks> | Maybe<IGenArticle_FullTextTasks>;
  readonly variant?: "case" | "dictionary";
}

const CaseCompleteTestsStep: FunctionComponent<ICaseCompleteTestsStepProps> = ({ facts, fullTextTasks, variant }) => 
{
  const getNextGameIndex = useCaseSolvingStore((state) => state.getNextGameIndex);
  const hasCaseSolvingStarted = useCaseSolvingStore((state) => state.hasCaseSolvingStarted);
  const isLastGame = useCaseSolvingStore((state) => state.isLastGame);
  const latestGameIndex = useCaseSolvingStore((state) => state.latestGameIndex);
  const setGamesIndexes = useCaseSolvingStore((state) => state.setGamesIndexes);
  const setHasCaseSolvingStarted = useCaseSolvingStore((state) => state.setHasCaseSolvingStarted);
  const setCaseStepIndex = useCaseSolvingStore((state) => state.setCaseStepIndex);

  const renderedCaseContent = useMemo(() => 
  {
    if(fullTextTasks?.json?.content.length >= 1) 
    {
      return {
        ...fullTextTasks,
        json: {
          ...fullTextTasks?.json,
          content: isLastGame ? fullTextTasks?.json?.content : fullTextTasks?.json?.content?.slice(0, latestGameIndex + 1),
        },
      };
    }
    else 
    {
      return fullTextTasks;
    }
  }, [fullTextTasks, latestGameIndex, isLastGame]);

  const content = useMemo(
    () =>
    {
      const items = variant === "case" ? renderedCaseContent?.json?.content : fullTextTasks?.json?.content;
      return items?.filter(
        (contentItem: { content: Array<{ text: string }>; type: string }) =>
          contentItem?.type === "heading"
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderedCaseContent]
  );

  useEffect(() => 
  {
    if(variant === "case" && fullTextTasks?.__typename === "Case_fullTextTasks") { setGamesIndexes(getGamesIndexes({ fullTextTasks })); }

  }, [fullTextTasks, setGamesIndexes, variant]);

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
            richTextOverwrite={{
              paragraph: richTextParagraphOverwrite,
            }}
          />
          {!hasCaseSolvingStarted && (
            <Button<"button">
              styleType="primary"
              size="large"
              type="button"
              onClick={() => 
              {
                setHasCaseSolvingStarted(true); 
                getNextGameIndex(); 
              }}>
              Start solving case
            </Button>
          )}
        </div>
        {hasCaseSolvingStarted && (
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data={variant === "case" ? renderedCaseContent as any : fullTextTasks}
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
              {isLastGame && <SolveCaseGame onGameStartHandler={() => setCaseStepIndex(1)}/>}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CaseCompleteTestsStep;
