import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";

export const extensions = [
  StarterKit.configure({
    document: false,
    paragraph: false,
    text: false,
    bulletList: false,
    orderedList: false,
    listItem: false,
    bold: false,
    italic: false,
    strike: false,
    heading: false,
    code: false,
    codeBlock: false,
    blockquote: false,
  }),
  Document,
  Paragraph,
  Text,
  Bold,
  Italic,
  Strike,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Code,
  CodeBlock,
  Blockquote,
  Image,
  BulletList.configure({
    keepMarks: true,
    keepAttributes: false,
  }),
  OrderedList.configure({
    keepMarks: true,
    keepAttributes: false,
  }),
  ListItem,
];