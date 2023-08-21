import { type IGenTextElement } from "@/services/graphql/__generated/sdk";

import { type ElementType, RichTextRenderer } from "@caisy/rich-text-react-renderer";
import React, { type FC } from "react";

import { SRichtext } from "./Richtext.styles";

type TRichtext = Pick<IGenTextElement, "richTextContent"> & {
  readonly richTextOverwrite?: Partial<Record<ElementType, FC<{ node: any }>> | null> | undefined;
  readonly stylesOverwrite?: any;
};

export const Richtext: FC<TRichtext> = ({ richTextContent, richTextOverwrite, stylesOverwrite }) => 
{
  return (
    <>
      {richTextContent?.json && (
        <SRichtext stylesOverwrite={stylesOverwrite}>
          <RichTextRenderer node={richTextContent.json} overwrites={richTextOverwrite}/>
        </SRichtext>
      )}
    </>
  );
};
