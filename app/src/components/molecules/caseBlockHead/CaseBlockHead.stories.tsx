import { Trash } from "@/components/Icons/Trash";

import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import CaseBlockHead, { type ICaseBlockHeadProps } from "./CaseBlockHead";

const Template: FunctionComponent<ICaseBlockHeadProps> = (args) => (<CaseBlockHead {...args}/>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/...",
    },
  },
  title: "Molecules/CaseBlockHead",
};

export default meta;

type Story = StoryObj<typeof CaseBlockHead>;

export const CasesBlock: Story = {
  args: {
    blockType: "itemsBlock",
    categoryName: "Category Name",
    completedCases: 1,
    items: 1,
    variant: "case",

  },
};
export const DictionaryBlock: Story = {
  args: {
    blockType: "itemsBlock",
    categoryName: "Category Name",
    completedCases: 1,
    items: 1,
    variant: "dictionary",

  },
};
export const FouriteCasesBlock: Story = {
  args: {
    blockType: "facouritItemsBlock",
    categoryName: "Category Name",
    completedCases: 1,
    icon: { alt: "icon", src: <Trash/> },
    items: 1,
    variant: "case",

  },
};
export const FouriteDictionaryBlock: Story = {
  args: {
    blockType: "facouritItemsBlock",
    categoryName: "Category Name",
    completedCases: 1,
    items: 1,
    variant: "dictionary",

  },
};

export const SearchCasesBlock: Story = {
  args: {
    blockType: "seaechBlock",
    categoryName: "Category Name",
    completedCases: 1,
    items: 1,
    variant: "case",

  },
};

export const SearchDictionaryBlock: Story = {
  args: {
    blockType: "seaechBlock",
    categoryName: "Category Name",
    completedCases: 1,
    items: 1,
    variant: "dictionary",

  },
};

export const SearchPapersBlock: Story = {
  args: {
    blockType: "searchPapersBlock",
    categoryName: "Category Name",
    completedCases: 1,
    items: 1,
    // variant: "dictionary",

  },
};

export const SearchUploadedMaterials: Story = {
  args: {
    blockType: "searchUploadedMaterials",
    categoryName: "Category Name",
    completedCases: 1,
    items: 1,
    // variant: "dictionary",

  },
};

