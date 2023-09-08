import { Button } from "@/components/atoms/Button/Button";
import { BoxIcon } from "@/components/Icons/BoxIcon";
import { FileIcon } from "@/components/Icons/FileIcon";
import { type IGenTextElement, type IGenCase_FullTextTasks } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { type IDocumentLink } from "types/richtext";

import { Title } from "@mantine/core";
import { type Maybe } from "@trpc/server";
import { useState, type FunctionComponent, useEffect, useMemo } from "react";

import { getGamesIndexes } from "./caseCompleteTestsStep.helper";
import * as styles from "./CaseCompleteTestsStep.styles";
import { richTextParagraphOverwrite } from "../../helpers/richTextParagraphOverwrite";
import { ImageWrapperCard } from "../../molecules/ImageWrapperCard/ImageWrapperCard";
import { Richtext } from "../../molecules/Richtext/Richtext";
import { Callout } from "../Callout/Callout";
import { DragDropGame } from "../DragDropGame/DragDropGame";
import { FillGapsGame } from "../FillGapsGame/FillGapsGame";
import FloatingPanel from "../floatingPanel/FloatingPanel";
import { SelectionCardGame } from "../SelectionCardGame/SelectionCardGame";

interface ICaseCompleteTestsStepProps 
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly facts: Maybe<IGenTextElement>;
  readonly fullTextTasks: Maybe<IGenCase_FullTextTasks>;
}

const CaseCompleteTestsStep: FunctionComponent<ICaseCompleteTestsStepProps> = ({ facts, fullTextTasks }) => 
{
  const {
    getNextGameIndex,
    hasCaseSolvingStarted,
    isLastGame,
    latestGameIndex,
    setGamesIndexes,
    setHasCaseSolvingStarted
  } =
		useCaseSolvingStore();

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
      renderedCaseContent?.json?.content?.filter(
        (contentItem: { content: { text: string }[]; type: string }) =>
          contentItem?.type === "heading"
      ),
    [renderedCaseContent]
  );

  useEffect(() => 
  {
    setGamesIndexes(getGamesIndexes({ fullTextTasks }));
    getNextGameIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullTextTasks]);

  return (
    <div css={styles.contentWrapper}>
      <div css={styles.facts}>
        <Title order={2}>Facts</Title>
        <Richtext
          richTextContent={facts?.richTextContent}
          richTextOverwrite={{
            paragraph: richTextParagraphOverwrite,
          }}
        />
        {!hasCaseSolvingStarted && (
          <Button<"button">
            styleType="primary"
            size="large"
            type="button"
            onClick={() => setHasCaseSolvingStarted(true)}>
            Start solving case
          </Button>
        )}
      </div>
      {hasCaseSolvingStarted && (
        <div css={styles.content}>
          <div css={styles.toc}>
            <FloatingPanel
              hidden={false}
              facts={facts?.richTextContent}
              content={content}
              tabs={[
                { icon: { src: <FileIcon size={16}/> }, title: "Content" },
                { icon: { src: <BoxIcon size={16}/> }, title: "Facts" },
              ]}
            />
          </div>
          <div css={styles.fullTextAndTasksWrapper}>
            <Richtext
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              richTextContent={renderedCaseContent as any}
              richTextOverwrite={{
                documentLink: (props) => 
                {
                  const node = props!.node as unknown as IDocumentLink;
                  return node && fullTextTasks?.connections
                    ? fullTextTasks.connections?.map((component, index) => 
                    {
                      switch (component?.__typename) 
                      {
                        case "ImageWrapperCard":
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

                        default:
                          console.warn(
                            `Unknown component type: ${component?.__typename}`
                          );
                          return null;
                      }
                      return null;
										  })
                    : null;
                },
                paragraph: richTextParagraphOverwrite,
              }}
            />
            <button type="button" onClick={() => getNextGameIndex()}>
              Next{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseCompleteTestsStep;
