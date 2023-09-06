// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { type IParagraph } from "types/richtext";

import { RichTextRenderer } from "@caisy/rich-text-react-renderer";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/**
 * this function Remove empty paragraphs
 */
export const richTextParagraphOverwrite = (props): ReactElement => 
{
  const node = props.node as unknown as IParagraph;
  return node?.content && <RichTextRenderer {...props}/>;
};
