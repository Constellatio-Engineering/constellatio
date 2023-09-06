// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { type IParagraph } from "types/richtext";

import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { type ReactElement } from "react";

/**
 * this function Remove empty paragraphs
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const richTextParagraphOverwrite = (props: any): ReactElement => 
{
  const node = props.node as unknown as IParagraph;
  return node?.content && <RichTextRenderer {...props}/>;
};
