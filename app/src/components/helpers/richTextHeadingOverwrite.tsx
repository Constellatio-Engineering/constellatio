
import { type IHeadingNode } from "types/richtext";

import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { type ReactElement } from "react";

import { getNumericalLabel } from "../organisms/floatingPanel/generateTocHelper";
/**
 * this function is used to overwrite the heading renderer in the rich text renderer and add the numerical label to the text
 */
export const richTextHeadingOverwrite = ({
  index,
  ...props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any): ReactElement => 
{
  const node = props!.node as unknown as IHeadingNode;
  const { level } = node.attrs;

  return (
    <>
      {node?.content && (
        <RichTextRenderer {...{
          ...props,
          node: {
            ...props.node,
            content: [{ ...props.node.content[0], text: getNumericalLabel(level, index) + " " }, ...props.node.content]
          }
        }}
        />
      )}
    </>

  );
};

