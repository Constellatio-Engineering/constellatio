import { ImageWrapperCard } from "@/components/molecules/ImageWrapperCard/ImageWrapperCard";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { Callout } from "@/components/organisms/Callout/Callout";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { DragDropGame } from "@/components/organisms/DragDropGame/DragDropGame";
import { FillGapsGame } from "@/components/organisms/FillGapsGame/FillGapsGame";
import { SelectionCardGame } from "@/components/organisms/SelectionCardGame/SelectionCardGame";
import { type IGenCase_FullTextTasks, type IGenCase } from "@/services/graphql/__generated/sdk";
import { type TextElement, type IDocumentLink, type IParagraph } from "types/richtext";

import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import React, { type ReactElement, type FunctionComponent } from "react";

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const richTextOverwrite = (props): ReactElement => 
  {
    const node = props.node as unknown as IParagraph;
    return node?.content && <RichTextRenderer {...props}/>;
  };

  return (
    <>
      <CaseSolvingHeader
        title={title ?? ""}
        variant="case"
        overviewCard={{
          lastUpdated: new Date(),
          legalArea: legalArea?.[0],
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
            <Richtext
              richTextContent={facts?.richTextContent} 
              richTextOverwrite={{
                paragraph: richTextOverwrite
              }}
            />
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
                paragraph: richTextOverwrite
                
              }}
            />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default CasePage;
