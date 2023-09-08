import { type IGenTextElement_RichTextContent, type IGenTextElement } from "@/services/graphql/__generated/sdk";
import { type Nullable } from "@/utils/types";

import { type ElementType, RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { type SerializedStyles } from "@emotion/react";
import React, { type FC, type ReactElement } from "react";

import { SRichtext } from "./Richtext.styles";

export type RichtextProps = Pick<IGenTextElement, "richTextContent"> & {
  readonly richTextOverwrite?: Nullable<Partial<Record<ElementType, FC<{ node: ReactElement }>>>>;
  readonly stylesOverwrite?: SerializedStyles;
};

export const Richtext: FC<RichtextProps> = ({ richTextContent, richTextOverwrite, stylesOverwrite }) =>
{
  if(!richTextContent?.json)
  {
    return null;
  }

  return (
    <SRichtext stylesOverwrite={stylesOverwrite}>
      <RichTextRenderer node={richTextContent.json} overwrites={richTextOverwrite}/>
    </SRichtext>
  );
};
