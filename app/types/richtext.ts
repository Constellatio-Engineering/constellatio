import { type ElementType } from "@caisy/rich-text-react-renderer";

type TRichTextElements = {
  type: ElementType;
};

export interface TextElement extends TRichTextElements 
{
  content: [];
  text: string;
  type: "text";
}

export interface OverwriteProps 
{
  children: {
    props: {
      node: TextElement;
    };
  }[];
}
