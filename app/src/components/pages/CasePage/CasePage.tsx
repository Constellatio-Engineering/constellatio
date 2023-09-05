import { ImageWrapperCard } from "@/components/molecules/ImageWrapperCard/ImageWrapperCard";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { Callout } from "@/components/organisms/Callout/Callout";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { DragDropGame } from "@/components/organisms/DragDropGame/DragDropGame";
import { FillGapsGame } from "@/components/organisms/FillGapsGame/FillGapsGame";
import { SelectionCardGame } from "@/components/organisms/SelectionCardGame/SelectionCardGame";
import { type IGenCase } from "@/services/graphql/__generated/sdk";
import { type IDocumentLink } from "types/richtext";

import React, { Fragment, type FunctionComponent } from "react";

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
      <Richtext richTextContent={facts?.richTextContent}/>
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
                      <Fragment key={`${component?.__typename}-${index}`}>
                        <ImageWrapperCard {...component}/>
                      </Fragment>
                    );
                  }
                  break;
  
                case "Callout": 
                  if(node?.attrs?.documentId === component?.id) 
                  {
                    return (
                      <Fragment key={`${component?.__typename}-${index}`}>
                        {/* <Callout {...component}/> */}
                        hi this is a callout
                      </Fragment>
                    );
                  }
                  break;
  
                case "CardSelectionGame":
                  if(node?.attrs?.documentId === component?.id) 
                  {
                    return (
                      <Fragment key={`${component?.__typename}-${index}`}>
                        <SelectionCardGame {...component}/>
                      </Fragment>
                    );
                  }
                  break;
  
                case "DragNDropGame":
                  if(node?.attrs?.documentId === component?.id) 
                  {
                    return (
                      <Fragment key={`${component?.__typename}-${index}`}>
                        <DragDropGame {...component}/>
                      </Fragment>
                    );
                  }
                  break;
  
                case "FillInGapsGame":
                  if(node?.attrs?.documentId === component?.id) 
                  {
                    return (
                      <Fragment key={`${component?.__typename}-${index}`}>
                        <FillGapsGame {...component}/>
                      </Fragment>
                    );
                  }
                  break;
  
                default:
                  console.warn(`Unknown component type: ${component?.__typename}`);
                  return null;
              }
  
              return null;
            }) : null; 
          }
        }}
      />
      
    </>
  );
};

export default CasePage;
