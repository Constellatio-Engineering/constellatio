
import { type IHeadingNode } from "types/richtext";

import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { type ReactElement } from "react";

// import { getNumbering } from "../organisms/floatingPanel/generateTocHelper";

// import { getNumericalLabel } from "../organisms/floatingPanel/generateTocHelper";

/**
 * this function is used to overwrite the heading renderer in the rich text renderer and add the numerical label to the text
 */
export const richTextHeadingOverwrite = ({
  // counters = [],
  // depth,
  index,
  ...props
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any): ReactElement => 
{
  const node = props!.node as unknown as IHeadingNode;

  // const { level } = node.attrs;
  // if(counters.length < level) 
  // {
  //   counters.push(1);
  // }
  // else 
  // {
  //   counters[level - 1] += 1;
  // }
  // counters.length = level;

  // const number = counters.map((count: number, index: number): string => getNumbering(count, index + 1)).join(".");

  // console.log({ props });
  return (
    <>
      {node?.content && (
        <RichTextRenderer {...props}/>
      )}
    </>
    
  );
};

