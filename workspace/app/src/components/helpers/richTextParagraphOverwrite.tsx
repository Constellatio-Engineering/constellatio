// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { env } from "@/env.mjs";
import { type IParagraph } from "types/richtext";

import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { type ReactElement } from "react";

/**
 * this function Remove empty paragraphs
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const richTextParagraphOverwrite = (props: any): ReactElement => 
{
  const { node } = props;
  const updatedNode = JSON.parse(JSON.stringify(node)) as IParagraph;

  updatedNode.content?.forEach(item => 
  {
    if(item.marks) 
    {
      item.marks.forEach(mark => 
      {
        if(mark.attrs && mark.attrs.href) 
        {
          mark.attrs.href = mark.attrs.href.replace("{{app}}", env.NEXT_PUBLIC_WEBSITE_URL);
          mark.attrs.target = "_blank";
        }
      });
    }
  });

  const updatedProps = {
    ...props,
    node: updatedNode
  };

  return node?.content && <RichTextRenderer {...updatedProps}/>;
};
