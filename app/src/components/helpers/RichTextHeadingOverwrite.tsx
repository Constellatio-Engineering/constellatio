import useCaseSolvingStore from "@/stores/caseSolving.store";
import { slugFormatter } from "@/utils/utils";
import { type IHeadingNode } from "types/richtext";

// import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { useIntersection } from "@mantine/hooks";
import React, { type ReactElement, type ElementType } from "react";

import { getNumericalLabel } from "../organisms/floatingPanel/generateTocHelper";
/**
 * this function is used to overwrite the heading renderer in the rich text renderer and add the numerical label to the text
 */
export const RichTextHeadingOverwrite = ({
  index,
  ...props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any): ReactElement => 
{
  const node = props!.node as unknown as IHeadingNode;
  const level = node.attrs.level as number;
  const HeadingTag = `h${level}` as ElementType;
  const { entry, ref } = useIntersection();
  const setObservedHeadline = useCaseSolvingStore(s => s.setObservedHeadline); 
  React.useLayoutEffect(() =>
  {
    if(entry?.isIntersecting)
    {
      setObservedHeadline({ level, slug: entry.target.id });
    }
  }, [entry?.isIntersecting, entry?.target?.id, level, setObservedHeadline]);
  return (
    <HeadingTag 
      ref={ref}
      key={slugFormatter(node?.content?.[0]?.text ?? "")}
      id={slugFormatter(node?.content?.[0]?.text ?? "")}>
      {getNumericalLabel(level, index)}
      {" "}{node?.content?.[0]?.text}
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
