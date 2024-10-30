import useCaseSolvingStore from "@/stores/caseSolving.store";
import { type IHeadingNode } from "types/richtext";

import { slugFormatter } from "@constellatio/utils/slug";
import React, { type ReactElement } from "react";

import { getNumericalLabel } from "../organisms/floatingPanel/generateTocHelper";

export const richTextHeadingOverwriteClassName = "richTextHeadingOverwrite";

/**
 * this function is used to overwrite the heading renderer in the rich text renderer and add the numerical label to the text
 */
export const RichTextHeadingOverwrite = ({
  index,
  ...props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any): ReactElement => 
{
  const node = props.node as unknown as IHeadingNode;
  const level = node.attrs.level as number;
  const HeadingTag = `h${level}` as Extract<keyof JSX.IntrinsicElements, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
  const observedHeadlineId = useCaseSolvingStore(s => s.observedHeadlineId);
  const isObserved = node.id === observedHeadlineId;
  const debugObservedHeadline = false;

  return (
    <HeadingTag
      style={debugObservedHeadline ? { backgroundColor: isObserved ? "red" : "blue" } : {}}
      data-id={node.id}
      className={richTextHeadingOverwriteClassName}
      key={slugFormatter(node?.content?.[0]?.text ?? "")}
      id={slugFormatter(node?.content?.[0]?.text ?? "")}>
      {getNumericalLabel(level, index)}{" "}{node?.content?.[0]?.text}
    </HeadingTag>
  );
};

/* {node?.content && (
        <RichTextRenderer {...{
          ...props,
          node: {
            ...props.node,
            content: [{ ...props.node.content[0], text: getNumericalLabel(level, index) + " " }, ...props.node.content]
          }
        }}
        />
      )} 
  */ 
