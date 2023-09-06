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

export interface IDocumentLink extends TRichTextElements 
{
  attrs: {
    documentId: string;
  };
  type: "documentLink";
}

export interface IParagraph extends TRichTextElements
{
  content: TextElement[];
  type: "paragraph";
}
