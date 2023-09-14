// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { type IHeading } from "types/richtext";

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
  const { node } = props as unknown as { node: IHeading };
  return (
    node?.content && (
      <RichTextRenderer
        {...{
          ...props,
          node: {
            ...props.node,
            content: [
              {
                ...props.node.content[0],
                text: `${getNumericalLabel(
                  props.node.attrs.level - 1,
                  index
                )} ${props.node.content[0].text}`,
              },
            ],
          },
        }}
      />
    )
  );
};
