import { type ElementType } from "@caisy/rich-text-react-renderer";
import { type ReactElement, type JSXElementConstructor } from "react";

type TRichTextElements = {
  type: ElementType;
};

interface TextElement extends TRichTextElements 
{
  content: [];
  marks: Array<{
    attrs: {
      href: string;
      target: string;
    };
  }>;
  text: string; 
  type: "text";
}

export interface OverwriteProps 
{
  children: Array<{
    props: { node: TextElement };
  }>;
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

export interface IHeading extends TRichTextElements
{
  content: TextElement[];
  type: "heading";
}
export type IHeadingNode = TRichTextElements & 
{ 
  attrs: { level: number }; 
  content: TextElement[];
  type: "heading"; 
} & ReactElement<unknown, string | JSXElementConstructor<unknown>>;
