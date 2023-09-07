import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { Trash } from "@/components/Icons/Trash";
import { ImageWrapperCard } from "@/components/molecules/ImageWrapperCard/ImageWrapperCard";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { Callout } from "@/components/organisms/Callout/Callout";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { DragDropGame } from "@/components/organisms/DragDropGame/DragDropGame";
import { FillGapsGame } from "@/components/organisms/FillGapsGame/FillGapsGame";
import FloatingPanel from "@/components/organisms/floatingPanel/FloatingPanel";
import { SelectionCardGame } from "@/components/organisms/SelectionCardGame/SelectionCardGame";
import { type IGenCase } from "@/services/graphql/__generated/sdk";
import { type IDocumentLink } from "types/richtext";

import React, { type FunctionComponent } from "react";

import * as styles from "./CasesPage.styles";

const CasePage: FunctionComponent<IGenCase> = ({
  durationToCompleteInMinutes,
  facts,
  fullTextTasks,
  legalArea,
  tags,
  title,
  topic
}) => 
{
  const content = fullTextTasks?.json?.content?.filter((contentItem: { content: { text: string }[]; type: string }) => contentItem?.type === "heading");

  return (
    <>
      <CaseSolvingHeader
        title={title ?? ""}
        variant="case"
        overviewCard={{
          lastUpdated: new Date(),
          legalArea,
          status: "notStarted",
          tags,
          timeInMinutes: durationToCompleteInMinutes || 0,
          topic: topic?.[0]?.topicName ?? "",
          variant: "case",
          views: 0,
        }}
      />
      <div css={styles.mainContainer}>
        <div css={styles.contentWrapper}>
          <div css={styles.content}>
            <div css={styles.facts}>
              <Richtext
                richTextContent={facts?.richTextContent} 
                richTextOverwrite={{
                  paragraph: richTextParagraphOverwrite
                }}
              />
            </div>
            <div css={styles.fullTextAndTasksWrapper}>
              <div css={styles.toc}>
                <FloatingPanel
                  hidden={false}
                  facts={facts?.richTextContent}
                  content={content}
                  tabs={[{ icon: { src: <Trash/> }, title: "Content" }, { icon: { src: <Trash/> }, title: "Facts" }]}
                />
              </div>
              <Richtext
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                richTextContent={fullTextTasks as any}
                richTextOverwrite={{
                  documentLink: (props) => 
                  {
                    const node = props.node as unknown as IDocumentLink;
                    return node && fullTextTasks?.connections ? fullTextTasks.connections?.map((component, index) => 
                    {
                      switch (component?.__typename) 
                      {
                        case "ImageWrapperCard":
                          if(node?.attrs?.documentId === component?.id) 
                          {
                            return (
                              <div css={styles.componentWrapper} key={`${component?.__typename}-${index}`}>
                                <ImageWrapperCard {...component}/>
                              </div>
                            );
                          }
                          break;
  
                        case "Callout": 
                          if(node?.attrs?.documentId === component?.id) 
                          {
                            return (
                              <div css={styles.componentWrapper} key={`${component?.__typename}-${index}`}>
                                <Callout {...component}/>
                              </div>
                            );
                          }
                          break;
  
                        case "CardSelectionGame":
                          if(node?.attrs?.documentId === component?.id) 
                          {
                            return (
                              <div css={styles.gameComponentWrapper} key={`${component?.__typename}-${index}`}>
                                <SelectionCardGame {...component}/>
                              </div>
                            );
                          }
                          break;
  
                        case "DragNDropGame":
                          if(node?.attrs?.documentId === component?.id) 
                          {
                            return (
                              <div css={styles.gameComponentWrapper} key={`${component?.__typename}-${index}`}>
                                <DragDropGame {...component}/>
                              </div>
                            );
                          }
                          break;
  
                        case "FillInGapsGame":
                          if(node?.attrs?.documentId === component?.id) 
                          {
                            return (
                              <div css={styles.gameComponentWrapper} key={`${component?.__typename}-${index}`}>
                                <FillGapsGame {...component}/>
                              </div>
                            );
                          }
                          break;
  
                        default:
                          console.warn(`Unknown component type: ${component?.__typename}`);
                          return null;
                      }
  
                      return null;
                    }) : null; 
                  },
                  paragraph: richTextParagraphOverwrite
                
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default CasePage;
