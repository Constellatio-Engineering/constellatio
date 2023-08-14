import { IGenTextElement } from "@/services/graphql/__generated/sdk";
import React, { FC } from "react";
import { ElementType, RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { SRichtext } from "./Richtext.styles";

type TRichtext = Pick<IGenTextElement, "richTextContent"> & {
  stylesOverwrite?: any;
  richTextOverwrite?: Partial<Record<ElementType, FC<{ node: any }>> | null> | undefined;
};

export const Richtext: FC<TRichtext> = ({ richTextOverwrite, stylesOverwrite, richTextContent }) => {
  return (
    <>
      {richTextContent?.json && (
        <SRichtext stylesOverwrite={stylesOverwrite}>
          <RichTextRenderer node={richTextContent.json} overwrites={richTextOverwrite} />
        </SRichtext>
      )}
    </>
  );
};
