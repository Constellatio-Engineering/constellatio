import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import CaseNavBar, { type ICaseNavBarProps } from "./CaseNavBar";

const Template: FunctionComponent<ICaseNavBarProps> = (args) => (<CaseNavBar {...args}/>);

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
  title: "Molecules/CaseNavBar",
};

export default meta;

type Story = StoryObj<typeof CaseNavBar>;

export const Default: Story = {
  args: {
    title: "arg"
  },
};

