import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import CaseBlock, { type ICaseBlockProps } from "./CaseBlock";

const Template: FunctionComponent<ICaseBlockProps> = (args) => (<CaseBlock {...args}/>);

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
  title: "Organisms/CaseBlock",
};

export default meta;

type Story = StoryObj<typeof CaseBlock>;

export const Default: Story = {
  args: {
    blockHead: {
      blockType: "itemsBlock",
      categoryName: "Category Name",
      completedCases: 1,
      items: 1,
      variant: "case",
    },
  },
};

