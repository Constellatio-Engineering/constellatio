import React, { type FunctionComponent } from "react";

import * as styles from "./CaseCompleteTestsStep.styles";
import { IDocumentLink } from "types/richtext";
import { Trash } from "../Icons/Trash";
import { richTextParagraphOverwrite } from "../helpers/richTextParagraphOverwrite";
import { ImageWrapperCard } from "../molecules/ImageWrapperCard/ImageWrapperCard";
import { Richtext } from "../molecules/Richtext/Richtext";
import { Callout } from "../organisms/Callout/Callout";
import { DragDropGame } from "../organisms/DragDropGame/DragDropGame";
import { FillGapsGame } from "../organisms/FillGapsGame/FillGapsGame";
import { SelectionCardGame } from "../organisms/SelectionCardGame/SelectionCardGame";
import FloatingPanel from "../organisms/floatingPanel/FloatingPanel";
import { IGenTextElement, IGenCase_FullTextTasks } from "@/services/graphql/__generated/sdk";
import { Maybe } from "@trpc/server";

export interface ICaseCompleteTestsStepProps
{

  content: any; 
  facts: Maybe<IGenTextElement> | undefined; 
  fullTextTasks: Maybe<IGenCase_FullTextTasks> | undefined; 
}


const CaseCompleteTestsStep: FunctionComponent<ICaseCompleteTestsStepProps> = ({ facts,content, fullTextTasks }) => {
  return (
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
  );
};

export default CaseCompleteTestsStep;
