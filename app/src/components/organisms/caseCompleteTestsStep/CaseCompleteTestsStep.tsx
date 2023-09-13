/* eslint-disable max-lines */
import { Button } from "@/components/atoms/Button/Button";
import { richTextHeadingOverwrite } from "@/components/helpers/richTextHeadingOverwrite";
import { BoxIcon } from "@/components/Icons/BoxIcon";
import { FileIcon } from "@/components/Icons/FileIcon";
import { type IGenTextElement, type IGenCase_FullTextTasks } from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { IHeading, type IDocumentLink } from "types/richtext";

import { Container, Title } from "@mantine/core";
import { type Maybe } from "@trpc/server";
import {
  type FunctionComponent, useEffect, useMemo, type JSXElementConstructor, type ReactElement 
} from "react";

import { title } from "process";

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

  const getHeadingIndex = (passedHead: {
    attrs: {
      level: number;
    };
    type: "heading";
  } & ReactElement<unknown, string | JSXElementConstructor<unknown>>): number | void => 
  {
    const allHeadings = fullTextTasks?.json?.content?.filter((x: { attrs: { level: number }; type: "heading" }) => (x.type === "heading" && x.attrs.level === passedHead.attrs.level));
    for(let headIndex = 0; headIndex < allHeadings.length; headIndex++) 
    {
      if(JSON?.stringify(allHeadings?.[headIndex]) === JSON?.stringify(passedHead)) 
      {
        return headIndex;
      }
    }
  };

  return (
    <Container maw={1440}>
      <div css={styles.contentWrapper} id="completeTestsStepContent">
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
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  heading: (props: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    node: ReactElement<any, string | JSXElementConstructor<any>>;
                  }&{
                    attrs: {
                      level: number;
                    };
                    type: "heading";
                  // eslint-disable-next-line react/prop-types
                  }) => richTextHeadingOverwrite({ index: getHeadingIndex(props.node), ...props }),
                  paragraph: richTextParagraphOverwrite
                }}
              />
              <button type="button" onClick={() => getNextGameIndex()}>
                Next{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CaseCompleteTestsStep;
