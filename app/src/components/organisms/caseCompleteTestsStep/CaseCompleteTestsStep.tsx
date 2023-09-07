import { Button } from "@/components/atoms/Button/Button";
import { BoxIcon } from "@/components/Icons/BoxIcon";
import { FileIcon } from "@/components/Icons/FileIcon";
import {
  type IGenTextElement,
  type IGenCase_FullTextTasks,
} from "@/services/graphql/__generated/sdk";
import useCaseSolvingStore from "@/stores/caseSolving.store";
import { type IDocumentLink } from "types/richtext";

import { Title } from "@mantine/core";
import { type Maybe } from "@trpc/server";
import { useState, type FunctionComponent, useEffect } from "react";
import { set } from "zod";

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
  readonly content: any;
  readonly facts: Maybe<IGenTextElement> | undefined;
  readonly fullTextTasks: Maybe<IGenCase_FullTextTasks> | undefined;
}

const CaseCompleteTestsStep: FunctionComponent<ICaseCompleteTestsStepProps> = ({ content, facts, fullTextTasks }) => 
{
  const { hasCaseSolvingStarted, setHasCaseSolvingStarted } = useCaseSolvingStore();

  const gameComponents = fullTextTasks?.connections?.filter((component) => component?.__typename === "CardSelectionGame" || component?.__typename === "DragNDropGame" || component?.__typename === "FillInGapsGame").map(game => ({ __typename: game?.__typename, id: game?.id })) ?? [];

  const gamesIndexes = (): number[] => 
  {
    const indexes = [];
    for(const game of gameComponents) 
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gameIndex = fullTextTasks?.json?.content?.findIndex((item: any) => item?.type === "documentLink" && item?.attrs?.documentId === game?.id);
      if(gameIndex !== -1) { indexes.push(gameIndex); }
    }
    return indexes;
  };

  const [renderedCaseContent, setRenderedCaseContent] = useState(fullTextTasks);

  useEffect(() => 
  {
    const indexes = gamesIndexes();
    // setRenderedCaseContent((prevContent => ({ ...prevContent, json: { ...prevContent?.json, content: prevContent?.json?.content } })));
    setRenderedCaseContent({ ...fullTextTasks, json: { ...fullTextTasks?.json, content: fullTextTasks?.json?.content.slice(0, indexes[1] + 1) } });
  }, [fullTextTasks]);

  console.log(renderedCaseContent);

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
            onClick={() => setHasCaseSolvingStarted(true)}>Start solving case
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
                    }
                    )

                    : null;
                },
                paragraph: richTextParagraphOverwrite,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseCompleteTestsStep;
