import { IGenTextElement } from "@/services/graphql/__generated/sdk";
import React, { FC } from "react";
import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { SRichtext } from "./Richtext.styles";

type TRichtext = Pick<IGenTextElement, "richTextContent">;

export const Richtext: FC<TRichtext> = ({ richTextContent }) => {
  return (
    <>
      {richTextContent?.json && (
        <SRichtext>
          <RichTextRenderer node={richTextContent?.json} />
        </SRichtext>
      )}
    </>
  );
};
