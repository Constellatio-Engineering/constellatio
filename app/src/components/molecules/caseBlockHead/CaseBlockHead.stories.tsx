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

export const Default: Story = {
  args: {
    title: "Category Name"
  },
};

